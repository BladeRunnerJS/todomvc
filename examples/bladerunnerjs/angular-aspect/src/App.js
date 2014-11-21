'use strict';

var InputDirective = require( 'brjstodo/angular/input/InputDirective' );
var ItemsDirective = require( 'brjstodo/angular/items/ItemsDirective' );
var FilterDirective = require( 'brjstodo/angular/filter/FilterDirective' );

var ServiceRegistry = require( 'br/ServiceRegistry' );
var eventHub = ServiceRegistry.getService( 'br.event-hub' );

var angular = require( 'angular' );

var Router = require( 'director' ).Router;

var App = function() {
  angular.module( 'brjstodo', [] )

    .directive('todoInput', function() {
      return new InputDirective();
    } )

    .directive('todoItems', function() {
      return new ItemsDirective();
    } )

    .directive('todoFilter', function() {
      return new FilterDirective();
    } );

  var routes = {
    '/': this.root.bind( this ),
    '/active': this.active.bind( this ),
    '/completed': this.completed.bind( this )
  };

  var router = Router( routes );
  router.init();

  if( !window.location.hash ) {
    window.location.hash = '#/';
  }
};

App.prototype.root = function() {
  console.log( 'root' );
  eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', '' );
};

App.prototype.active = function() {
  console.log( 'active' );
  eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', 'active' );
};

App.prototype.completed = function() {
  console.log( 'completed' );
  eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', 'completed' );
};

module.exports = App;
