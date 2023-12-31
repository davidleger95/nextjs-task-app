import { render } from '@testing-library/react';
import TaskListPage from '../app/page';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from '@reduxjs/toolkit';
import { reducer } from '../lib/redux/rootReducer';

describe('task list page', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => require('next-router-mock'));
  });

  it('renders valid HTML', () => {
    const store = createStore(reducer, { tasks: [] });
    const result = render(
      <Provider store={store}>
        <TaskListPage />
      </Provider>
    );

    expect(result.container.outerHTML).toRenderValidHTML();
  });
});
