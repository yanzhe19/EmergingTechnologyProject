'use strict';

//Setting up route
angular.module('surveys').config(['$stateProvider',
	function($stateProvider) {
		// Surveys state routing
		$stateProvider.
		state('multiple-choice-template', {
			url: '/multiple-choice-template',
			templateUrl: 'modules/surveys/views/multiple-choice-template.client.view.html'
		}).
		state('listSurveys', {
			url: '/surveys',
			templateUrl: 'modules/surveys/views/list-surveys.client.view.html'
		}).
		state('createSurvey', {
			url: '/surveys/create',
			templateUrl: 'modules/surveys/views/create-survey.client.view.html'
		}).
		state('viewSurvey', {
			url: '/surveys/:surveyId',
			templateUrl: 'modules/surveys/views/view-survey.client.view.html'
		}).
		state('editSurvey', {
			url: '/surveys/:surveyId/edit',
			templateUrl: 'modules/surveys/views/edit-survey.client.view.html'
		});
	}
]);