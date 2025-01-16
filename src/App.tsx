// App.js
import "./App.css";
import Header from "./components/header/Header";
import Actions from "./components/actions/Actions";
import TodoList from "./components/todoList/TodoList";
import { useTodoContext } from "./store/TodoContext";

const App = () => {
  const { todos, addTodo, deleteTodo, updateTodo, setFilter } =
    useTodoContext();

  return (
    <main>
      <Header />
      <Actions addTodo={addTodo} setFilter={setFilter} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </main>
  );
};

export default App;
