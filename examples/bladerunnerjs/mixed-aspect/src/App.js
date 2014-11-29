'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );
var eventHub = ServiceRegistry.getService( 'br.event-hub' );

// Knockout
var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var InputViewModel = require( 'brjstodo/knockout/input/InputViewModel' );

// Angular
var ItemsDirective = require( 'brjstodo/angular/items/ItemsDirective' );
var FilterDirective = require( 'brjstodo/angular/filter/FilterDirective' );

var Router = require( 'director' ).Router;

var angular = require( 'angular' );

var App = function() {

  // todo input blade - Knockout
  var todoAppEl = document.getElementById( 'todoapp' );
  var inputModel = new InputViewModel();
  var inputComponent = new KnockoutComponent( 'brjstodo.knockout.input.view-template', inputModel );
  var inputEl = inputComponent.getElement();
  todoAppEl.insertBefore( inputEl, todoAppEl.firstChild );

  angular.module( 'brjstodo', [] )

    // todo items blade - Angular
    .directive('todoItems', function() {
      return new ItemsDirective();
    } )

    // todo filter blade - Angular
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
    eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', '' );
  };

  App.prototype.active = function() {
    eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', 'active' );
  };

  App.prototype.completed = function() {
    eventHub.channel( 'todo-filter' )
    .trigger( 'filter-changed', 'completed' );
  };

module.exports = App;
