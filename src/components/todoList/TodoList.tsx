// components/TodoList.tsx
import React from "react";
import TodoItem from "../todoItem/TodoItem";
import "./TodoList.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date?: string;
}

interface TodoListProps {
  todos: Todo[];
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => (
  <section className="todolist__section" aria-label="Task list">
    <ul className="list__container">
      {todos.length === 0 ? (
        <p className="empty__message">No tasks available.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </ul>
  </section>
);

export default TodoList;
