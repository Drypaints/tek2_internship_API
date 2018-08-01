//Calling dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/bear/index');
const passport = require('passport');
const Bear = require('./api/bear/model');
const { Strategy  } = require('passport-local');

//connect to our Mongo Database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/testbear');

//configuring app
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// allocates default app port / 8080 port
const port = process.env.PORT || 8080;

// use custom router
app.use('/api', routes);
app.get('/', (req, res) => res.sendFile('auth.html', { root: __dirname}));

//setup passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome" + req.query.name + "!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
	Bear.findById(id, (err, user) => {
		cb(err, user);
	})
})

//setup local-passport
passport.use(new Strategy((name, password, done) => {
	Bear.findOne({
		name: name
	}, {})
	.then((user) => {
		if (!user || user.password != password) return done(null, false);
		return done(null, user);
	})
	.catch((err) => {
		return done(null, false);
	})
}));

app.post('/', passport.authenticate('local',
	{ failureRedirect: '/error' }),
	(req, res) => res.redirect('/success?username='+req.user.username))

//starting server
app.listen(port);
console.log("Magic happening on port" + port);
