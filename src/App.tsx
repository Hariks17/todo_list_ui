import "./App.css";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useTodoContext } from "./store/TodoContext";

const App = () => {
  const { todos, addTodo, deleteTodo, updateTodo, setFilter, filter } =
    useTodoContext();

  const handleCheckboxChange = (id) => {
    const todo = todos.filter((todo) => todo.id === id);
    todo[0].completed = !todo[0].completed;
    updateTodo(todo);
  };
  return (
    <main>
      <section className="header__section">
        <h1 className="header__h1">TODO LIST</h1>
      </section>
      <section className="action__section">
        <button>Add Task</button>
        <select>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </section>
      <section className="todolist__section">
        <ul className="list__container">
          {todos.map((list) => (
            <li className="list__element">
              <div className="list__info">
                <input
                  type="checkbox"
                  name="completed"
                  id={`task-${list.id}`}
                  checked={list.completed}
                  onChange={() => handleCheckboxChange(list.id)}
                  aria-label={"Mark ${list.title} as completed"}
                />
                <span>
                  <p className="task__title">{list.title}</p>
                  <p className="task__date">Due: {list.due_date}</p>
                </span>
              </div>
              <div className="list__action">
                <button
                  aria-label="Delete Task"
                  onClick={() => deleteTodo(list.id)}
                >
                  <MdDelete />
                </button>
                <button aria-label="Edit Task">
                  <MdModeEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
