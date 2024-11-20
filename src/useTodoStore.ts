import { create } from "zustand";
import { fetchTasks, addTask, updateTask } from "./api";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "completed" | "pending";
  error: string | null;

  // Actions
  setFilter: (filter: "all" | "completed" | "pending") => void;
  loadTodos: () => Promise<void>;
  addTodo: (name: string) => Promise<void>;
  toggleComplete: (id: number) => Promise<void>;
  updateTodo: (id: number, name: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: "all",
  error: null,

  // Set filter
  setFilter: (filter) => set({ filter }),

  // Load todos from API
  loadTodos: async () => {
    try {
      const tasks = await fetchTasks();
      set({ todos: tasks, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // Add a new todo
  addTodo: async (name) => {
    try {
      const newTask = await addTask(name);
      set((state) => ({ todos: [...state.todos, newTask], error: null }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    const task = get().todos.find((todo) => todo.id === id);
    if (!task) return;

    try {
      const updatedTask = await updateTask(id, { completed: !task.completed });
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTask : todo)),
        error: null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  // Update task name
  updateTodo: async (id, name) => {
    try {
      const updatedTask = await updateTask(id, { name });
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTask : todo)),
        error: null,
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
