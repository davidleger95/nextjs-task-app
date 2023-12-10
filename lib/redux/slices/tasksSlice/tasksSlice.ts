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
      state.push(task);
    },
    clear: (state) => (state = []),
    update: (
      state,
      action: PayloadAction<{ id: string; task: Partial<Omit<Task, 'id'>> }>
    ) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index] = { ...state[index], ...action.payload.task };
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
