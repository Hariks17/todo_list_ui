// components/Actions.tsx
import React from "react";
import "./Actions.css";

interface ActionsProps {
  addTodo: () => void;
  setFilter: (filter: string) => void;
}

const Actions: React.FC<ActionsProps> = ({ addTodo, setFilter }) => (
  <section className="action__section">
    <button
      onClick={addTodo}
      className="action__button"
      aria-label="Add a new task"
    >
      Add Task
    </button>
    <select
      onChange={(e) => setFilter(e.target.value)}
      className="action__select"
      aria-label="Filter tasks by status"
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  </section>
);

export default Actions;
