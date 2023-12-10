'use client';

import {
  useDispatch,
  tasksSlice,
  Task,
  selectAllTasks,
  useSelector,
} from '../../../lib/redux';
import { useRouter } from 'next/navigation';
import TaskForm from '../TaskForm/TaskForm';
import { createSelector } from '@reduxjs/toolkit';

type Props = {
  id: string;
};

export default function EditTask({ id }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectTaskById = createSelector([selectAllTasks], (allTasks) =>
    allTasks.find((task) => task.id === id)
  );
  const task = useSelector(selectTaskById);
  const updateTask = (task: Partial<Task>) => {
    dispatch(tasksSlice.actions.update({ id, task: task as any }));
    router.push(`/${id}`);
  };

  const cancelAddingTask = () => {
    router.push(`/${id}`);
  };

  return (
    <TaskForm
      title="Edit Task"
      submitText="Save Task"
      submitAction={updateTask}
      cancelAction={cancelAddingTask}
      initialState={task}
    />
  );
}
