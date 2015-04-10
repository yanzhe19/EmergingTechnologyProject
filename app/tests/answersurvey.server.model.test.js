'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Answersurvey = mongoose.model('Answersurvey');

/**
 * Globals
 */
var user, answersurvey;

/**
 * Unit tests
 */
describe('Answersurvey Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			answersurvey = new Answersurvey({
				name: 'Answersurvey Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return answersurvey.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			answersurvey.name = '';

			return answersurvey.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Answersurvey.remove().exec();
		User.remove().exec();

		done();
	});
});