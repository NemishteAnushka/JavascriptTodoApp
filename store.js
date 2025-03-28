const store = {
  todos: [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
    { id: "3", title: "Task 3", completed: false },
  ],
};
const storeHandler = {
  get(target, property) {
    console.log(target);
    console.log("prop", property);
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    if (property == "todos") {
      window.dispatchEvent(new Event("todosChange"));
    }
    localStorage.setItem("store", JSON.stringify(store));
    return true;
  },
};
const storeProxy = new Proxy(store, storeHandler);
//add new todo
function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}
//delete todo
function deleteTodo(id) {
  storeProxy.todos = storeProxy.todos.filter((todo) => todo.id !== id);
}
//completed todo
function toggleCompleted(id, completed) {
  storeProxy.todos = storeProxy.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: completed };
    } else {
      return todo;
    }
  });
}
export { addTodo, deleteTodo, toggleCompleted };
export default storeProxy;


