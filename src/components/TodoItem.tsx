import React, { useState } from "react";
import { Todo } from "../App";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, newName: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleUpdate = () => {
    updateTodo(todo.id, newName);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-white p-3 rounded shadow">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          className="flex-grow px-2 py-1 border rounded focus:outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-grow cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.name}
        </span>
      )}
      <button
        onClick={() => toggleComplete(todo.id)}
        className={`ml-4 px-2 py-1 rounded ${
          todo.completed ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {todo.completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
};

export default TodoItem;
