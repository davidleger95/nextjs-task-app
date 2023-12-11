import { render } from '@testing-library/react';
import EditTaskPage from '../app/[id]/edit/page';
import { mockTasks } from '../lib/redux/slices/tasksSlice/tasks.mock';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from '@reduxjs/toolkit';
import { reducer } from '../lib/redux/rootReducer';

const store = createStore(reducer, { tasks: mockTasks });

describe('edit task page', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => require('next-router-mock'));
  });

  it('renders valid HTML', () => {
    const result = render(
      <Provider store={store}>
        <EditTaskPage params={{ id: mockTasks[0].id }} />
      </Provider>
    );

    expect(result.container.outerHTML).toRenderValidHTML();
  });
});
