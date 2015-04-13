'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var surveys = require('../../app/controllers/surveys.server.controller');

    // Surveys Routes
    app.route('/surveys')
        .get(users.requiresLogin,surveys.list)//added user login requirements in order to see the survey list
        .post(users.requiresLogin, surveys.create);

//    app.route('/surveys/:userId')
//        .get(surveys.listByUserID);

    app.route('/surveys/:surveyId')
        .get(users.requiresLogin,surveys.read)
        .put(users.requiresLogin, surveys.hasAuthorization, surveys.update)
        .delete(users.requiresLogin, surveys.hasAuthorization, surveys.delete);

    // Finish by binding the Survey middleware
    app.param('surveyId', surveys.surveyByID);

    //bind user id to list survey by user id
//    app.param('userId', surveys.listByUserID);
};
