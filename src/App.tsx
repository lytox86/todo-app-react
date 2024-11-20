import React, { useEffect } from "react";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./useTodoStore";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const {
    todos,
    filter,
    error,
    setFilter,
    loadTodos,
    addTodo,
    toggleComplete,
    updateTodo,
  } = useTodoStore();

  // Fetch tasks when the component mounts
  useEffect(() => {
    loadTodos().catch(console.error);
  });

  // Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // "all"
  });

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-5">Todo List</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TodoList
        todos={filteredTodos}
        addTodo={addTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
