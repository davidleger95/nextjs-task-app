import { ReduxState } from 'lib/redux/store';
import { selectTasksTotalCount, tasksSlice } from '.';

describe('tasksSlice', () => {
  it('has an initial state with no tasks', () => {
    const initialState = tasksSlice.getInitialState();

    expect(initialState).toEqual([]);
  });

  describe('actions', () => {
    it.todo('adds a task to the state');
  });

  describe('selectors', () => {
    it('selectTasksTotalCount', () => {
      const state: ReduxState = { tasks: [] };

      const result = selectTasksTotalCount(state);
      expect(result).toBe(0);
    });
  });
});
