import "./App.css";
import { MdModeEdit, MdDelete } from "react-icons/md";

const App = () => {
  const lists = [
    {
      id: 1,
      title: "Create React Application",
      due_date: "2024-11-24",
      completed: true,
    },
    {
      id: 2,
      title: "Create Spring Application",
      due_date: "2024-11-24",
      completed: false,
    },
  ];
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
          {lists.map((list) => (
            <li className="list__element">
              <div className="list__info">
                <input
                  type="checkbox"
                  name="completed"
                  id={`task-${list.id}`}
                  checked={list.completed}
                  // onChange={() => handleCheckboxChange(task.id)}
                  aria-label={`Mark ${list.title} as completed`}
                />
                <span>
                  <p className="task__title">{list.title}</p>
                  <p className="task__date">Due: {list.due_date}</p>
                </span>
              </div>
              <div className="list__action">
                <button aria-label="Delete Task">
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
