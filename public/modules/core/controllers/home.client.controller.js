'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.goToAnswerSurvey = function(){
            $location.path('answersurveys');
        };
        
        $scope.goToSurveyList = function(){
            $location.path('surveys');
        };
        
        $scope.goToCreateSurvey = function(){
            $location.path('surveys/choose-survey-template');
        };
	}
]);