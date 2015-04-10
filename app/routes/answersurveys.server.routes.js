'use strict';

module.exports = function(app) {
    //var users = require('../../app/controllers/users.server.controller');
    var answersurveys = require('../../app/controllers/answersurveys.server.controller');

    // Answersurveys Routes
    app.route('/answersurveys')
        .get(answersurveys.list)
    //.post(users.requiresLogin, answersurveys.create);
        .post(answersurveys.create);

    app.route('/answersurveys/:answersurveyId')
        .get(answersurveys.read)
    //        .put(users.requiresLogin, answersurveys.hasAuthorization, answersurveys.update)
    //        .delete(users.requiresLogin, answersurveys.hasAuthorization, answersurveys.delete);
        .put(answersurveys.update)
        .delete(answersurveys.delete);

    // Finish by binding the Answersurvey middleware
    app.param('answersurveyId', answersurveys.answersurveyByID);
};
