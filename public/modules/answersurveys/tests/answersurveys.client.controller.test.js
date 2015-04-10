'use strict';

(function() {
	// Answersurveys Controller Spec
	describe('Answersurveys Controller Tests', function() {
		// Initialize global variables
		var AnswersurveysController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Answersurveys controller.
			AnswersurveysController = $controller('AnswersurveysController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Answersurvey object fetched from XHR', inject(function(Answersurveys) {
			// Create sample Answersurvey using the Answersurveys service
			var sampleAnswersurvey = new Answersurveys({
				name: 'New Answersurvey'
			});

			// Create a sample Answersurveys array that includes the new Answersurvey
			var sampleAnswersurveys = [sampleAnswersurvey];

			// Set GET response
			$httpBackend.expectGET('answersurveys').respond(sampleAnswersurveys);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.answersurveys).toEqualData(sampleAnswersurveys);
		}));

		it('$scope.findOne() should create an array with one Answersurvey object fetched from XHR using a answersurveyId URL parameter', inject(function(Answersurveys) {
			// Define a sample Answersurvey object
			var sampleAnswersurvey = new Answersurveys({
				name: 'New Answersurvey'
			});

			// Set the URL parameter
			$stateParams.answersurveyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/answersurveys\/([0-9a-fA-F]{24})$/).respond(sampleAnswersurvey);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.answersurvey).toEqualData(sampleAnswersurvey);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Answersurveys) {
			// Create a sample Answersurvey object
			var sampleAnswersurveyPostData = new Answersurveys({
				name: 'New Answersurvey'
			});

			// Create a sample Answersurvey response
			var sampleAnswersurveyResponse = new Answersurveys({
				_id: '525cf20451979dea2c000001',
				name: 'New Answersurvey'
			});

			// Fixture mock form input values
			scope.name = 'New Answersurvey';

			// Set POST response
			$httpBackend.expectPOST('answersurveys', sampleAnswersurveyPostData).respond(sampleAnswersurveyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Answersurvey was created
			expect($location.path()).toBe('/answersurveys/' + sampleAnswersurveyResponse._id);
		}));

		it('$scope.update() should update a valid Answersurvey', inject(function(Answersurveys) {
			// Define a sample Answersurvey put data
			var sampleAnswersurveyPutData = new Answersurveys({
				_id: '525cf20451979dea2c000001',
				name: 'New Answersurvey'
			});

			// Mock Answersurvey in scope
			scope.answersurvey = sampleAnswersurveyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/answersurveys\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/answersurveys/' + sampleAnswersurveyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid answersurveyId and remove the Answersurvey from the scope', inject(function(Answersurveys) {
			// Create new Answersurvey object
			var sampleAnswersurvey = new Answersurveys({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Answersurveys array and include the Answersurvey
			scope.answersurveys = [sampleAnswersurvey];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/answersurveys\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAnswersurvey);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.answersurveys.length).toBe(0);
		}));
	});
}());