'use strict';
    var surveyApp = angular.module('surveys');
    //+++++++++++++++++++++++Name service++++++++++++++++++++++++
    surveyApp.factory('surveyNameService', function() {
      var surveyName ;
        
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
    });

    //+++++++++++++++++++++survey questions service++++++++++++++++++++
    surveyApp.factory('questionsService', [function() {
        var questionsObj;
        
        //questionsObj setter
      var setQuestionsObj = function(inputObj) {
          this.questionsObj = inputObj;
          //console.log('name: '+this.surveyName );
      };

        //questionsObj getter
      var getQuestionsObj = function(){
          return this.questionsObj;
      };

      return {
        setQuestionsObj: setQuestionsObj,
        getQuestionsObj: getQuestionsObj
      };
    }]);

    //+++++++++++++++++++++SurveysController+++++++++++++++++++++
    surveyApp.controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys','surveyNameService','questionsService',
	function($scope, $stateParams, $location, Authentication, Surveys,surveyNameService,questionsService) {
		$scope.authentication = Authentication;

        //this is the list of all surveys in database
        //$scope.surveys = Surveys.query();
        //list of all quesions in this survey
        $scope.questionGroup = [
            {
             'questionTxt': '',
             'questionOptions': [
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''}
                          ]
            },
            {
             'questionTxt': '',
             'questionOptions': [
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''}
                          ]
            },
            {
             'questionTxt': '',
             'questionOptions': [
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''}
                          ]
            },
            {
             'questionTxt': '',
             'questionOptions': [
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''},
                            {'optionTxt': ''}
                          ]
            }
        ];
        
        $scope.display = false;
        $scope.addRemoveAddBtn = function(questionIdx){            
            if($scope.questionGroup[questionIdx].questionOptions.length === 0)
            {
               $scope.display = true;
            }
            else
            {
               $scope.display = false;
            }
            return $scope.display;
        };
        
        $scope.addRadio = function (radioIdx, questionIdx) {
            $scope.questionGroup[questionIdx].questionOptions.splice(radioIdx + 1, 0, {'optionTxt': ''});
        };
        
        $scope.removeRadio = function (radioIdx, questionIdx) {
            $scope.questionGroup[questionIdx].questionOptions.splice(radioIdx, 1);            
        };
        
        $scope.addQuestion = function (questionIdx) {
            $scope.questionGroup.splice(questionIdx + 1, 0,  { 
                                                              'questionTxt': '',
                                                              'questionOptions': [
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''}
                                                                           ]
                                                             }
                                       );            
        };
        
        $scope.removeQuestion = function (questionIdx) {
            $scope.questionGroup.splice(questionIdx, 1);
        };
        
        $scope.validateSurveyForm = function(){
            $scope.validForm = false;
            if($scope.questionGroup.length === 0)
            {
                $scope.validForm = false;
            }
            else
            {
                $scope.validForm = true;
                for(var k = 0; k < $scope.questionGroup.length; k++)
                {
                    if($scope.questionGroup[k].questionOptions.length === 0)
                    {
                        $scope.validForm = false;
                    }
                }
            }
            return $scope.validForm;
        };
        
        //save the choosed survey template
        $scope.radioSurveyTemplate = null;
        $scope.surveyTemplateName = surveyNameService.getName();
        
        //model for the survey time
        $scope.surveyStartTime = null;
        $scope.surveyEndTime = null;
        
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
           
        //load different template page
        $scope.createTemplate = function () {
            surveyNameService.setName($scope.surveyTemplateName);
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
        
        $scope.goToSetSurveyTime = function() {
            questionsService.setQuestionsObj($scope.questionGroup);
            //set or update the survey name
            surveyNameService.setName($scope.surveyTemplateName);
            $location.path('setsurveylifetime');        
        };
        
        $scope.backToCreateSurvey = function(){
            $location.path('surveys/choose-survey-template');
        };
        
		// Create new Survey
		$scope.create = function() {
            var insertedName = surveyNameService.getName();
            console.log(this.insertedName);
            var insertedQuestions =  questionsService.getQuestionsObj();
			// Create new Survey object
			var survey = new Surveys ({
				name: insertedName,
                startTime: $scope.surveyStartTime,
                endTime: $scope.surveyEndTime,
                questions: insertedQuestions
			});

			// Redirect after save
			survey.$save(function(response) {
				$location.path('surveys/' + response._id);

				// Clear form fields
				surveyNameService.setName('');
                questionsService.setQuestionsObj('');
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
		$scope.findSurveyByUserID = function() {
			$scope.surveys = Surveys.get({ 
				userId: $stateParams.surveyId
			});
		};
        
		// Find existing Survey
		$scope.findOne = function() {
			$scope.survey = Surveys.get({ 
				surveyId: $stateParams.surveyId
			});
		};
        
        $scope.addQueForUpdate = function(queIdx){
             $scope.survey.questions.splice(queIdx + 1, 0,  { 
                                                              'questionTxt': '',
                                                              'questionOptions': [
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''},
                                                                             {'optionTxt': ''}
                                                                           ]
                                                             }
                                       );   
        };
        
        $scope.removeQueForUpdate = function(queIdx){
            $scope.survey.questions.splice(queIdx, 1);
        };
        
        $scope.addRadioForUpdate = function (rdoIdx, queIdx) {
            $scope.survey.questions[queIdx].questionOptions.splice(rdoIdx + 1, 0, {'optionTxt': ''});
        };
        
        $scope.removeRadioForUpdate = function (rdoIdx, queIdx) {
            $scope.survey.questions[queIdx].questionOptions.splice(rdoIdx, 1);            
        };
        
        $scope.addBtnOnNoRdoForUpdate = function(queIdx){            
            if($scope.survey.questions[queIdx].questionOptions.length === 0)
            {
               $scope.display = true;
            }
            else
            {
               $scope.display = false;
            }
            return $scope.display;
        };
        
        $scope.validateSurveyFormForUpdate = function(){
            $scope.validForm = false;
            if($scope.survey.questions.length === 0)
            {
                $scope.validForm = false;
            }
            else
            {
                $scope.validForm = true;
                for(var k = 0; k < $scope.survey.questions.length; k++)
                {
                    if($scope.survey.questions[k].questionOptions.length === 0)
                    {
                        $scope.validForm = false;
                    }
                }
            }
            return $scope.validForm;
        };
        
        //function to validate the survey start and end time for update form        
        $scope.validateTimeForUpdate = function(){
            if($scope.survey.endTime > $scope.survey.startTime){
                //time ok, create survey
                $scope.timeCheckPass = true;
            }else if($scope.survey.endTime <= $scope.survey.startTime){
                //end time must after start time
                $scope.timeCheckPass = false;
            }
            return $scope.timeCheckPass;
        };
        
        $scope.backToSurveyList = function(){
            $location.path('surveys');
        };
	}
]);