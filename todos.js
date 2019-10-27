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

    var deleteElement = document.createElement('i');
    deleteElement.setAttribute("class","far fa-trash-alt");
    deleteElement.setAttribute("aria-hidden","true");
    deleteElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

    // linkElement.appendChild(deleteElement);
    todoElement.appendChild(todoText);
    todoElement.appendChild(deleteElement);
    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  var todoText = inputElement.value;

  todos.push(todoText);
  inputElement.value = '';
  renderTodos()
  saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
  todos.splice(pos,1);
  renderTodos();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos));
}