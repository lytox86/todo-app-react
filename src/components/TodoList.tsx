import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../App";

interface TodoListProps {
  todos: Todo[];
  addTodo: (name: string) => void;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, newName: string) => void;
  setFilter: (filter: "all" | "completed" | "pending") => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  addTodo,
  toggleComplete,
  updateTodo,
  setFilter,
}) => {
  const [newTask, setNewTask] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "pending">("all");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTodo(newTask.trim());
      setNewTask("");
    }
  };

  const handleFilterChange = (filter: "all" | "completed" | "pending") => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-3 py-1 rounded hover:bg-gray-300 ${
              activeFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("pending")}
          className={`px-3 py-1 rounded hover:bg-gray-300 ${
              activeFilter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={`px-3 py-1 rounded hover:bg-gray-300 ${
              activeFilter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
