

//                                 ROUTES


const express = require('express');
const {getBears, postBear, getBearId, putBearId, deleteBearId} = require('./controller');
const router = express.Router();

//route for all requests, logs in console
//router.use(funcs.allRoutesFunc());


//test get route, don't mind it unless you wanna test anything with it
router.get('/', (req, res) => {
	res.json({ message: "Hello, ma qween" });
});

//route for /bears
router.route('/bears')
.get(getBears)
.post(postBear);

//route for /bears/:bear_id
router.route('/bears/:bear_id')
.get(getBearId)
.put(putBearId)
.delete(deleteBearId);

module.exports = router; //wtf
