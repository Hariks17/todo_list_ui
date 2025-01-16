import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/getAllTodo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo: any) => {
    try {
      await axiosInstance.post("/api/addTodo", todo);
      fetchTodos();
    } catch (error) {
      console.error("Error Adding Todos:", error);
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      await axiosInstance.delete(`/api/deleteTodo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error Adding Todos:", error);
    }
  };

  const updateTodo = async (todo: any) => {
    try {
      await axiosInstance.put(`/api/updateTodo`, todo[0]);
      fetchTodos();
    } catch (error) {
      console.error("Error Adding Todos:", error);
    }
  };

  const filteredTodos = () => {
    if (filter == "Pending") {
      todos.filter((t) => !t.completed);
    } else if (filter == "Completed") {
      todos.filter((t) => t.completed);
    }
    return todos;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos(),
        addTodo,
        deleteTodo,
        updateTodo,
        setFilter,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
