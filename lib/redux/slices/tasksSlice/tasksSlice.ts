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
  },
});

/* Types */
export type Task = {
  id: string;
  status: 'todo' | 'complete';
  title: string;
  description?: string;
  dueDate?: Date;
};
export type TasksSliceState = Task[];
