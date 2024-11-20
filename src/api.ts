import axios from "axios";
import { Todo } from "./App";

// Base URL of the API
const API_URL = "https://673790584eb22e24fca58f45.mockapi.io/api/v1/tasks";

const parseTask = ({ createdAt, id, name, completed }: any): Todo =>
  ({ id, name, completed }) as Todo;

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.map(parseTask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};

// Add a new task
export const addTask = async (name: string) => {
  try {
    const response = await axios.post(API_URL, { name, completed: false });
    return parseTask(response.data); // Returns the newly created task
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task. Please try again later.");
  }
};

// Update an existing task
export const updateTask = async (
  id: number,
  updatedTask: { name?: string; completed?: boolean },
) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return parseTask(response.data); // Returns the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task. Please try again later.");
  }
};
