
//							ROUTING FUNCS

const Bear = require('./model');

module.exports = {

allRoutesFunc: (req, res, next) => {
	console.log("STHG HAPPNING");
	next();
},

getBears: (req, res) => {
	console.log('GET BEARS')
	return Bear.find({})
	.then( bears => res.json(bears))
	.catch( err => res.status(404))
},

postBear: (req, res) => {
	console.log('POST BEAR');
	const bear = new Bear();
	bear.name = req.body.name;
	bear.weight = req.body.weight;
	bear.password = req.body.password;
	let data = bear.save((err) => {
		if (err) {
			res.status(400);
			res.send({message: "Error: field missing"})
		}
		else {
			res.json(bear);
		}
	});
	return data;
},

getBearId: (req, res) => {
	console.log('GET BEAR:ID');
	return Bear.findById(req.params.bear_id)
	.then( bear => {
		return res.json(bear)
	})
	.catch( err => {
		res.status(404);
		return res.send({ message: "Error: Not found" });
	})
},

putBearId: (req, res) => {
	console.log('PUT BEAR:ID');
	return Bear.findById(req.params.bear_id, {})
	.catch( err => res.status(404))
	.then( bear => {
		bear.name = req.body.name;
		bear.weight = req.body.weight;
		bear.password = req.body.password;
		return bear.save({});
	})
	.then(bear => res.json(bear))
	.catch( err => res.status(400))
},

deleteBearId: (req, res) => {
	console.log('DELETE BEAR:ID');
	return Bear.remove({_id: req.params.bear_id})
	.then( bear => res.status(200).end())
	.catch( err => res.send(err));
}
/*
module.exports.deleteBearId = deleteBearId;
module.exports.putBearId = putBearId;
module.exports.getBearId = getBearId;
module.exports.getBears = getBears;
module.exports.postBear = postBear;
*/
};