import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState: TasksSliceState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<Task, 'id' | 'status'>>) => {
      const task: Task = {
        id: uuid(),
        status: 'todo',
        ...action.payload,
      };
      return [...state, task];
    },
    clear: () => [],
    clearCompleted: (state) => {
      return [...state.filter((task) => task.status != 'complete')];
    },
    update: (
      state,
      action: PayloadAction<{ id: string; task: Partial<Omit<Task, 'id'>> }>
    ) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      const task: Task = { ...state[index], ...action.payload.task };

      return [...state.slice(0, index), task, ...state.slice(index + 1)];
    },
  },
});

/* Types */
export type Status = 'todo' | 'complete';
export type Task = {
  id: string;
  status: Status;
  title: string;
  description?: string;
  dueDate?: Date;
};
export type TasksSliceState = Task[];
