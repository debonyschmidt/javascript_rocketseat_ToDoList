var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

window.onload = setInterval(clock,1000);

function clock()
{
    var d = new Date();
    var date = d.getDate();
    var year = d.getFullYear();
    var month = d.getMonth();
    var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    month = monthArr[month];
    document.getElementById("date").innerHTML= date+" "+month+", "+year;
}
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
  listElement.innerHTML = '';

  for (todo of todos) {
    var todoElement = document.createElement('li');
    var todoText = document.createTextNode(todo);

    var pos = todos.indexOf(todo);

    var actions = document.createElement('div');


    var deleteElement = document.createElement('i');
    deleteElement.setAttribute("class","far fa-trash-alt delete");
    deleteElement.setAttribute("aria-hidden","true");
    deleteElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

    var editElement = document.createElement('i');
    editElement.setAttribute("class", "far fa-edit")
    editElement.setAttribute("aria-hidden","true");
    editElement.setAttribute('onclick', 'editTodo('+ pos +')');

    // linkElement.appendChild(deleteElement);
    todoElement.appendChild(todoText);
    todoElement.appendChild(actions);
    actions.appendChild(editElement);
    actions.appendChild(deleteElement);
    listElement.appendChild(todoElement);
  }
}

renderTodos();

var button = document.getElementById("button");
var todoText = document.getElementById("text");
var task = "new";
var posEdit = "";

button.addEventListener("click", function() {
  if (task === "existent") {
    replaceTodo()
  } else if (todoText.value === "") {  
    swal("Please, enter the task description!");

  } else {
    addTodo();
  }
});


function addTodo() {
  var todoText = document.getElementById("text").value;

  todos.push(todoText);
  inputElement.value = '';
  renderTodos()
  saveToStorage();
}


function editTodo(pos) {
  var todoText = document.getElementById("text");
  todoText.value = todos[pos];
  button.textContent = "Save"; 
  task = "existent";
  posEdit = pos;
}

function replaceTodo(){
  var startIndex = posEdit;
    var numberElements = 1;
    todos.splice(startIndex, numberElements, todoText.value);
    
    inputElement.value = '';
    button.textContent = "+ Add new Task"; 
    task = "new";
    renderTodos()
    saveToStorage();
}

function deleteTodo(pos) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      todos.splice(pos,1);
      renderTodos();
      saveToStorage();
      swal("Your task has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your task is safe!");
    }
  });
  
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos));
}