'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function FilterDirective() {
	var HtmlService = ServiceRegistry.getService( 'br.html-service' );
	var todoService = ServiceRegistry.getService( 'todomvc.storage' );
	var eventHub = ServiceRegistry.getService( 'br.event-hub' );

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.angular.filter.view-template' ).innerHTML;

	this.controller = function( $scope, $timeout ) {

		$scope.todos = todoService.getTodos();

		function update() {
			var todos = todoService.getTodos();
			var completedCount = 0;
			todos.forEach(function (todo) {
				completedCount += ( todo.completed? 1 : 0 );
			});
			$scope.remainingCount = ( todos.length - completedCount );
			$scope.completedCount = completedCount;
		}

		update();

		$scope.clearCompletedTodos = function () {
			todoService.clearCompleted();
		};

		$scope.status = '';
		$scope.filterChanged = function() {
			eventHub.channel( 'todo-filter' )
				.trigger( 'filter-changed', $scope.status );
		};

		eventHub.channel( 'todo-filter' ).on( 'filter-changed', function( filter ) {
			if( $scope.status !== filter ) {
				// event may not arrive within a digest loop
				$timeout( function() {
					$scope.status = filter;
				} );
			}
		} );

		todoService.on( 'todo-added', update );
		todoService.on( 'todo-updated', update );
		todoService.on( 'todo-removed', update );
	};

}

module.exports = FilterDirective;
