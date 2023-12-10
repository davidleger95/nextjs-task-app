import type { ReduxState } from '../../';

export const selectTasksTotalCount = (state: ReduxState) => state.tasks.length;
export const selectAllTasks = (state: ReduxState) => state.tasks;
export const selectCompleteTasks = (state: ReduxState) =>
  state.tasks.filter((task) => task.status === 'complete');
export const selectIncompleteTasks = (state: ReduxState) =>
  state.tasks.filter((task) => task.status != 'complete');
