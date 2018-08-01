const mongoose = require('mongoose');

const bearSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	weight: {
		type: Number,
		min: 1,
		max: Number.MAX_SAFE_INTEGER
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Bear', bearSchema);
