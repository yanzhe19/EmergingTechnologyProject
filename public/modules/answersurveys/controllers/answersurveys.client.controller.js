'use strict';

// Answersurveys controller
angular.module('answersurveys').controller('AnswersurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Answersurveys','Surveys',
	function($scope, $stateParams, $location, Authentication, Answersurveys,Surveys) {
		$scope.authentication = Authentication;
        $scope.surveyAnswers = [{'question': '', 'answer': ''}];
        
		// Create new Answersurvey
		$scope.create = function() {
			// Create new Answersurvey object
			var inputAnswer = new Answersurveys ({
                surveyId: $scope.answersurvey._id,
				surveyName: $scope.answersurvey.name,
                surveyAnswers:$scope.surveyAnswers,
                surveyOwner:$scope.answersurvey.user._id
			});

			// Redirect after save
			inputAnswer.$save(function(response) {
				$location.path('answersurveys/' + response._id);

				// Clear form fields
				$scope.surveyAnswers = [{'question': '', 'answer': ''}];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Answersurvey
		$scope.remove = function(answersurvey) {
			if ( answersurvey ) { 
				answersurvey.$remove();

				for (var i in $scope.answersurveys) {
					if ($scope.answersurveys [i] === answersurvey) {
						$scope.answersurveys.splice(i, 1);
					}
				}
			} else {
				$scope.answersurvey.$remove(function() {
					$location.path('answersurveys');
				});
			}
		};

		// Update existing Answersurvey
		$scope.update = function() {
			var answersurvey = $scope.answersurvey;

			answersurvey.$update(function() {
				$location.path('answersurveys/' + answersurvey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Answersurveys
		$scope.findAllSurvey = function() {
			$scope.surveys = Answersurveys.query();
		};

		// Find existing Answersurvey
//		$scope.findOne = function() {
//			$scope.answersurvey = Answersurveys.get({ 
//				answersurveyId: $stateParams.answersurveyId
//			});
//		};
        
        // Find a list of Surveys
//		$scope.findAllSurvey = function() {
//			$scope.surveys = Surveys.query();
//		};

		// Find existing Survey
		$scope.findOneSurvey = function() {
            //console.log($stateParams.answersurveyId);
			$scope.answersurvey = Surveys.get({ 
                //set the survey Id to answer survey id passed from lisf of answer survey view
				surveyId: $stateParams.answersurveyId
			});
		};
	}
]);