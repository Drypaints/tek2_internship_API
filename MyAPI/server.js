//call the packages===================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./api/bear/model');

//connect to our Mongo Database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/testbear');

//configuring app

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// ROUTES=============================================

const router = express.Router();


//use that function for all requests
const allRoutesFunc = (req, res, next) => {
	console.log("STHG HAPPNING");
	next();
};
router.use(allRoutesFunc);


// test route
router.get('/', (req, res) => {
	res.json({ message: "Hello, ma qween" });
});

//router registering HERE
const getBears = (req, res) => {
	console.log('GET BEARS')
	return Bear.find({})
	.then( bears => {
		return res.json(bears)
	})
	.catch( err => {
		return res.send(err);
	})
};

router.route('/bears')
.get(getBears);

//router registering HERE

const postBear = (req, res) => {
	console.log('POST BEAR');
	const bear = new Bear();
	bear.name = req.body.name;
	bear.weight = req.body.weight;
	let data = bear.save((err) => {
		if (err) res.send(err);
		res.json(bear);
	});
	return data;
};

router.route('/bears')
.post(postBear);

//router registering HERE TOO
const getBearId = (req, res) => {
	console.log('GET BEAR:ID');
	Bear.findById(req.params.bear_id, {})
	.then( bear => {
		res.json(bear);
	})
	.catch( err => {
		res.send(err);
	})
};

const putBearId = (req, res) => {
	console.log('PUT BEAR:ID');
	return Bear.findById(req.params.bear_id, {})
	.then( bear => {
		bear.name = req.body.name;
		bear.weight = req.body.weight;
		return bear.save({})
		.then(() => res.json(bear))
		.catch( err => res.send(err));
	})
	.catch( err => {
		return res.send(err);
	})
};

const deleteBearId = (req, res) => {
	console.log('DELETE BEAR:ID');
	return Bear.remove({_id: req.params.bear_id})
	.then( bear => res.status(200).end())
	.catch( err => res.send(err));
};

router.route('/bears/:bear_id')
.get(getBearId)
.put(putBearId)
.delete(deleteBearId);

app.use('/api', router);

//Server Starting RIGHT HERE

app.listen(port);
console.log("Magic happening on port" + port);
