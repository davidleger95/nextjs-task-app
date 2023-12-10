import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: TasksSliceState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (_state, _action: PayloadAction<Task>) => {
      // TODO handle action
    },
  },
});

/* Types */
export type Task = {};
export type TasksSliceState = [];
