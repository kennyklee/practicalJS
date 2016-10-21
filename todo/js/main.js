// PracticalJS - Todo vanillaJS code below
var todoList = {
    todos: [
        {
            todoText: "todo1",
            completed: false
        },
        {
            todoText: "todo2",
            completed: false
        },
        {
            todoText: "todo3",
            completed: false
        }
    ],
    displayTodos: function() {
        var todoItem = document.getElementById("todo_list");
        var todoDivs = "";
        if (this.todos.length) {
            for (var i = 0; i < this.todos.length; i++ ) {
                if (this.todos[i].completed) {
                    todoDivs += "<li><span>(&#x2713;)</span> <span>" + this.todos[i].todoText + "</span></li>";
                } else {
                    todoDivs += "<li><span>(&nbsp;&nbsp;&nbsp;)</span> <span>" + this.todos[i].todoText + "</span></li>";
                }
            }
            todoItem.innerHTML = todoDivs;
        } else {
            todoItem.innerHTML = "<li>No todos</li>";
        }
    },
    addTodo: function(todoText, completed = false) {
        this.todos.push(
            {
                todoText: todoText,
                completed: completed
            }
        );
        this.displayTodos();
    },
    changeTodo: function(position, value) {
        this.todos[position] = value;
        this.displayTodos();
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },
    toggleCompleted: function(position) {
        if (position === undefined) {
            console.log("Please include a position as an argument.");
            return;
        }
        this.todos[position].completed = !this.todos[position].completed;
        this.displayTodos();
    },
    toggleAll: function() {
            var totalTodos = this.todos.length;
            var completedTodos = 0;

            // Get number of completed todos.
            for (var i = 0; i < totalTodos; i++) {
                if (this.todos[i].completed) {
                    completedTodos++;
                }
            }

            // Compare num of completed todos to total todos
            // If everything is true, make it false.
            if (completedTodos === totalTodos) {
                for (var i = 0; i < totalTodos; i++) {
                    this.todos[i].completed = false
                }
            }
            // Otherwise, Make everything true
            else {
                for (var i = 0; i < totalTodos; i++) {
                    this.todos[i].completed = true;
                }
            }
        this.displayTodos();
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
        assert(todoList.todos);
    },
});
// It should have a way to display todoText
tests({
    'It should have a place to display todos': function() {
        var todoItem = document.getElementById("todo_list");
        todoList.displayTodos(todoList.todos); //Populate the todolist.
        assert(todoItem.innerHTML, "Todo list is empty");
    },
});
// It should have a way to add new todos
tests({
    'It should have a way to add new todos': function() {
        var newTodoItem = {todoText: "Changed todoText", completed: true}
        todoList.addTodo(newTodoItem);
        eq(todoList.todos.length, 4);
    },
});
// It should have a way to change a todo
tests({
    'It should have a way to change a todo': function() {
        todoList.changeTodo(0, "todo1_changed");
        eq(todoList.todos[0], "todo1_changed");
    }
})
// It should have a way to delete a todo
tests({
    'It should have a way to delete a todo': function() {
        var originalTodoLength = todoList.todos.length;
        todoList.deleteTodo(1);
        eq(originalTodoLength - 1, todoList.todos.length);
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
        eq(typeof todoList.todos, "object")
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
        var newTodoItem = {todoText: "added Todo", completed: true}
        todoList.addTodo(newTodoItem);
        var lastArrayPosition = todoList.todos.length - 1;
        eq(typeof todoList.todos[lastArrayPosition], "object");
    }
})
// todoList.changeTodo should change the todoText property
tests({
    'todoList.changeTodo should change the todoText property': function() {
        //debugger;
        var newTodoItem = {todoText: "Changed todoText", completed: true};
        todoList.changeTodo(0, newTodoItem);
        var lastArrayPosition = todoList.todos.length - 1;
        eq(typeof todoList.todos[lastArrayPosition], "object");
    }
})
// todoList.toggleCompleted should change the completed property
tests({
    'todoList.toggleCompleted should change the completed property': function() {
        var position = 0;
        var beforeToggle = todoList.todos[position].completed;
        // console.log(beforeToggle);
        todoList.toggleCompleted(position);
        var afterToggle = todoList.todos[position].completed;
        // console.log(afterToggle);
        assert(!(beforeToggle === afterToggle), "Doesn't equal");
    }
});

// Version 5
// .displayTodos should show .todoText
tests({
    '.displayTodos should show .todoText': function() {
        var todoDivs = document.getElementById("todo_list");
        todoList.displayTodos(todoList.todos);
        // The todoListText id should contain the list of todos.
        // Test by comparing the list of todos in the array with the number of <li> in the HTML todo list.
        // console.log("HTML li: ", todoListText.childNodes.length);
        // console.log("Array length: ", todoList.todos.length);
        eqs(todoDivs.childNodes.length, todoList.todos.length);
    }
});
// .displayTodos should tell you if todo is empty
tests({
    '.displayTodos should tell you if todo is empty': function() {
        var todoDivs = document.getElementById("todo_list");
        todoList.todos = []; // Make an emtpy list of todos;
        todoList.displayTodos(); // Display the list.
        eqs(todoDivs.childNodes[0].innerHTML, "No todos");
    }
});
// .displayTodos should show .completed
tests({
    '.displayTodos should show .completed': function() {
        //If todo is complete, it should show checkbox that is checked.
        var todoDiv = document.getElementById("todo_list");
        todoList.todos = [{todoText: "Completed task", completed: true}];
        todoList.displayTodos();
        eq(todoDiv.children[0].children[0].innerText, "(✓)");
    }
})

// Version 6
// toggleAll: If everything's true, make everything false.
tests({
    'toggleAll: If everythings true, make everything false': function() {
        // Todos with all completed
        todoList.todos = [
            {todoText: "todo1", completed: true},
            {todoText: "todo2", completed: true},
            {todoText: "todo3", completed: true},
        ]
        todoList.displayTodos();
        todoList.toggleAll();

        var totalTodos = todoList.todos.length;
        var completedTodos = 0;
        for (var i = 0; i < totalTodos; i++) {
            if (todoList.todos[i].completed) {
                completedTodos++;
            }
        }
        eqs(completedTodos, 0);
    }
});
// toggleAll: Otherwise, make it true
tests({
    'toggleAll: If everythings true, make everything false': function() {
        // Todos with all completed
        todoList.todos = [
            {todoText: "todo1", completed: false},
            {todoText: "todo2", completed: false},
            {todoText: "todo3", completed: true},
        ]
        todoList.displayTodos();
        todoList.toggleAll();

        var totalTodos = todoList.todos.length;
        var completedTodos = 0;
        for (var i = 0; i < totalTodos; i++) {
            if (todoList.todos[i].completed) {
                completedTodos++;
            }
        }
        eqs(completedTodos, 3);
    }
});

// Version 7
// There should be a "Display todos" button and a "Toggle all" button in the app.
tests({
    'There should be a "Display Todos" button and a "Toggle all" button in the app': function() {
        var displayTodosButton = document.getElementById("display_todos");
        var toggleAllButton = document.getElementById("toggle_all");
        assert(displayTodosButton, "No button");
        assert(toggleAllButton, "No button");
    }
});
// Clicking "Display todos" should run todoList.displayTodos.
tests({
    'Clicking "Display todos" should run todoList.displayTodos': function() {
        var todoDivs = document.getElementById("todo_list");
        var displayTodosButton = document.getElementById("display_todos");
        todoList.todos = [
            {todoText: "Display button clicked!", completed: false}
        ]
        displayTodosButton.click();
        eq(todoDivs.children[0].children[1].innerText, "Display button clicked!");
    }
})

// Clicking "Toggle all" should run todoList.toggleAll.
tests({
    'Clicking "Toggle all" should run todoList.displayTodos': function() {
        var toggleAllButton = document.getElementById("toggle_all");
        todoList.todos = [
            {todoText: "Display button clicked!", completed: false}
        ]
        eq(todoList.todos[0].completed, false) // First false
        toggleAllButton.click(); // Button clicked
        eq(todoList.todos[0].completed, true); // Now true
    }
})

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
