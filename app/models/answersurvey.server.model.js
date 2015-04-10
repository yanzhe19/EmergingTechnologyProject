'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answersurvey Schema
 */
var AnswersurveySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Answersurvey name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Answersurvey', AnswersurveySchema);