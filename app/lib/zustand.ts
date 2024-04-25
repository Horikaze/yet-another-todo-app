import { create } from "zustand";
import { todoType } from "./types";

interface TodoState {
  todos: todoType[];
  addTodo: (newTodo: todoType) => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
}));
