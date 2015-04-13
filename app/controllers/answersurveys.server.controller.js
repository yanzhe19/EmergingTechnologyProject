'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
//    Answersurvey = mongoose.model('Answersurvey'),
    Survey = mongoose.model('Survey'),
    _ = require('lodash');

/**
 * Show the current Answersurvey
 */
exports.read = function(req, res) {
    res.jsonp(req.survey);
};

/**
 * Update a survey
 */
exports.update = function(req, res) {
    var survey = req.survey ;

    survey = _.extend(survey , req.body);

    survey.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(survey);
        }
    });
};

/**
 * get survey list, so add survey model to this controller(at the begining of file) and involke function to get all survey listed.
 */
var currentDateTime = new Date();
exports.list = function(req, res) { 
    Survey.find().where('endTime').gt(currentDateTime).find().where('startTime').lte(currentDateTime).sort('-created').populate('user', 'displayName').exec(function(err, surveys) {
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
    Survey.findById(id).populate('user', 'displayName').exec(function(err, survey) {
        if (err) return next(err);
        if (! survey) return next(new Error('Failed to load Survey ' + id));
        req.survey = survey ;
        next();
    });
};
