const mongoose = require('mongoose');

const model = require('../api/bear/model');

const clearDB = () => {
    for (let i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove({})
    }
};



beforeEach(async () => {

	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(`mongodb://localhost:27017/${process.env.TEST_SUITE}`, {})
		.then(() => clearDB())
		.catch(err => {throw err})
	}
});


afterEach(async () => {
    const { collections } = mongoose.connection
    const promises = []
    Object.keys(collections).forEach((collection) => {
        promises.push(collections[collection].remove())
    })
    await Promise.all(promises)
})

afterAll(done => {
    mongoose.disconnect();
    return done();
});