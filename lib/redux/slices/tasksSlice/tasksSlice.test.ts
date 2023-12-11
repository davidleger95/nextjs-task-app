import { ReduxState } from 'lib/redux/store';
import { selectAllTasks, tasksSlice } from '.';
import { mockTasks } from './tasks.mock';

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

    it('clears all tasks', () => {
      const state = tasksSlice.reducer(mockTasks, tasksSlice.actions.clear());

      expect(state).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('selectAllTasks', () => {
      const state: ReduxState = { tasks: [] };

      const result = selectAllTasks(state);
      expect(result).toBe(0);
    });
  });
});
