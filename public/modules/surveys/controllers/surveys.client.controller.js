'use strict';
//angular.module('surveys', ["ui.bootstrap", "ui.bootstrap.datetimepicker"]);

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
        
        //save the choosed survey template
        $scope.radioSurveyTemplate;
        $scope.surveyTemplateName = surveyNameService.getName();
        
        //model for the survey time
        $scope.surveyStartTime;
        $scope.surveyEndTime;
        
        //function to validate the survey start and end tiem        
        $scope.validateTime = function(){
            console.log("start time: "+$scope.surveyStartTime);
            console.log("start time: "+$scope.surveyEndTime);
            
            if($scope.surveyEndTime > $scope.surveyStartTime){
                //time ok, create survey
                $scope.timeCheckPass = true;
                $scope.timeError= null;
                console.log("success" + $scope.timeError);
            }else if($scope.surveyEndTime <= $scope.surveyStartTime){
                //end time must after start time
                $scope.timeError = "The Survey end time must after start time!";
                console.log("fail" + $scope.timeError);
            }
        };
        
        //set the survey name in survey name service;
        $scope.setSurveyName = function(name){
            surveyNameService.setName(name);
        }
        
        //get the survey name from survey name service
        $scope.getSurveyName = function(){
            return surveyNameService.getName();
        }
                
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