/**
File name: google.js
Author: Zhe Yan & Zida Bi
Website name: Survey Elephant
Description: the js file which contains the configuration of google oauth
*/

'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use google strategy
	passport.use(new GoogleStrategy({
			clientID: '187066635683-oe4tm6c4nsati7ul4ag4a4g9navubqgp.apps.googleusercontent.com',
			clientSecret: 'g1rN9ISqHLxBNsJ8ahkZo1Gz',
			callbackURL: config.google.callbackURL,
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'google',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};