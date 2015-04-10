'use strict';

//Setting up route
angular.module('answersurveys').config(['$stateProvider',
	function($stateProvider) {
		// Answersurveys state routing
		$stateProvider.
		state('listAnswersurveys', {
			url: '/answersurveys',
			templateUrl: 'modules/answersurveys/views/list-answersurveys.client.view.html'
		}).
		state('createAnswersurvey', {
			url: '/answersurveys/create',
			templateUrl: 'modules/answersurveys/views/create-answersurvey.client.view.html'
		}).
		state('viewAnswersurvey', {
			url: '/answersurveys/:answersurveyId',
			templateUrl: 'modules/answersurveys/views/view-answersurvey.client.view.html'
		}).
		state('editAnswersurvey', {
			url: '/answersurveys/:answersurveyId/edit',
			templateUrl: 'modules/answersurveys/views/edit-answersurvey.client.view.html'
		});
	}
]);