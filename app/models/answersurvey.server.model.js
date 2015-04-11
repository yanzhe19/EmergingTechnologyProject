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
    surveyId:{
        type: Schema.ObjectId,
        ref: 'Survey'
    },
    surveyName: {
        type: String,
        default: '',
        required: 'Please fill Answer name',
        trim: true
    },  
    surveyAnswers: [{
        question: String,
        answer:String
    }],
    surveyOwner: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Answersurvey', AnswersurveySchema);