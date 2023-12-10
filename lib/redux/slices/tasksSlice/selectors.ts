import type { ReduxState } from '../../';

export const selectTasksTotalCount = (state: ReduxState) => state.tasks.length;
