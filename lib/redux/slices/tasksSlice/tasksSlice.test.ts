import { ReduxState } from 'lib/redux/store';
import { selectTasksTotalCount, tasksSlice } from '.';

describe('tasksSlice', () => {
  it('has an initial state with no tasks', () => {
    const initialState = tasksSlice.getInitialState();

    expect(initialState).toEqual([]);
  });

  describe('actions', () => {
    it('adds a task to the state with default values', () => {
      const state = tasksSlice.reducer(
        [],
        tasksSlice.actions.add({ title: 'First todo' })
      );

      expect(state).toHaveLength(1);
      expect(state[0].id).toBeDefined();
      expect(state[0].status).toBe('todo');
    });
  });

  describe('selectors', () => {
    it('selectTasksTotalCount', () => {
      const state: ReduxState = { tasks: [] };

      const result = selectTasksTotalCount(state);
      expect(result).toBe(0);
    });
  });
});
