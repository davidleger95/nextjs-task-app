'use client';

import { useDispatch, tasksSlice, Task } from '../../../lib/redux';
import TaskForm from '../TaskForm/TaskForm';
import { Button, Dialog } from '@radix-ui/themes';
import { useState } from 'react';

export default function AddTask() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    dispatch(tasksSlice.actions.add(task));
    setOpen(false);
  };

  const cancelAddingTask = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Add Task</Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 600 }}>
        <Dialog.Title>Add a Task</Dialog.Title>
        <TaskForm
          submitText="Add"
          submitAction={addTask as any}
          cancelAction={cancelAddingTask}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
}
