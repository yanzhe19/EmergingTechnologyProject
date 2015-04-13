'use strict';

//Setting up route
angular.module('answersurveys').config(['$stateProvider',
	function($stateProvider) {
		// Answersurveys state routing
		$stateProvider.
		state('thanks', {
			url: '/answersurveys/thanks',
			templateUrl: 'modules/answersurveys/views/thanks-answersurveys.client.view.html'
		}).
		state('listAnswersurveys', {
			url: '/answersurveys',
			templateUrl: 'modules/answersurveys/views/list-answersurveys.client.view.html'
		}).
		
		state('viewAnswersurvey', {
			url: '/answersurveys/:answersurveyId',
			templateUrl: 'modules/answersurveys/views/view-answersurvey.client.view.html'
		});
	}
]);