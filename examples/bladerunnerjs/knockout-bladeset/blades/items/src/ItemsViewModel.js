"use strict";

var ServiceRegistry = require( 'br/ServiceRegistry' );
var TodoViewModel = require( './TodoViewModel' );
var ko = require( 'ko' );

// TODO: This should go somewhere nicer
ko.bindingHandlers.selectAndFocus = {
  init: function (element, valueAccessor, allBindingsAccessor, bindingContext) {
    ko.bindingHandlers.hasFocus.init(element, valueAccessor, allBindingsAccessor, bindingContext);
    ko.utils.registerEventHandler(element, 'focus', function () {
      element.focus();
    });
  },
  update: function (element, valueAccessor) {
    ko.utils.unwrapObservable(valueAccessor()); // for dependency
    // ensure that element is visible before trying to focus
    setTimeout(function () {
      ko.bindingHandlers.hasFocus.update(element, valueAccessor);
    }, 0);
  }
};

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

/**
 * The View Model representing the UI for a list of todo items.
 */
function ItemsViewModel() {
  this._todoService = ServiceRegistry.getService( 'todomvc.storage' );
  this._todoService.on( 'todo-added', this._todoAdded, this );
  this._todoService.on( 'todo-removed', this._todoRemoved, this );

  var todos = this._todoService.getTodos();
  var todoVMs = [];
  todos.forEach( function( todo ) {
    todoVMs.push( new TodoViewModel( todo ) );
  } );

  this.todos = ko.observableArray( todoVMs );

  this.statusFilter = ko.observable( '' );

  var eventHub = ServiceRegistry.getService( 'br.event-hub' );
  eventHub.channel( 'todo-filter' ).on( 'filter-changed', function( filter ) {
    this.statusFilter( filter );
  }.bind( this ) );

  this.filteredTodos = ko.computed(function () {
		switch (this.statusFilter()) {
  		case 'active':
  			return this.todos().filter(function (todo) {
  				return !todo.completed();
  			});
  		case 'completed':
  			return this.todos().filter(function (todo) {
  				return todo.completed();
  			});
  		default:
  			return this.todos();
		}
	}.bind(this));

  this.listVisible = new ko.computed(function() {
      return this.todos().length;
    }, this);

  // count of all completed todos
  this.completedCount = ko.computed(function () {
      var count = this.todos().filter(function (todo) {
        return todo.completed();
      }).length;

      return count;
    }, this );

  // count of todos that are not complete
  this.remainingCount = ko.computed(function () {
      var remaining = ( this.todos().length - this.completedCount() );
      return remaining;
    }, this );

  this.allCompleted = ko.computed({
      //always return true/false based on the done flag of all todos
      read: function () {
        return !this.remainingCount();
      },
      // set all todos to the written value (true/false)
      write: function (newValue) {
        this.todos().forEach(function (todo) {
          // set even if value is the same, as subscribers are not notified in that case
          todo.completed(newValue);
        });
      }
    }, this);

}

/** @private */
ItemsViewModel.prototype._todoAdded = function( added ) {
  var todoViewModel = new TodoViewModel( added );
  this.todos.push( todoViewModel );
};

/** @private */
ItemsViewModel.prototype._todoRemoved = function( removed ) {
  this.todos().forEach( function( todoVM ) {
    if( todoVM.getTodo() === removed ) {
      this.todos.remove( todoVM );
    }
  }, this );
};

/** @private */
ItemsViewModel.prototype._clearCompleted = function() {
  this.todos.remove( function( todo ) {
    return todo.completed();
  } );
};

/**
 * Called from the view to remove a todo item.
 */
ItemsViewModel.prototype.remove = function( item ) {
  // remove view model
  this.todos.remove( item );
  // remove domain model
  this._todoService.removeTodo( item.getTodo() );
};

/**
 * Called from view
 */
ItemsViewModel.prototype.editItem = function( item ) {
  item.editing( true );
  item.previousTitle = item.title();
};

/**
 * Called from view.
 * Note: keypress isn't triggered for ESC key.
 */
ItemsViewModel.prototype.keyPressed = function( item, event ) {
  if( event.keyCode === ENTER_KEY_CODE ) {
    this.saveEdit( item );
  }

  return true;
};

/**
 * Called from view.
 */
ItemsViewModel.prototype.saveEdit = function( item ) {
  item.editing(false);

  var title = item.title();
  var trimmedTitle = title.trim();

  // Observable value changes are not triggered if they're consisting of whitespaces only
  // Therefore we've to compare untrimmed version with a trimmed one to chech whether anything changed
  // And if yes, we've to set the new value manually
  if ( title !== trimmedTitle ) {
    item.title(trimmedTitle);
  }

  if ( !trimmedTitle ) {
    this.remove( item );
  }
};

/**
 * Called from view on keydown.
 */
ItemsViewModel.prototype.cancelEditing = function( item, event ) {
  if( event.keyCode === ESCAPE_KEY_CODE ) {
    item.editing( false );
    item.title( item.previousTitle );
  }

  return true;
};

/**
 * Called from view.
 */
ItemsViewModel.prototype.stopEditing = function( item ) {
  item.editing( false );
  if( item.title().length === 0 ) {
    this.remove( item );
  }
};

module.exports = ItemsViewModel;
