'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

var InputDirective = function() {
	var todoService = ServiceRegistry.getService( 'todomvc.storage' );
	var HtmlService = ServiceRegistry.getService( 'br.html-service' );

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.angular.input.view-template' ).innerHTML;

	this.controller = function( $scope ) {
		$scope.newTodo = '';
		$scope.addTodo = function() {
			var newTodo = $scope.newTodo.trim();
			if (!newTodo.length) {
				return;
			}

			var todoItem = { title: newTodo, completed: false };
			todoService.addTodo( todoItem );

			$scope.newTodo = '';
		};
	};

};

module.exports = InputDirective;
