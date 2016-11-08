// PracticalJS - Todo vanillaJS code below
const todoList = {
    todos: [],
    addTodo: function(todoText, completed = false) {
        if (!todoText) {
            return;
        }
        this.todos.push({
            todoText: todoText,
            completed: completed
        });
    },
    changeTodo: function(position, todoText) {;
        if ((position >= 0) && todoText) {
            this.todos[position].todoText = todoText;
        }
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        if (position >= 0) {
            this.todos[position].completed = !this.todos[position].completed;
        } else {
            console.log("Please include a position as an argument.");
            return
        }
    },
    toggleAll: function() {
        const totalTodos = this.todos.length;
        let completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function(todo) {
            if (todo.completed) {
                completedTodos++;
            }
        })
        this.todos.forEach(function(todo) {
            // Case 1: If everything is trie, make everything false
            if (completedTodos === totalTodos) {
                todo.completed = false;
            // Case 2: Otherwise, make everything true
            } else {
                todo.completed = true;
            }
        })
    }
}

const handler = {
    addTodoHandler: function() {
        const addTodoButton = document.getElementById('add_todo_button');
        const addTodoText = document.getElementById('add_todo_text');

        addTodoButton.addEventListener("click", function() {
            todoList.addTodo(addTodoText.value)
            addTodoText.value = '';
            view.displayTodos();
        });
    },
    changeTodoHandler: function() {
        const changeTodoText = document.getElementById('change_todo_text');
        const changeTodoPosition = document.getElementById('change_todo_position');
        const changeTodoButton = document.getElementById('change_todo_button');

        changeTodoButton.addEventListener("click", function() {
            todoList.changeTodo(changeTodoPosition.value, changeTodoText.value);
            changeTodoText.value = '';
            changeTodoPosition.value = '';
            view.displayTodos();
        });
    },
    deleteTodoHandler: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompletedHandler: function() {
        const toggleCompletedText = document.getElementById('toggle_completed_text');
        const toggleCompletedButton = document.getElementById('toggle_completed_button');

        toggleCompletedButton.addEventListener("click", function() {
            todoList.toggleCompleted(toggleCompletedText.value);
            view.displayTodos();
        });
    },
    toggleAllHandler: function() {
        const toggleButton = document.getElementById('toggle_all');
        toggleButton.addEventListener("click", function() {
            todoList.toggleAll();
            view.displayTodos();
        });
    }
}

const view = {
    displayTodos: function() {
        const todoItem = document.getElementById("todo_list");
        todoItem.innerHTML = '';

        if (todoList.todos.length) {
            todoList.todos.forEach(function(todo, i) {
                const todoLi = document.createElement('li');
                let todoDivs = "";

                if (todo.completed) {
                    todoDivs = "[X] " + todo.todoText + " ";
                } else {
                    todoDivs = "[ ] " + todo.todoText + " ";
                }
                todoLi.id = i;
                todoLi.textContent = todoDivs;
                todoLi.appendChild(this.createDeleteButton());
                todoItem.appendChild(todoLi);
            }, this)
        } else {
            todoItem.innerHTML = "<li>No todos</li>";
        }
    },
    createDeleteButton: function() {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        handler.addTodoHandler();
        handler.changeTodoHandler();
        handler.toggleCompletedHandler();
        handler.toggleAllHandler();

        const todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            const elementClicked = event.target;

            if (elementClicked.className === 'deleteButton') {
                console.log(+elementClicked.parentNode.id);
                handler.deleteTodoHandler(+elementClicked.parentNode.id);
            }
        });
    }
};

view.setUpEventListeners();

// ===============================================
// Tests for Todo app - using tinytest.js
// ===============================================

// Version 1
// It should have a place to store todos
tests({
    'It should have a place to store todos': function() {
        assert(todoList.todos);
    },
// It should have a way to display todoText
    'It should have a place to display todos': function() {
        const todoItem = document.getElementById("todo_list");
        view.displayTodos(todoList.todos); //Populate the todolist.
        assert(todoItem.innerHTML, "Todo list is empty");
    },
// It should have a way to add new todos
    'It should have a way to add new todos': function() {
        const newTodoItem = {todoText: "Changed todoText", completed: true}
        todoList.addTodo(newTodoItem);
        eq(todoList.todos.length, 1);
    },
// It should have a way to change a todo
    'It should have a way to change a todo': function() {
        todoList.changeTodo(0, "todo1_changed");
        eq(todoList.todos[0].todoText, "todo1_changed");
    },
// It should have a way to delete a todo
    'It should have a way to delete a todo': function() {
        todoList.todos = [
            {todoText: "todo1",completed: false},
            {todoText: "todo2",completed: false},
            {todoText: "todo3",completed: false}
        ]
        const originalTodoLength = todoList.todos.length;
        todoList.deleteTodo(1);
        eq(originalTodoLength - 1, todoList.todos.length);
    },

// Version 2
// It should have a function to display todos
    'It should have a function to display todos': function() {
        eq(typeof view.displayTodos, "function");
    },
// It should have a function to add todos
    'It should have a function to add todos': function() {
        eq(typeof todoList.addTodo, "function");
    },
// It should have a function to change todos
    'It should have a function to change todos': function() {
        eq(typeof todoList.changeTodo, "function");
    },
// It should have a function to delete todos
    'It should have a function to delete todos': function() {
        eq(typeof todoList.deleteTodo, "function");
    },

// Version 3
// It should store the todos array on an object
    'It should store the todos array on an object': function() {
        eq(typeof todoList.todos, "object")
    },
// It should have a displayTodos method
    'It should have a displayTodos method': function() {
        assert(view.displayTodos, "Doesn't exist")
    },
// It should have a addTodo method
    'It should have a addTodo method': function() {
        assert(todoList.addTodo, "Doesn't exist")
    },
// It should have a changeTodo method
    'It should have a changeTodo method': function() {
        assert(todoList.changeTodo, "Doesn't exist")
    },
// It should have a deleteTodo method
    'It should have a deleteTodo method': function() {
        assert(todoList.deleteTodo, "Doesn't exist")
    },

// Version 4
// todoList.addTodo should add objects
    'todoList.addTodo should add objects': function() {
        //debugger;
        const newTodoItem = {todoText: "added Todo", completed: true}
        todoList.addTodo(newTodoItem);
        const lastArrayPosition = todoList.todos.length - 1;
        eq(typeof todoList.todos[lastArrayPosition], "object");
    },
// todoList.changeTodo should change the todoText property
    'todoList.changeTodo should change the todoText property': function() {
        //debugger;
        const newTodoItem = {todoText: "Changed todoText", completed: true};
        todoList.changeTodo(0, newTodoItem);
        const lastArrayPosition = todoList.todos.length - 1;
        eq(typeof todoList.todos[lastArrayPosition], "object");
    },
// todoList.toggleCompleted should change the completed property
    'todoList.toggleCompleted should change the completed property': function() {
        const position = 0;
        const beforeToggle = todoList.todos[position].completed;
        // console.log(beforeToggle);
        todoList.toggleCompleted(position);
        const afterToggle = todoList.todos[position].completed;
        // console.log(afterToggle);
        assert(!(beforeToggle === afterToggle), "Doesn't equal");
    },

// Version 5
// .displayTodos should show .todoText
    '.displayTodos should show .todoText': function() {
        const todoDivs = document.getElementById("todo_list");
        view.displayTodos(todoList.todos);
        // The todoListText id should contain the list of todos.
        // Test by comparing the list of todos in the array with the number of <li> in the HTML todo list.
        // console.log("HTML li: ", todoListText.childNodes.length);
        // console.log("Array length: ", todoList.todos.length);
        eqs(todoDivs.childNodes.length, todoList.todos.length);
    },
// .displayTodos should tell you if todo is empty
    '.displayTodos should tell you if todo is empty': function() {
        const todoDivs = document.getElementById("todo_list");
        todoList.todos = []; // Make an emtpy list of todos;
        view.displayTodos(); // Display the list.
        eqs(todoDivs.childNodes[0].innerHTML, "No todos");
    },
// .displayTodos should show .completed
    '.displayTodos should show .completed': function() {
        //If todo is complete, it should show checkbox that is checked.
        const todoDiv = document.getElementById("todo_list");
        todoList.todos = [{todoText: "Completed task", completed: true}];
        view.displayTodos();
        eq(todoDiv.children[0].children[0].innerText, "Delete");
    },

// Version 6
// toggleAll: If everything's true, make everything false.
    'toggleAll: If everythings true, make everything false': function() {
        // Todos with all completed
        todoList.todos = [
            {todoText: "todo1", completed: true},
            {todoText: "todo2", completed: true},
            {todoText: "todo3", completed: true},
        ]
        view.displayTodos();
        todoList.toggleAll();

        const totalTodos = todoList.todos.length;
        let completedTodos = 0;
        for (let i = 0; i < totalTodos; i++) {
            if (todoList.todos[i].completed) {
                completedTodos++;
            }
        }
        eqs(completedTodos, 0);
    },
// toggleAll: Otherwise, make it true
    'toggleAll: Otherwise, make it true': function() {
        // Todos with all completed
        todoList.todos = [
            {todoText: "todo1", completed: false},
            {todoText: "todo2", completed: false},
            {todoText: "todo3", completed: true},
        ]
        view.displayTodos();
        todoList.toggleAll();

        const totalTodos = todoList.todos.length;
        let completedTodos = 0;
        for (let i = 0; i < totalTodos; i++) {
            if (todoList.todos[i].completed) {
                completedTodos++;
            }
        }
        eqs(completedTodos, 3);
    },

// Version 7
// There should be a "Display todos" button and a "Toggle all" button in the app.
    'There should be a "Display Todos" button and a "Toggle all" button in the app': function() {
        const toggleAllButton = document.getElementById("toggle_all");
        assert(toggleAllButton, "No button");
    },
// Clicking "Toggle all" should run todoList.toggleAll.
    'Clicking "Toggle all" should run view.displayTodos': function() {
        const toggleAllButton = document.getElementById("toggle_all");
        todoList.todos = [
            {todoText: "Display button clicked!", completed: false}
        ]
        eq(todoList.todos[0].completed, false) // First false
        toggleAllButton.click(); // Button clicked
        eq(todoList.todos[0].completed, true); // Now true
    },

// Version 8
// It should have working controls for .addTodo. Textbox and button.
    'It should have working control for .addTodo. Textbox and button.': function() {
        const textbox = document.getElementById("add_todo_text");
        const button = document.getElementById("add_todo_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    },
// It should have working controls for .changeTodo. Textbox and button.
    'It should have working control for .changeTodo. Textbox and button.': function() {
        const textbox = document.getElementById("change_todo_text");
        const button = document.getElementById("change_todo_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    },
// It should have working controls for .toggleCompleted. Textbox and button.
    'It should have working control for .toggleCompleted. Textbox and button.': function() {
        const textbox = document.getElementById("toggle_completed_text");
        const button = document.getElementById("toggle_completed_button");
        assert(textbox, "Missing textbox");
        assert(button, "Missing button");
    },

// Version 9
// There should be an li element for every todo
// Each li element should contain .todoText
// Each li element shoudl show .completed
// NOTE: The 3 tests above will be combined into 1 in order to check for HTML string.
    'For each todo, there should be an li element with .todoText and .completed': function() {
        const todoDivs = document.getElementById("todo_list");
        todoList.todos = [
            {todoText: "First todo", completed: false},
            {todoText: "Middle todo", completed: true},
            {todoText: "Last todo", completed: true},
        ]
        view.displayTodos();

        eq(todoDivs.children[0].textContent, "[ ] First todo Delete");
        eq(todoDivs.children[1].textContent, "[X] Middle todo Delete")
        eq(todoDivs.children[2].textContent, "[X] Last todo Delete")
    },

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
    'Each todo should have a delete button': function() {
        // Total number of todos
        const totalTodos = todoList.todos.length;
        const listDeleteButtons = document.getElementsByClassName("deleteButton");
        const totalDeleteButtons = listDeleteButtons.length;

        // Total number of delete buttons
        eqs(totalDeleteButtons, totalTodos);
    },

// Revised test (KENNY): Corresponding delete button deletes the todo
    'Corresponding delete button deletes the todo': function() {
        const todoDivs = document.getElementById("todo_list");
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
