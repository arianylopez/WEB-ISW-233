import { CommandExecutor, Command, Commands } from "./services/command.js";
import { TodoList } from "./services/todoList.js";
import { LocalStorage } from "./services/storage.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

// Funcion agregada de render, se va a encargar de renderizar la lista de tareas cada vez que se modifique la lista,
// cada vez que se agregue o elimine una tarea
function render() {
  DOM.todoList.innerHTML = ""; 
  
  const instance = TodoList.getInstance(); // SINGLETON 
  const itemsArray = Array.from(instance.items);

  for (let i = 0; i < itemsArray.length; i++) {
    const item = itemsArray[i];

    const li = document.createElement("li"); 
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = item.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("data-text", item.text);

    li.appendChild(span);
    li.appendChild(deleteBtn);

    DOM.todoList.appendChild(li);
  }
}

function renderItems(){
  DOM.todoList.innerHTML = "";
  const todoList = TodoList.getInstance();
  for(const todo of todoList.items){
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `${todo.text} <button class="delete-btn">Delete</button>`
    todoItem.dataset.text = todo.text; 
    DOM.todoList.appendChild(todoItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todo = event.target.parentNode.dataset.text; // CAMBIO, obteniendo el texto del atributo data-text
      const cmd = new Command(Commands.DELETE, [todo]);
      CommandExecutor.execute(cmd); 
    }
  });

  LocalStorage.load();
  renderItems();
  TodoList.getInstance().addObserver(renderItems);
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", ()=> {
    if(event.ctrlKey && event.key === "z") {
      event.preventDefault();
      const cmd = new Command(Commands.UNDO);
      CommandExecutor.execute(cmd);
    }
  })
});