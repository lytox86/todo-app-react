import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import { Todo } from "../types";

describe("TodoList Component", () => {
  const mockTodos: Todo[] = [
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: true },
  ];

  const mockAddTodo = jest.fn();
  const mockToggleComplete = jest.fn();
  const mockUpdateTodo = jest.fn();
  const mockSetFilter = jest.fn();

  test("renders the todo list and controls", () => {
    render(
      <TodoList
        todos={mockTodos}
        addTodo={mockAddTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
        setFilter={mockSetFilter}
      />,
    );

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  test("calls addTodo when adding a task", () => {
    render(
      <TodoList
        todos={mockTodos}
        addTodo={mockAddTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
        setFilter={mockSetFilter}
      />,
    );

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledWith("New Task");
  });

  test("calls setFilter when a filter button is clicked", () => {
    render(
      <TodoList
        todos={mockTodos}
        addTodo={mockAddTodo}
        toggleComplete={mockToggleComplete}
        updateTodo={mockUpdateTodo}
        setFilter={mockSetFilter}
      />,
    );

    fireEvent.click(screen.getByText(/completed/i));
    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });
});
