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
//    startTime: {
//        type: Date
//    },
//    endTime: {
//        type: Date
//    },
    created: {
        type: Date,
        default: Date.now
    },
//    questions: [{
//        questionName: String,
//        options:[
//            {
//            text:String
//            }
//        ]
//    }],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Survey', SurveySchema);