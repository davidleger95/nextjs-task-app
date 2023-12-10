'use client';

import {
  useDispatch,
  tasksSlice,
  Task,
  selectAllTasks,
  useSelector,
} from '../../../lib/redux';
import { useRouter } from 'next/navigation';
import { createSelector } from '@reduxjs/toolkit';
import { Button, Card, Flex } from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  id: string;
};

export default function ViewTask({ id }: Props) {
  const selectTaskById = createSelector([selectAllTasks], (allTasks) =>
    allTasks.find((task) => task.id === id)
  );
  const task = useSelector(selectTaskById);

  const dispatch = useDispatch();
  const completeTask = (id: string) =>
    dispatch(tasksSlice.actions.update({ id, task: { status: 'complete' } }));

  if (!task) return <Card color="red">Invalid task id: {id}</Card>;

  return (
    <>
      <Flex gap="2">
        <Link href={`${task.id}/edit`}>Edit</Link>
        <Button
          type="button"
          color="green"
          size="1"
          onClick={() => completeTask(task.id)}
        >
          Mark as Complete
        </Button>
      </Flex>
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </>
  );
}
