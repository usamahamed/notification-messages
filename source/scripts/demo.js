/**
 * @ngdoc object
 * @name  Demo
 * @description 
 *
 * Module of the example app
 */
var app = angular.module('Demo', ['notification-messages']);
/**
 * @ngdoc controller
 * @name Demo.controller:DemoController
 * @description 
 * 
 * This is the main controller of the demo app module.
 */
 app.controller('DemoController', ['$scope', 'Notification', function($scope, Notification){
	// array to collect the notifications data
	$scope.notes = [];
	// object to bind input data
	$scope.note = {
		id: '',
		from: 'userManagement',
		category: 'info',
		type: 'note',
		header: '',
		content: ''
	};
	//procedure to lazilly fill the form
	$scope.useMockup = function() {
		
		$scope.note = {
			from: 'userManagement',
			header: 'Header',
			content: 'Lorem ipsum dolor sit amet.'
		};

		switch(Math.floor(Math.random()*3)) {
			case 0 : $scope.note.category = 'info';
				break;
			case 1 : $scope.note.category = 'warning';
				break;
			case 2 : $scope.note.category = 'error';
				break;
		}

		switch(Math.floor(Math.random()*3)) {
			case 0 : $scope.note.type = 'note';
				break;
			case 1 : $scope.note.type = 'ok_confirm';
				break;
			case 2 : $scope.note.type = 'ok_cancel_confirm';
				break;
		}

	};
	// precedure to create a notification, save it, alert it and clean the form
	$scope.createNote = function() {
		$scope.note.id = $scope.notes.length + 1;
		Notification.notify($scope.note);
		$scope.notes.push($scope.note);
		$scope.note = {
			id: '',
			from: 'userManagement',
			category: 'info',
			type: 'note',
			header: '',
			content: ''
		};
	};
	$scope.get = function() {
		Notification.getFromServer();
	};
}]);