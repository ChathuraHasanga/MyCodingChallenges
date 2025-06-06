//select the todo-form
const todoForm = document.querySelector('.container-main');

//select the input box
const todoInput = document.querySelector('#taskInput');

//select the <ul> with id="taskList"
const todoItemsList = document.querySelector('#taskList');

//array which stores every toods
let todos = [];

//add an eventListener on form and listen for submit event
todoForm.addEventListener('submit', function(event){
    //prevent the page from reloading when submitting the form 
    event.preventDefault();
    addTodo(todoInput.value);
});

//function to add todo
function addTodo(item){

    //if item is not empty
    if(item !== ''){
        //make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        //then add it to todos array
        todos.push(todo);
        addToLocalStorage(todos);
        updateTaskCounts();

        //finally clear the input box value
        todoInput.value = '';
    }
}

//function t render given todos to screen
function renderTodos(todos){
    //clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';

    //run through each item inside todos
    todos.forEach(function(item){
        //check if the item is completed
        const checked = item.completed ? 'checked': null;

        //make a <li> element and fill it
        //<li></li>]
        const li = document.createElement('li');

        //<li class = "item"></li>
        li.setAttribute('class', 'item');

        //<li class="item" data-key="20200708"></li>
        li.setAttribute('data-key', item.id);

        /* <li class="item" data-key="20200708">
        <input type="checkbox" class="checkbox">
        Go to the Gym
        <button class="deleteButton">X</button>
        </li> */
        // if item is completed, then add a class to <li> called 'checked', whichy will add line-through style
        if(item.completed === true){
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="deleteButton">X</button>
        `;

        //finally add the <li> to the <ul>
        todoItemsList.append(li);
    });
}

function updateTaskCounts(){
    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;

    //update the DOM elements
    document.getElementById("totalCount").textContent = totalCount;
    document.getElementById("completedCount").textContent = completedCount;
}

//function to add todos to local storage
function addToLocalStorage(todos){
    //convert the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));

    //render them to screen
    renderTodos(todos);
}

// function helps  to get everything from local storage
function getFromLocalStorage(){
    const reference = localStorage.getItem('todos');

    //if reference exists
    if(reference){
        //converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
        updateTaskCounts();
    }
}

//toggle the value to completed an dnot comleted
function toggle(id){
    todos.forEach(function(item){
        //use == not ===, because here types are fifferent. One is number and other is string
        if(item.id == id){
            //toggle the value
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
    updateTaskCounts();
}

//deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id){
    //filters out the <li> with the id and updates the todos array 
    todos = todos.filter(function(item){
        //use != not  !== , because here types are different.One is number and other is string
        return item.id != id;
    });

    //update the localstorage
    addToLocalStorage(todos);
    updateTaskCounts();
}

//initially get everything from localStorage
getFromLocalStorage();

//after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event){
    //check if the event is on checkbox
    if(event.target.type === 'checkbox'){
        //toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    //check if that is a delete-button
    if(event.target.classList.contains('deleteButton')){
        //get id from data-key attribute's value of parent <li> where the delete-button is parent
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
