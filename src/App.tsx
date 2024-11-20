import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { addTask, fetchTasks, updateTask } from "./api";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Fetch tasks from API on component mount
  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTodos(tasks);
    };
    getTasks();
  }, []);

  // Add a new task
  const handleAddTodo = async (name: string) => {
    const newTask = await addTask(name);
    setTodos((prev) => [...prev, newTask]);
  };

  // Toggle task completion
  const handleToggleComplete = async (id: number) => {
    const task = todos.find((todo) => todo.id === id);
    if (!task) return;

    const updatedTask = await updateTask(id, { completed: !task.completed });
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTask : todo)),
    );
  };

  // Update task name
  const handleUpdateTodo = async (id: number, newName: string) => {
    const updatedTask = await updateTask(id, { name: newName });
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTask : todo)),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-5">Todo List</h1>
      <TodoList
        todos={filteredTodos}
        addTodo={handleAddTodo}
        toggleComplete={handleToggleComplete}
        updateTodo={handleUpdateTodo}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
