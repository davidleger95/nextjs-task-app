import type { ReduxState } from '../../';

export const selectTasksTotalCount = (state: ReduxState) => state.tasks.length;
export const selectAllTasks = (state: ReduxState) => state.tasks;
