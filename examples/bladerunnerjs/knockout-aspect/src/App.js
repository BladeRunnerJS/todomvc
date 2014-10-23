'use strict';

var KnockoutComponent = require( 'br/knockout/KnockoutComponent' );
var InputViewModel = require( 'brjstodo/knockout/input/InputViewModel' );
var ItemsViewModel = require( 'brjstodo/knockout/items/ItemsViewModel' );
var FilterViewModel = require( 'brjstodo/knockout/filter/FilterViewModel' );

var ServiceRegistry = require( 'br/ServiceRegistry' );
var LocalStorageService = require( 'todomvc/LocalStorageService' );
var todoService = new LocalStorageService();
ServiceRegistry.registerService( 'todomvc.storage', todoService );

var App = function() {

  var todoAppEl = document.getElementById( 'todoapp' );

  // todo input Blade
  var inputModel = new InputViewModel();
  var inputComponent = new KnockoutComponent( 'brjstodo.knockout.input.view-template', inputModel );
  var inputEl = inputComponent.getElement();
  todoAppEl.appendChild( inputEl );

  // todo items Blade
  var itemsModel = new ItemsViewModel();
  var itemsComponent = new KnockoutComponent( 'brjstodo.knockout.items.view-template', itemsModel );
  var itemsEl = itemsComponent.getElement();
  todoAppEl.appendChild( itemsEl );

  // todo filter/footer
  var filterModel = new FilterViewModel();
  var filterComponent = new KnockoutComponent( 'brjstodo.knockout.filter.view-template', filterModel );
  var filterEl = filterComponent.getElement();
  todoAppEl.appendChild( filterEl );
};

module.exports = App;
