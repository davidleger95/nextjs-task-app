import { createSelector } from '@reduxjs/toolkit';
import type { ReduxState } from '../../';

export const selectAllTasks = (state: ReduxState) => state.tasks;
export const selectCompleteTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status === 'complete')
);
export const selectIncompleteTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status != 'complete')
);

export const selectTaskCounts = createSelector(
  [selectAllTasks, selectIncompleteTasks, selectCompleteTasks],
  (allTasks, incompleteTasks, completedTasks) => ({
    all: allTasks.length,
    completed: completedTasks.length,
    todo: incompleteTasks.length,
  })
);
