import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders the title and input field", () => {
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("filters todos by status", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByText(/add/i);

    // Add two tasks
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);

    // Complete the first task
    const completeButton = screen.getAllByText(/complete/i)[0];
    fireEvent.click(completeButton);

    // Filter Completed
    fireEvent.click(screen.getByText(/completed/i));
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeNull();

    // Filter Pending
    fireEvent.click(screen.getByText(/pending/i));
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).toBeNull();
  });
});
