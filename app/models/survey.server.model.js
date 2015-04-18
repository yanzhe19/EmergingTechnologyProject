/**
File name: surveys.server.model.js
Author: Zhe Yan & Zida Bi
Web site name: Survey Elephant
Description: The model file which contain database schema
*/

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Survey Schema
 */
var SurveySchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Survey name',
        trim: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    questions: [{
        questionTxt: String,
        questionOptions:[
            {
            optionTxt:String,
            answerCount:Number
            }
        ]
    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Survey', SurveySchema);