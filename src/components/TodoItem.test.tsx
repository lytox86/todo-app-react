import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { Todo } from "../types";

describe("TodoItem Component", () => {
  const mockTodo: Todo = { id: 1, name: "Task 1", completed: false };
  const mockToggleComplete = jest.fn();
  const mockUpdateTodo = jest.fn();

  test("renders the todo item", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
      />,
    );

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  test("calls toggleComplete when the complete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
      />,
    );

    const completeButton = screen.getByText(/complete/i);
    fireEvent.click(completeButton);

    expect(mockToggleComplete).toHaveBeenCalledWith(mockTodo.id);
  });

  test("enables editing and updates the task name", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
      />,
    );

    const taskName = screen.getByText(/task 1/i);
    fireEvent.doubleClick(taskName);

    const input = screen.getByDisplayValue(/task 1/i);
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.blur(input);

    expect(mockUpdateTodo).toHaveBeenCalledWith(mockTodo.id, "Updated Task");
  });
});
