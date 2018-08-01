const fs = require('fs');
const mongoose = require('mongoose');
const ACTION = {READ: "read", COMPARE: "compare", SHOWALL: "show_all"};

const fileSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

fileSchema.methods.displaySelf = () => {
	const displayStr = this.title + ':' + this.content;
	console.log(displayStr);
};

const File = mongoose.model('File', fileSchema);

const pushDataToDB = (fileName, fileContent) => {
	const alreadyReadFile = new File({title: fileName, content: fileContent});
	alreadyReadFile.save({})
	.catch( err => {
		return console.error(err);
	});
};

const saveFileContents = (pathList) => {
	pathList.map((elt) => {
		fs.readFile(elt, 'utf-8', (err, data) => {
			if (err) return console.error(err);
			pushDataToDB(elt, data);
		});
	});
};

const displayFileContents = (pathList) => {
	pathList.map((elt) => {
		fs.readFile(elt, 'utf-8', (err, data) => {
			if (err) {
				throw err;
			} else {
				pushDataToDB(elt, data);
				console.log(data);
			}
		});
	});
};

const diffCharFromFile = (pathFileList, character) => {
	const fs = require('fs');
	let biggest = {index: -1, value: -1, several: false};
	
	pathFileList.map((elt, index) => {
		fs.readFile(elt, 'utf-8', (err, data) => {
			if (err) {
				throw err;
			}
			else if (index === pathFileList.length - 1 && biggest.several === false) {
				console.log('Le fichier', biggest.index + 1, 'contient le plus de caractères a');
			}
			else if (index === pathFileList.length - 1 && biggest.several === true) {
				console.log('plusieurs fichiers ont le plus grand nombre de a:', biggest.value);
			} else {
				biggest.index = biggest.value < data.split(character).length - 1 ? index : biggest.index;
				biggest.value = biggest.value < data.split(character).length - 1 ? data.split(character).length - 1 : biggest.value;
				biggest.several = biggest.value === data.split(character).length - 1 ? true : false;
			}
		});
	});
};

const afterIndex2 = (element, index) => index > 2;

const showAllContentFromDB = () => {
	File.find({})
	.then( files => {
		files.map((elt) => console.log(elt.title + ' : ' + elt.content));
		mongoose.disconnect();
	})
	.catch( err => {
		return console.error(err);
	})
};

if (process.argv.length >= 3)
{
	const filePaths = process.argv.filter(afterIndex2);
	mongoose.connect('mongodb://localhost/test');
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		if (process.argv[2] === ACTION.READ) {
			displayFileContents(filePaths);
			mongoose.disconnect();
		}
		else if (process.argv[2] === ACTION.COMPARE) {
			diffCharFromFile(filePaths, 'a');
			mongoose.disconnect();
		}
		else if (process.argv[2] === ACTION.SHOWALL) {
			saveFileContents(filePaths);
			showAllContentFromDB();
		} else {
			console.log('Error: invalid argument "', process.argv[2],'"');
			mongoose.disconnect();
		}
	});
}
else
{
	console.log('Nombre d\'arguments invalide');
}
