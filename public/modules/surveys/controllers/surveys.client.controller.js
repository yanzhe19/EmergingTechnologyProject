'use strict';
// Surveys controller
    angular.module('surveys')
    .service('surveyNameService', function() {
      var surveyName;

        //surveyName setter
      var setName = function(name) {
          this.surveyName = name;
          //console.log('name: '+this.surveyName );
      };

        //surveyName getter
      var getName = function(){
          return this.surveyName;
      };

      return {
        setName: setName,
        getName: getName
      };
    })
    .controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys','surveyNameService',
	function($scope, $stateParams, $location, Authentication, Surveys,surveyNameService) {
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
        
        $scope.removeRadio = function (radioIdx, questionIdx) {
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
            
            for(var i = questionIdx + 1; i < $scope.questionGroup.length; i++)
            {
                $scope.questionGroup[i].headingID = "heading" + (i + 1);
                $scope.questionGroup[i].collapseID = "collapse" + (i + 1);
                $scope.questionGroup[i].collapseHref = "#collapse" + (i + 1);
                for(var l = 0; l < $scope.questionGroup[i].radioBtns.length; l++)
                {
                    $scope.questionGroup[i].radioBtns[l].name = "Q" + (i + 1);
                }
            }
            
        };
        
        $scope.removeQuestion = function (questionIdx) {
            $scope.questionGroup.splice(questionIdx, 1);
            
            for(var m = questionIdx; m < $scope.questionGroup.length; m++)
            {
                $scope.questionGroup[m].headingID = "heading" + (m + 1);
                $scope.questionGroup[m].collapseID = "collapse" + (m + 1);
                $scope.questionGroup[m].collapseHref = "#collapse" + (m + 1);
                for(var n = 0; n < $scope.questionGroup[m].radioBtns.length; n++)
                {
                    $scope.questionGroup[m].radioBtns[n].name = "Q" + (m + 1);
                }
            }
        };
        
        //save the choosed survey template
        $scope.radioSurveyTemplate;
        $scope.surveyTemplateName = surveyNameService.getName();
        
        //model for the survey time
        $scope.surveyStartTime;
        $scope.surveyEndTime;
        
        //function to validate the survey start and end tiem        
        $scope.validateTime = function(){
            console.log('start time: '+$scope.surveyStartTime);
            console.log('start time: '+$scope.surveyEndTime);
            
            if($scope.surveyEndTime > $scope.surveyStartTime){
                //time ok, create survey
                $scope.timeCheckPass = true;
                $scope.timeError= null;
                console.log('success' + $scope.timeError);
            }else if($scope.surveyEndTime <= $scope.surveyStartTime){
                //end time must after start time
                $scope.timeError = 'The Survey end time must after start time!';
                console.log('fail' + $scope.timeError);
            }
        };
        
        //set the survey name in survey name service;
        $scope.setSurveyName = function(name){
            surveyNameService.setName(name);
        };
        
        //get the survey name from survey name service
        $scope.getSurveyName = function(){
            return surveyNameService.getName();
        };
                
        //load different template page
        $scope.createTemplate = function () {
            $scope.setSurveyName($scope.surveyTemplateName);
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