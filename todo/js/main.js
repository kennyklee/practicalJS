// PracticalJS - Todo vanillaJS code below
var todoList = {
    todos: [],
    addTodo: function(todoText, completed = false) {
        if (!todoText) {
            return;
        }
        this.todos.push(
            {
                todoText: todoText,
                completed: completed
            }
        );
        view.displayTodos();
    },
    changeTodo: function(position, todoText) {;
        if ((position >= 0) && todoText) {
            this.todos[position].todoText = todoText;
            view.displayTodos();
        }
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },
    toggleCompleted: function(position) {
        if (position >= 0) {
            this.todos[position].completed = !this.todos[position].completed;
            view.displayTodos();
        } else {
            console.log("Please include a position as an argument.");
            return
        }
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function(todo) {
            if (todo.completed) {
                completedTodos++;
            }
        })
        // Compare num of completed todos to total todos
        // If everything is true, make it false.
        if (completedTodos === totalTodos) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            })
        }
        // Otherwise, Make everything true
        else {
            this.todos.forEach(function(todo) {
                todo.completed = true;
            })
        }
        view.displayTodos();
    }
}

var handler = {
    addTodoHandler: function() {

    },
    changeTodoHandler: function() {

    },
    toggleCompletedHandler: function() {

    },
    toggleAllHandler: function() {

    }
}

// Refactor this to use create deleteButton function.
// Refactor to use add element function <li>.
// Watch PJS course 8-10
var view = {
    displayTodos: function() {
        var todoItem = document.getElementById("todo_list");
        var todoDivs = "";
        if (todoList.todos.length) {
            // for (var i = 0; i < this.todos.length; i++ ) {
            todoList.todos.forEach(function(todo, i) {
                var uid = new Date().getTime()*Math.random(); // Not used since 'i' is used to reference todo array.
                var deleteTodoButton = "<button class='delete_todo' onClick='todoList.deleteTodo(" +
                i + ")'>X</button>"
                if (todoList.todos[i].completed) {
                    todoDivs += "<li id='" + i + "'><span>(&#x2713;)</span> <span>" +
                    todoList.todos[i].todoText + "</span>  " +
                    deleteTodoButton + "</li>";
                } else {
                    todoDivs += "<li id='" + i + "'><span>(&nbsp;&nbsp;&nbsp;)</span> <span>" +
                    todoList.todos[i].todoText + "</span>  " +
                    deleteTodoButton + "</li>";
                }
            })
            todoItem.innerHTML = todoDivs;
        } else {
            todoItem.innerHTML = "<li>No todos</li>";
        }
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
        view.displayTodos(todoList.todos); //Populate the todolist.
        assert(todoItem.innerHTML, "Todo list is empty");
    },
});
// It should have a way to add new todos
tests({
    'It should have a way to add new todos': function() {
        var newTodoItem = {todoText: "Changed todoText", completed: true}
        todoList.addTodo(newTodoItem);
        eq(todoList.todos.length, 1);
    },
});
// It should have a way to change a todo
tests({
    'It should have a way to change a todo': function() {
        todoList.changeTodo(0, "todo1_changed");
        eq(todoList.todos[0].todoText, "todo1_changed");
    }
})
// It should have a way to delete a todo
tests({
    'It should have a way to delete a todo': function() {
        todoList.todos = [
            {todoText: "todo1",completed: false},
            {todoText: "todo2",completed: false},
            {todoText: "todo3",completed: false}
        ]
        var originalTodoLength = todoList.todos.length;
        todoList.deleteTodo(1);
        eq(originalTodoLength - 1, todoList.todos.length);
    }
})

// Version 2
// It should have a function to display todos
tests({
    'It should have a function to display todos': function() {
        eq(typeof view.displayTodos, "function");
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
        assert(view.displayTodos, "Doesn't exist")
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
        view.displayTodos(todoList.todos);
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
        view.displayTodos(); // Display the list.
        eqs(todoDivs.childNodes[0].innerHTML, "No todos");
    }
});
// .displayTodos should show .completed
tests({
    '.displayTodos should show .completed': function() {
        //If todo is complete, it should show checkbox that is checked.
        var todoDiv = document.getElementById("todo_list");
        todoList.todos = [{todoText: "Completed task", completed: true}];
        view.displayTodos();
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
        view.displayTodos();
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
        view.displayTodos();
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
        var toggleAllButton = document.getElementById("toggle_all");
        assert(toggleAllButton, "No button");
    }
});
// Clicking "Toggle all" should run todoList.toggleAll.
tests({
    'Clicking "Toggle all" should run view.displayTodos': function() {
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
// It should have working controls for .addTodo. Textbox and button.
tests({
    'It should have working control for .addTodo. Textbox and button.': function() {
        var textbox = document.getElementById("add_todo_text");
        var button = document.getElementById("add_todo_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    }
})
// It should have working controls for .changeTodo. Textbox and button.
tests({
    'It should have working control for .changeTodo. Textbox and button.': function() {
        var textbox = document.getElementById("change_todo_text");
        var button = document.getElementById("change_todo_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    }
})
// It should have working controls for .toggleCompleted. Textbox and button.
tests({
    'It should have working control for .toggleCompleted. Textbox and button.': function() {
        var textbox = document.getElementById("toggle_completed_text");
        var button = document.getElementById("toggle_completed_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    }
})

// Version 9
// There should be an li element for every todo
// Each li element should contain .todoText
// Each li element shoudl show .completed
// NOTE: The 3 tests above will be combined into 1 in order to check for HTML string.
tests({
    'For each todo, there should be an li element with .todoText and .completed': function() {
        var todoDivs = document.getElementById("todo_list");
        todoList.todos = [
            {todoText: "First todo", completed: false},
            {todoText: "Middle todo", completed: true},
            {todoText: "Last todo", completed: true},
        ]
        view.displayTodos();

        eq(todoDivs.children[0].children[0].innerHTML, "(&nbsp;&nbsp;&nbsp;)");
        eq(todoDivs.children[0].children[1].innerHTML, "First todo");

        eq(todoDivs.children[1].children[0].innerHTML, "(✓)");
        eq(todoDivs.children[1].children[1].innerHTML, "Middle todo");

        eq(todoDivs.children[2].children[0].innerHTML, "(✓)");
        eq(todoDivs.children[2].children[1].innerHTML, "Last todo");
    }
});

// Version 10
// There should be a way to create delete buttons
    // Create a variable with delete button for each todo <li> item.
// There should be a delete button for each todo
    // Apply the delete button to each todo
// Each li should have an id that has the todo position
    // Apply an ID to each todo, that is uniuqe.
// Delete buttons should have access to the todo id
    // Delete button uses that ID to delete the todo.
// Clicking delete should update todoList.todos and the DOM
    // Clicking on delete button, updates the UI.

// Revised test (KENNY): Each todo has a delete button
tests({
    'Each todo should have a delete button': function() {
        // Total number of todos
        var totalTodos = todoList.todos.length;
        var listDeleteButtons = document.getElementsByClassName("delete_todo");
        var totalDeleteButtons = listDeleteButtons.length;

        // Total number of delete buttons
        eqs(totalDeleteButtons, totalTodos);
    }
});

// Revised test (KENNY): Corresponding delete button deletes the todo
tests({
    'Corresponding delete button deletes the todo': function() {
        var todoDivs = document.getElementById("todo_list");
        todoList.todos = [
            {todoText: "First todo", completed: false},
            {todoText: "Middle todo", completed: true},
            {todoText: "Last todo", completed: true},
        ];
        todoList.deleteTodo(0);
        view.displayTodos();
        //console.log(todoList.todos[0].todoText);  // Show the 0 position of the todo array to confirm delete.
        assert(!(todoList.todos[0].todoText === "First todo"), "Todo text equal when it shouldn't be.");
    }
})

// Version 11
// todoList.toggleAll should use forEach
    // DONE - this is refactor, not a test
// view.displayTodos shoudl use forEach
    // DONE - this is refactor, not a test. Took some time to figure out .bind(this).  Figured it out on my own. :)
