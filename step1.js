const readFileContent = (path) => {
	try {
		const fs = require('fs');
		const res = fs.readFileSync(path, 'utf-8');
		return res;
	} catch (err) {
		return undefined;
	}
}

if (process.argv.length === 3)
{
	const fileContent = readFileContent(process.argv[2]);
	console.log(fileContent ? fileContent : 'Ce fichier est invalide ou introuvable');
}
else
{
	console.log('Nombre d\'arguments invalide');
}
