// Todo vanillaJS code below

var todos = [
    "todo1", "todo2", "todo3"
];

displayTodos = function(array) {
    console.log(array);
}

addTodo = function(todo) {
    todos.push(todo);
}

changeTodo = function(position, value) {
    todos[position] = value;
}

deleteTodo = function(position) {
    todos.splice(position, 1);
}

// ===============================================
// Tests for Todo app - using tinytest.js
// ===============================================

// var fail               = TinyTest.fail.bind(TinyTest),
//     assert             = TinyTest.assert.bind(TinyTest),
//     assertEquals       = TinyTest.assertEquals.bind(TinyTest),
//     eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
//     assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),

// Version 1
// It should have a place to store todos
tests({
    'It should have a place to store todos': function() {
        assert(todos);
    },
});
// It should have a way to display todos
tests({
    'It should have a place to display todos': function() {
        assertStrictEquals("todo1", todos[0]);
    },
});
// It should have a way to add new todos
tests({
    'It should have a way to add new todos': function() {
        addTodo("todo4");
        eq(todos.length, 4);
    },
});
// It should have a way to change a todo
tests({
    'It should have a way to change a todo': function() {
        changeTodo(0, "todo1_changed");
        eq(todos[0], "todo1_changed");
    }
})
// It should have a way to delete a todo
tests({
    'It should have a way to delete a todo': function() {
        var originalTodoLength = todos.length;
        deleteTodo(1);
        eq(originalTodoLength - 1, todos.length);
    }
})

// Version 2
// It should have a function to display todos
tests({
    'It should have a function to display todos': function() {
        displayTodos(todos);
        //console.log(displayTodos(todos));
        assert(displayTodos(todos), "It works");
    },
});
// It should have a function to add todos
// It should have a function to chnage todos
// It should have a function to delete todos

// Version 3
// It should store the todos array on an object
// It should have a displayTodos method
// It should have a addTodo method
// It should have a changeTodo method
// It should have a deleteTodo method

// Version 4
// todoList.addTodo should add objects
// todoList.changeTodo should change the todoText property
// todoList.toggleCompleted should change the completed property

// Version 5
// .displayTodos should show .todoText
// .displayTodos should tell you if .todos is empty
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
