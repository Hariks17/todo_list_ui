import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";

interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  due_date: string;
}

interface TodoContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  addTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  setFilter: (filter: string) => void;
  filter: string;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/getAllTodo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo: Todo) => {
    try {
      await axiosInstance.post("/api/addTodo", todo);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/deleteTodo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await axiosInstance.put(`/api/updateTodo`, todo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filterTodos = () => {
    let filtered: Todo[] = todos;
    if (filter === "Pending") {
      filtered = todos.filter((t) => !t.completed);
    } else if (filter === "Completed") {
      filtered = todos.filter((t) => t.completed);
    }
    setFilteredTodos(filtered);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [filter, todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
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
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
