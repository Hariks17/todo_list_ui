// components/TodoItem.tsx
import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import "./TodoItem.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date?: string;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  updateTodo,
  deleteTodo,
}) => {
  const handleCheckboxChange = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
  };

  return (
    <li className="list__element" aria-label={`Task: ${todo.title}`}>
      <div className="list__info">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          aria-label={`Mark ${todo.title} as ${
            todo.completed ? "incomplete" : "completed"
          }`}
        />
        <span>
          <p className="task__title">{todo.title}</p>
          <p className="task__date">Due: {todo.due_date || "No due date"}</p>
        </span>
      </div>
      <div className="list__action">
        <button
          className="action__button"
          onClick={() => deleteTodo(todo.id)}
          aria-label={`Delete ${todo.title}`}
        >
          <MdDelete />
        </button>
        <button className="action__button" aria-label={`Edit ${todo.title}`}>
          <MdModeEdit />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
