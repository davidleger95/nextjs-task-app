import { Flex, DropdownMenu, Tooltip, IconButton } from '@radix-ui/themes';
import { CheckIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Task, tasksSlice } from '../../../lib/redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

type Props = {
  task: Task;
};

export const TaskActions = ({ task }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const completeTask = (id: string) =>
    dispatch(tasksSlice.actions.update({ id, task: { status: 'complete' } }));

  const uncompleteTask = (id: string) =>
    dispatch(tasksSlice.actions.update({ id, task: { status: 'todo' } }));

  const deleteTask = (id: string) => {
    dispatch(tasksSlice.actions.delete(id));
    router.push('/');
  };

  return (
    <Flex gap="2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="soft" size="1" aria-label="actions">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item asChild>
            <Link href={`${task.id}/edit`}>Edit</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            data-prevent-navigation
            color="red"
            onClick={() => deleteTask(task.id)}
            asChild
          >
            <button type="button">Delete</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {task.status != 'complete' && (
        <Tooltip content="Mark as Complete">
          <IconButton
            data-prevent-navigation
            type="button"
            color="green"
            variant="outline"
            size="1"
            onClick={() => completeTask(task.id)}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      )}
      {task.status != 'todo' && (
        <Tooltip content="Mark as Todo">
          <IconButton
            data-prevent-navigation
            type="button"
            color="green"
            size="1"
            onClick={() => uncompleteTask(task.id)}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  );
};
