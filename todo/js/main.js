// PracticalJS - Todo vanillaJS code below

var todoList = {
    todoText: [
      "todo1", "todo2", "todo3"
    ],
    displayTodos: function(array) {
        var todoItem = document.getElementById("todo_item");
        todoItem.innerHTML = array
    },
    addTodo: function(todoItem) {
        this.todoText.push({todoItem});
    },
    changeTodo: function(position, value) {
        this.todoText[position] = value;
    },
    deleteTodo: function(position) {
        this.todoText.splice(position, 1);
    },
    toggleCompleted: function(){

    }
}

// ===============================================
// Tests for Todo app - using tinytest.js
// ===============================================
// TEST ASSERTIONS
// var fail               = TinyTest.fail.bind(TinyTest),
//     assert             = TinyTest.assert.bind(TinyTest),
//     assertEquals       = TinyTest.assertEquals.bind(TinyTest),
//     eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
//     assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),

// Version 1
// It should have a place to store todos
tests({
    'It should have a place to store todos': function() {
        assert(todoList.todoText);
    },
});
// It should have a way to display todoText
tests({
    'It should have a place to display todos': function() {
        var todoItem = document.getElementById("todo_item");
        todoList.displayTodos(todoList.todoText);
        assertStrictEquals(todoList.todoText.toString(), todoItem.innerHTML);
    },
});
// It should have a way to add new todos
tests({
    'It should have a way to add new todos': function() {
        todoList.addTodo("todo4");
        eq(todoList.todoText.length, 4);
    },
});
// It should have a way to change a todo
tests({
    'It should have a way to change a todo': function() {
        todoList.changeTodo(0, "todo1_changed");
        eq(todoList.todoText[0], "todo1_changed");
    }
})
// It should have a way to delete a todo
tests({
    'It should have a way to delete a todo': function() {
        var originalTodoLength = todoList.todoText.length;
        todoList.deleteTodo(1);
        eq(originalTodoLength - 1, todoList.todoText.length);
    }
})

// Version 2
// It should have a function to display todos
tests({
    'It should have a function to display todos': function() {
        eq(typeof todoList.displayTodos, "function");
    },
});
// It should have a function to add todos
tests({
    'It should have a function to add todos': function() {
        eq(typeof todoList.addTodo, "function");
    },
});
// It should have a function to change todos
tests({
    'It should have a function to change todos': function() {
        eq(typeof todoList.changeTodo, "function");
    },
});
// It should have a function to delete todos
tests({
    'It should have a function to delete todos': function() {
        eq(typeof todoList.deleteTodo, "function");
    },
});

// Version 3
// It should store the todos array on an object
tests({
    'It should store the todos array on an object': function() {
        eq(typeof todoList.todoText, "object")
    }
});
// It should have a displayTodos method
tests({
    'It should have a displayTodos method': function() {
        assert(todoList.displayTodos, "Doesn't exist")
    }
});
// It should have a addTodo method
tests({
    'It should have a addTodo method': function() {
        assert(todoList.addTodo, "Doesn't exist")
    }
});
// It should have a changeTodo method
tests({
    'It should have a changeTodo method': function() {
        assert(todoList.changeTodo, "Doesn't exist")
    }
});
// It should have a deleteTodo method
tests({
    'It should have a deleteTodo method': function() {
        assert(todoList.deleteTodo, "Doesn't exist")
    }
});

// Version 4
// todoList.addTodo should add objects
tests({
    'todoList.addTodo should add objects': function() {
        //debugger;
        todoList.addTodo("hello");
        var lastArrayPosition = todoList.todoText.length - 1;
        console.log(todoList.todoText[lastArrayPosition]);
        eq(typeof todoList.todoText[lastArrayPosition], "object");
    }
})
// =============================
// KENNY NOTES (Work in progress)
// todoApp is the app object
// todoList is the array of todoitems
// >> todoList has an object for each todo.
// >> Within the object are the following properties:
// todoText
// completed
// =============================

// todoList.changeTodo should change the todoText property
// todoList.toggleCompleted should change the completed property

// Version 5
// .displayTodos should show .todoText
// .displayTodos should tell you if todo is empty
// .displayTodos should show .completed

// Version 6
// toggleAll: If everything's true, make everything false.
// toggleAll: Otherwise, make everything true

// Version 7
// There shold be a "Display todos" button and a "Toggle all" button in the app.
// Clicking "Display todos" should run todoList.displayTodos.
// Clicking "Toggle all" should run todoList.toggleAll.

// Version 8
// It should have working controls for .addTodo
// It should have working controls for .changeTodo
// It should have working controls for .deleteTodo
// It should have working controls for .toggleCompleted

// Version 9
// There should be an li element for every todo
// Each li element should contain .todoText
// Each li element shoudl show .completed

// Version 10
// There should be a way to create delete buttons
// There should be a delete button for each todo
// Each li should have an id that has the todo position
// Delete buttons should have access to the todo id
// Clicking delete should update todoList.todos and the DOM

// Version 11
// todoList.toggleAll should use forEach
// view.displayTodos shoudl use forEach
