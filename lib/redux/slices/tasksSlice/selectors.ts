import { createSelector } from '@reduxjs/toolkit';
import type { ReduxState } from '../../';

export const selectAllTasks = (state: ReduxState) => state.tasks;
export const selectTasksTotalCount = (state: ReduxState) => state.tasks.length;
export const selectCompleteTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status === 'complete')
);
export const selectIncompleteTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status != 'complete')
);

export const selectTaskById = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status != 'complete')
);
