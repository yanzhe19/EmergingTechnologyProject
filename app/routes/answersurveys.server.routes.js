'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var answersurveys = require('../../app/controllers/answersurveys.server.controller');

    // Answersurveys Routes
    app.route('/answersurveys')
        .get(answersurveys.list);

    app.route('/answersurveys/:answersurveyId')
        .get(answersurveys.read)
        .put(answersurveys.update);
    
    // Finish by binding the Answersurvey middleware
    app.param('answersurveyId', answersurveys.answersurveyByID);
};
