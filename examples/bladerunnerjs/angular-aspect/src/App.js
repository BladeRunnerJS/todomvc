'use strict';

var InputDirective = require( 'brjstodo/angular/input/InputDirective' );
var ItemsDirective = require( 'brjstodo/angular/items/ItemsDirective' );
var FilterDirective = require( 'brjstodo/angular/filter/FilterDirective' );

var angular = require( 'angular' );

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
};

module.exports = App;
