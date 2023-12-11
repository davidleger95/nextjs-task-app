import { render } from '@testing-library/react';
import ViewTaskPage from '../app/[id]/page';
import { mockTasks } from '../lib/redux/slices/tasksSlice/tasks.mock';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from '@reduxjs/toolkit';
import { reducer } from '../lib/redux/rootReducer';

const store = createStore(reducer, { tasks: mockTasks });

describe('view task page', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => require('next-router-mock'));
  });

  it.skip('renders valid HTML', () => {
    const result = render(
      <Provider store={store}>
        <ViewTaskPage params={{ id: mockTasks[1].id }} />
      </Provider>
    );

    expect(result.container.outerHTML).toRenderValidHTML();
  });
});
