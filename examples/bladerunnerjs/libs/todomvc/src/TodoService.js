/**
 * @interface
 */
function TodoService() {
}

TodoService.prototype.addTodo = function( todo ) {};

TodoService.prototype.updateTodo = function( todo ) {};

TodoService.prototype.removeTodo = function( todo ) {};

TodoService.prototype.getTodos = function() {};

TodoService.prototype.clearCompleted = function() {};

/**
 * Events:
 *
 * 'todo-added' - when a new todo item is added
 * 'todo-removed' - when a todo item is removed
 * `todo-updated` - when an existing todo item is updated
 */

module.exports = TodoService;
