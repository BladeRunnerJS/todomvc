'use strict';

// Knockout
var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var InputViewModel = require( 'brjstodo/knockout/input/InputViewModel' );

// Angular
var ItemsDirective = require( 'brjstodo/angular/items/ItemsDirective' );
var FilterDirective = require( 'brjstodo/angular/filter/FilterDirective' );

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
};

module.exports = App;
