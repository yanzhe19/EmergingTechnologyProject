'use strict';

// Surveys controller
angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys',
	function ($scope, $stateParams, $location, Authentication, Surveys) {
		$scope.authentication = Authentication;

        $scope.questionGroup = [
            {"headingID": "heading1", 
             "collapseID": "collapse1", 
             "collapseHref": "#collapse1",
             "radioBtns": [
                            {"name": "Q1"},
                            {"name": "Q1"},
                            {"name": "Q1"},
                            {"name": "Q1"}
                          ]
            },
            {"headingID": "heading2", 
             "collapseID": "collapse2", 
             "collapseHref": "#collapse2",
             "radioBtns": [
                            {"name": "Q2"},
                            {"name": "Q2"},
                            {"name": "Q2"},
                            {"name": "Q2"}
                          ]
            },
            {"headingID": "heading3", 
             "collapseID": "collapse3", 
             "collapseHref": "#collapse3",
             "radioBtns": [
                            {"name": "Q3"},
                            {"name": "Q3"},
                            {"name": "Q3"},
                            {"name": "Q3"}
                          ]
            },
            {"headingID": "heading4", 
             "collapseID": "collapse4", 
             "collapseHref": "#collapse4",
             "radioBtns": [
                            {"name": "Q4"},
                            {"name": "Q4"},
                            {"name": "Q4"},
                            {"name": "Q4"}
                          ]
            }
        ];
        
        $scope.addRadio = function (radioIdx, questionIdx) {
            $scope.questionGroup[questionIdx].radioBtns.splice(radioIdx + 1, 0, {"name": "Q" + (questionIdx + 1)});
        };
        
        $scope.removeRadio = function (radioIdx, parentIdx) {
            $scope.questionGroup[questionIdx].radioBtns.splice(radioIdx, 1);
        };
        
        $scope.addQuestion = function (questionIdx) {
            $scope.questionGroup.splice(questionIdx + 1, 0,  {"headingID": "heading" + (questionIdx + 2), 
                                                              "collapseID": "collapse" + (questionIdx + 2), 
                                                              "collapseHref": "#collapse" + (questionIdx + 2),
                                                              "radioBtns": [
                                                                             {"name": "Q" + (questionIdx + 2)},
                                                                             {"name": "Q" + (questionIdx + 2)},
                                                                             {"name": "Q" + (questionIdx + 2)},
                                                                             {"name": "Q" + (questionIdx + 2)}
                                                                           ]
                                                             }
                                       );
            
            
            
        };

        
        //save the choosed survey template
        $scope.radioSurveyTemplate = '';
        $scope.surveyTemplateName = '';
        
        //load different template page
        $scope.createTemplate = function () {
            //$scope.surveyTemplateName = this.surveyTemplateName;
            if ($scope.radioSurveyTemplate === 'multiple') {
                console.log('multiple test pass');
                $location.path('multiple-choice-template');
            } else if ($scope.radioSurveyTemplate === 'agreeDisagree') {
                console.log('agree/dis test pass');
                $location.path('surveys');
            } else if ($scope.radioSurveyTemplate === 'shortAnswer') {
                console.log('short answer test pass');
                $location.path('surveys');
            }            
        };
        
		// Create new Survey
		$scope.create = function() {
			// Create new Survey object
			var survey = new Surveys ({
				name: this.name
			});

			// Redirect after save
			survey.$save(function(response) {
				$location.path('surveys/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Survey
		$scope.remove = function(survey) {
			if ( survey ) { 
				survey.$remove();

				for (var i in $scope.surveys) {
					if ($scope.surveys [i] === survey) {
						$scope.surveys.splice(i, 1);
					}
				}
			} else {
				$scope.survey.$remove(function() {
					$location.path('surveys');
				});
			}
		};

		// Update existing Survey
		$scope.update = function() {
			var survey = $scope.survey;

			survey.$update(function() {
				$location.path('surveys/' + survey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Surveys
		$scope.find = function() {
			$scope.surveys = Surveys.query();
		};

		// Find existing Survey
		$scope.findOne = function() {
			$scope.survey = Surveys.get({ 
				surveyId: $stateParams.surveyId
			});
		};
	}
]);