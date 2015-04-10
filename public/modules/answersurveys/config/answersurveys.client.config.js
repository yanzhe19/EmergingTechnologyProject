'use strict';

// Configuring the Articles module
angular.module('answersurveys').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Answer surveys', 'answersurveys', 'dropdown', '/answersurveys(/create)?');
		Menus.addSubMenuItem('topbar', 'answersurveys', 'List Answersurveys', 'answersurveys');
		Menus.addSubMenuItem('topbar', 'answersurveys', 'Answer a survey', 'answersurveys/create');
	}
]);