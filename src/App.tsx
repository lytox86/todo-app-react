import React, { useState } from "react";
import TodoList from "./components/TodoList";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const addTodo = (name: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      name,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, newName: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo)),
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
        addTodo={addTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
