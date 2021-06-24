const todoButton = document.querySelector("#todo-button");
const todoList = document.querySelector("#todo-list");
const todoFilter = document.querySelector("#todo-filter");
var todos = checkStorageTodos();

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteComplete);
todoFilter.addEventListener("click", filterTodos);

function addTodo(event) {
  event.preventDefault();

  let newTodo = {
    textOfTodo: document.getElementById("textInput").value,
    isDone: false,
  };

  if (newTodo.textOfTodo !== "" && newTodo.textOfTodo !== null) {
    createTodo(newTodo);
    saveTodos(newTodo.textOfTodo);
    document.getElementById("textInput").value = "";
  } else {
    alert("You can't enter empty space!");
  }
}

function deleteComplete(event) {
  const item = event.target;
  let currentTodo = item.parentElement;

  if (item.classList[0] == "delete-button") {
    currentTodo.classList.add("fall");

    let positionOfTodo = findCurrentTodo(currentTodo);

    deleteTodos(positionOfTodo);

    currentTodo.addEventListener("transitionend", function () {
      currentTodo.remove();
    });
  } else if (item.classList[0] === "done-button") {
    currentTodo.classList.toggle("done");

    positionOfTodo = findCurrentTodo(currentTodo);

    if (todos[positionOfTodo].isDone == true) {
      todos[positionOfTodo].isDone = false;
    } else {
      todos[positionOfTodo].isDone = true;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function filterTodos(event) {
  let todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (event.target.value) {
      case "completed":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "all":
        todo.style.display = "flex";
        break;
    }
  });
}

function saveTodos(todo) {
  const currentTodo = {
    textOfTodo: todo,
    isDone: false,
  };

  todos.push(currentTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  todos.forEach(function (todo) {
    createTodo(todo);
  });
}

function deleteTodos(index) {
  todos.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkStorageTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function createTodo(todo) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("todo-div");

  if (todo.isDone == true) {
    newDiv.classList.add("done");
  }

  let doneButton = document.createElement("button");
  doneButton.classList.add("done-button");
  doneButton.innerHTML = '<i class="fa fa-check"></i>';

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

  let newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todo.textOfTodo;

  newDiv.appendChild(newTodo);
  newDiv.appendChild(doneButton);
  newDiv.appendChild(deleteButton);

  document.getElementById("todo-list").appendChild(newDiv);
}

function findCurrentTodo(currentTodo) {
  let listItems = document.querySelectorAll("#todo-list li");
  let list = [];

  for (let i = 0; i < listItems.length; i++) {
    list[i] = listItems[i].innerText;
  }

  return list.indexOf(currentTodo.innerText);
}
