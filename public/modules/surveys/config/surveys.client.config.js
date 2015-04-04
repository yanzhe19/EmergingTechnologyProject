'use strict';

// Configuring the Articles module
angular.module('surveys').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Surveys', 'surveys', 'dropdown', '/surveys(/create)?');
		Menus.addSubMenuItem('topbar', 'surveys', 'List Surveys', 'surveys');
		Menus.addSubMenuItem('topbar', 'surveys', 'New Survey', 'surveys/create');
	}
]);