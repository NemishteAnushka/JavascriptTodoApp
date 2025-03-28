import render from "./render.js";
import store from "./store.js";
import { addTodo, deleteTodo, toggleCompleted } from "./store.js";
window.addEventListener("todosChange", () => {
  render();
});
// storeProxy.todos = [];
// try to get store from localstorage
const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"));
if (storeFromLocalStorage?.todos.length > 0) {
  store.todos = storeFromLocalStorage.todos;
} else {
  localStorage.setItem("store", JSON.stringify(store));
  render();
}

//Form
const form = document.querySelector("#form");
const form_input = document.querySelector(".todo-title-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = form_input.value;
  const newTodo = {
    id: crypto.randomUUID(),
    title: value,
    completed: false,
  };

  addTodo(newTodo);
  form_input.value = "";
});

//delete
const todos = document.querySelector(".todos");
console.log(todos);

todos.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-todo-button")) {
    const id = target.closest(".todo").dataset.id;
    console.log(id);
    deleteTodo(id);
  }
});

//completed
todos.addEventListener("change", (e) => {
  const target = e.target;
  if (target.classList.contains("todo-checkbox")) {
    const id = target.closest(".todo").dataset.id;
    const completed = target.checked;
    toggleCompleted(id, completed);
  }
});