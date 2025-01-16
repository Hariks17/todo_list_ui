import React, { useState } from "react";
import "./App.css";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useTodoContext } from "./store/TodoContext";
import TaskModal from "./ui/TaskModal";

const App = () => {
  const { filteredTodos, addTodo, deleteTodo, updateTodo, setFilter } =
    useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openAddTaskModal = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (task) => {
    if (currentTask) {
      updateTodo({ ...currentTask, ...task });
    } else {
      addTodo(task);
    }
  };

  return (
    <main>
      <section className="header__section">
        <h1 className="header__h1">TODO LIST</h1>
      </section>
      <section className="action__section">
        <button onClick={openAddTaskModal}>Add Task</button>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </section>
      <section className="todolist__section">
        <ul className="list__container">
          {filteredTodos.map((list) => (
            <li className="list__element" key={list.id}>
              <div className="list__info">
                <input
                  type="checkbox"
                  name="completed"
                  id={`task-${list.id}`}
                  checked={list.completed}
                  onChange={() =>
                    updateTodo({ ...list, completed: !list.completed })
                  }
                  aria-label={`Mark ${list.title} as completed`}
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
                <button
                  aria-label="Edit Task"
                  onClick={() => openEditTaskModal(list)}
                >
                  <MdModeEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={currentTask}
      />
    </main>
  );
};

export default App;
