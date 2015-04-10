'use strict';

//Answersurveys service used to communicate Answersurveys REST endpoints
angular.module('answersurveys').factory('Answersurveys', ['$resource',
	function($resource) {
		return $resource('answersurveys/:answersurveyId', { answersurveyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);