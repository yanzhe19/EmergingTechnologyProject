'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Answersurvey = mongoose.model('Answersurvey'),
    Survey = mongoose.model('Survey'),
    _ = require('lodash');

/**
 * Create a Answersurvey
 */
exports.create = function(req, res) {
    var answersurvey = new Answersurvey(req.body);
    //answersurvey.user = req.user;

    answersurvey.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(answersurvey);
        }
    });
};

/**
 * Show the current Answersurvey
 */
exports.read = function(req, res) {
    res.jsonp(req.answersurvey);
};

/**
 * Update a Answersurvey
 */
exports.update = function(req, res) {
    var answersurvey = req.answersurvey ;

    answersurvey = _.extend(answersurvey , req.body);

    answersurvey.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(answersurvey);
        }
    });
};

/**
 * Delete an Answersurvey
 */
exports.delete = function(req, res) {
    var answersurvey = req.answersurvey ;

    answersurvey.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(answersurvey);
        }
    });
};

/**
 * get survey list, so add survey model to this controller(at the begining of file) and involke function to get all survey listed.
 */
var currentDateTime = new Date();
exports.list = function(req, res) { 
    Survey.find().where('endTime').gt(currentDateTime).sort('-created').populate('user', 'displayName').exec(function(err, surveys) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(surveys);
        }
    });
};


/**
 * Answersurvey middleware
 */
exports.answersurveyByID = function(req, res, next, id) { 
    Answersurvey.findById(id).populate('user', 'displayName').exec(function(err, answersurvey) {
        if (err) return next(err);
        if (! answersurvey) return next(new Error('Failed to load Answersurvey ' + id));
        req.answersurvey = answersurvey ;
        next();
    });
};

/**
 * Disabled authentication requirements for answering survey, Answersurvey authorization middleware
 */
//exports.hasAuthorization = function(req, res, next) {
//	if (req.answersurvey.user.id !== req.user.id) {
//		return res.status(403).send('User is not authorized');
//	}
//	next();
//};
