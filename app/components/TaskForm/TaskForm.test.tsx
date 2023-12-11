import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';
import { mockTasks } from '../../../lib/redux/slices/tasksSlice/tasks.mock';

describe('task list page', () => {
  it('renders valid HTML', () => {
    const result = render(
      <TaskForm
        submitText="Add Task"
        submitAction={vi.fn()}
        cancelAction={vi.fn()}
      />
    );

    expect(result.container.outerHTML).toRenderValidHTML();
  });

  describe('behavior', () => {
    it('does not submit with invalid input', async () => {
      const user = userEvent.setup();

      const submitAction = vi.fn();
      const { getByText } = render(
        <TaskForm
          submitText="Add Task"
          submitAction={submitAction}
          cancelAction={vi.fn()}
        />
      );

      const submitButton = getByText('Add Task');
      await user.click(submitButton);

      expect(submitAction).not.toHaveBeenCalled();
    });
    it('submits with valid input', async () => {
      const user = userEvent.setup();

      const submitAction = vi.fn();
      const { getByText, getByLabelText } = render(
        <TaskForm
          submitText="Add Task"
          submitAction={submitAction}
          cancelAction={vi.fn()}
          initialState={mockTasks[0]}
        />
      );

      const titleInput = getByLabelText('Title');
      await user.type(titleInput, ' edited');
      const submitButton = getByText('Add Task');
      await user.click(submitButton);

      expect(submitAction).toHaveBeenCalledWith({
        ...mockTasks[0],
        title: `${mockTasks[0].title} edited`,
      });
    });

    it('calls cancel action', async () => {
      const user = userEvent.setup();

      const submitAction = vi.fn();
      const cancelAction = vi.fn();
      const { getByText } = render(
        <TaskForm
          submitText="Add Task"
          submitAction={submitAction}
          cancelAction={cancelAction}
        />
      );

      const cancelButton = getByText('Cancel');
      await user.click(cancelButton);

      expect(cancelAction).toHaveBeenCalledOnce();
    });
  });
});
