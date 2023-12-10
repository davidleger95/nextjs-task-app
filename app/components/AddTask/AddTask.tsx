'use client';

import { useDispatch, tasksSlice, Task } from '../../../lib/redux';
import { useRouter } from 'next/navigation';
import TaskForm from '../TaskForm/TaskForm';

export default function AddTask() {
  const router = useRouter();
  const dispatch = useDispatch();

  const addTask = (task: Partial<Task>) => {
    dispatch(tasksSlice.actions.add(task as any));
    router.push('/');
  };

  const cancelAddingTask = () => {
    router.push('/');
  };

  return (
    <TaskForm
      title="Add Task"
      submitText="Add"
      submitAction={addTask}
      cancelAction={cancelAddingTask}
    />
  );
}
