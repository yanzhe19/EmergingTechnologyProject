'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Answersurvey = mongoose.model('Answersurvey'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, answersurvey;

/**
 * Answersurvey routes tests
 */
describe('Answersurvey CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Answersurvey
		user.save(function() {
			answersurvey = {
				name: 'Answersurvey Name'
			};

			done();
		});
	});

	it('should be able to save Answersurvey instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Answersurvey
				agent.post('/answersurveys')
					.send(answersurvey)
					.expect(200)
					.end(function(answersurveySaveErr, answersurveySaveRes) {
						// Handle Answersurvey save error
						if (answersurveySaveErr) done(answersurveySaveErr);

						// Get a list of Answersurveys
						agent.get('/answersurveys')
							.end(function(answersurveysGetErr, answersurveysGetRes) {
								// Handle Answersurvey save error
								if (answersurveysGetErr) done(answersurveysGetErr);

								// Get Answersurveys list
								var answersurveys = answersurveysGetRes.body;

								// Set assertions
								(answersurveys[0].user._id).should.equal(userId);
								(answersurveys[0].name).should.match('Answersurvey Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Answersurvey instance if not logged in', function(done) {
		agent.post('/answersurveys')
			.send(answersurvey)
			.expect(401)
			.end(function(answersurveySaveErr, answersurveySaveRes) {
				// Call the assertion callback
				done(answersurveySaveErr);
			});
	});

	it('should not be able to save Answersurvey instance if no name is provided', function(done) {
		// Invalidate name field
		answersurvey.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Answersurvey
				agent.post('/answersurveys')
					.send(answersurvey)
					.expect(400)
					.end(function(answersurveySaveErr, answersurveySaveRes) {
						// Set message assertion
						(answersurveySaveRes.body.message).should.match('Please fill Answersurvey name');
						
						// Handle Answersurvey save error
						done(answersurveySaveErr);
					});
			});
	});

	it('should be able to update Answersurvey instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Answersurvey
				agent.post('/answersurveys')
					.send(answersurvey)
					.expect(200)
					.end(function(answersurveySaveErr, answersurveySaveRes) {
						// Handle Answersurvey save error
						if (answersurveySaveErr) done(answersurveySaveErr);

						// Update Answersurvey name
						answersurvey.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Answersurvey
						agent.put('/answersurveys/' + answersurveySaveRes.body._id)
							.send(answersurvey)
							.expect(200)
							.end(function(answersurveyUpdateErr, answersurveyUpdateRes) {
								// Handle Answersurvey update error
								if (answersurveyUpdateErr) done(answersurveyUpdateErr);

								// Set assertions
								(answersurveyUpdateRes.body._id).should.equal(answersurveySaveRes.body._id);
								(answersurveyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Answersurveys if not signed in', function(done) {
		// Create new Answersurvey model instance
		var answersurveyObj = new Answersurvey(answersurvey);

		// Save the Answersurvey
		answersurveyObj.save(function() {
			// Request Answersurveys
			request(app).get('/answersurveys')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Answersurvey if not signed in', function(done) {
		// Create new Answersurvey model instance
		var answersurveyObj = new Answersurvey(answersurvey);

		// Save the Answersurvey
		answersurveyObj.save(function() {
			request(app).get('/answersurveys/' + answersurveyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', answersurvey.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Answersurvey instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Answersurvey
				agent.post('/answersurveys')
					.send(answersurvey)
					.expect(200)
					.end(function(answersurveySaveErr, answersurveySaveRes) {
						// Handle Answersurvey save error
						if (answersurveySaveErr) done(answersurveySaveErr);

						// Delete existing Answersurvey
						agent.delete('/answersurveys/' + answersurveySaveRes.body._id)
							.send(answersurvey)
							.expect(200)
							.end(function(answersurveyDeleteErr, answersurveyDeleteRes) {
								// Handle Answersurvey error error
								if (answersurveyDeleteErr) done(answersurveyDeleteErr);

								// Set assertions
								(answersurveyDeleteRes.body._id).should.equal(answersurveySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Answersurvey instance if not signed in', function(done) {
		// Set Answersurvey user 
		answersurvey.user = user;

		// Create new Answersurvey model instance
		var answersurveyObj = new Answersurvey(answersurvey);

		// Save the Answersurvey
		answersurveyObj.save(function() {
			// Try deleting Answersurvey
			request(app).delete('/answersurveys/' + answersurveyObj._id)
			.expect(401)
			.end(function(answersurveyDeleteErr, answersurveyDeleteRes) {
				// Set message assertion
				(answersurveyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Answersurvey error error
				done(answersurveyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Answersurvey.remove().exec();
		done();
	});
});