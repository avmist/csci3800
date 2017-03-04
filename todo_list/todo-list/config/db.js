/**
 * Created by shawnmccarthy on 1/22/17.
 */
'use strict;'
//Include crypto to generate the todo id
var crypto = require('crypto');

module.exports = function() {
    return {
        todoList : [],
        /*
         * Save the todo inside the "db".
         */
        save : function(todo) {
            todo.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.todoList.push(todo);
            return 1;
        },
        /*
         * Retrieve a todo with a given id or return all the todos if the id is undefined.
         */
        find : function(id) {
            if(id) {
                return this.todoList.find(element => {
                        return element.id === id;
            });
            }else {
                return this.todoList;
            }
        },
        /*
         * Delete a todo with the given id.
         */
        remove : function(id) {
            var found = 0;
            this.todoList = this.todoList.filter(element => {
                    if(element.id === id) {
                found = 1;
            }else {
                return element.id !== id;
            }
        });
            return found;
        },
        /*
         * Update a todo with the given id
         */
        update : function(id, todo) {
            var todoIndex = this.todoList.findIndex(element => {
                    return element.id === id;
        });
            if(todoIndex !== -1) {
                this.todoList[todoIndex].title = todo.title;
                this.todoList[todoIndex].year = todo.year;
                return 1;
            }else {
                return 0;
            }
        }
    }
};
