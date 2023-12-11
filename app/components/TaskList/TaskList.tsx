'use client';

import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes';
import {
  useDispatch,
  useSelector,
  tasksSlice,
  Status,
  selectCompleteTasks,
  Task,
  selectIncompleteTasks,
  selectTaskCounts,
} from '../../../lib/redux';
import { BadgeProps } from '@radix-ui/themes/dist/cjs/components/badge';
import Link from 'next/link';

const badgeColorMap: Record<Status, BadgeProps['color']> = {
  complete: 'green',
  todo: 'blue',
};

type StatusBadgeProps = {
  status: Status;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge color={badgeColorMap[status]}>{status}</Badge>;
};

const EmptyTasksList = () => {
  return (
    <Card>
      <Flex direction="column" gap="4" p="4" align="center">
        <Text align="center">You have no tasks to do.</Text>

        <Link type="button" href="/add">
          Add a task
        </Link>
      </Flex>
    </Card>
  );
};

type TaskListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  const dispatch = useDispatch();
  const completeTask = (id: string) =>
    dispatch(tasksSlice.actions.update({ id, task: { status: 'complete' } }));
  return (
    <Card>
      {tasks.map((task, i) => (
        <div key={task.id}>
          {i > 0 && <Separator size="4" />}
          <Flex justify="between" gap="4" p="2">
            <div>
              <b>{task.title}</b>
            </div>
            {task.dueDate ? (
              <time dateTime={task.dueDate?.toString()}>
                {task.dueDate?.toLocaleString()}
              </time>
            ) : (
              <div>No due date</div>
            )}
            <StatusBadge status={task.status} />
            <Flex gap="2">
              <Link href={`${task.id}/edit`}>Edit</Link>
              <Button
                type="button"
                color="green"
                size="1"
                onClick={() => completeTask(task.id)}
              >
                Complete
              </Button>
            </Flex>
          </Flex>
        </div>
      ))}
    </Card>
  );
};

export default function Tasks() {
  const dispatch = useDispatch();
  const taskCounts = useSelector(selectTaskCounts);
  const completedTasks = useSelector(selectCompleteTasks);
  const incompleteTasks = useSelector(selectIncompleteTasks);

  const clearAllTasks = () => dispatch(tasksSlice.actions.clear());
  const clearCompletedTasks = () =>
    dispatch(tasksSlice.actions.clearCompleted());

  return (
    <Grid gap="4">
      <div>
        <Button type="button" color="red" onClick={clearAllTasks}>
          Clear All
        </Button>
      </div>
      <Heading>
        Todo ({taskCounts.todo}/{taskCounts.all})
      </Heading>
      {incompleteTasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <TaskList tasks={incompleteTasks} />
      )}
      {completedTasks.length > 0 && (
        <>
          <Heading>
            Completed ({taskCounts.todo}/{taskCounts.all})
          </Heading>
          <TaskList tasks={completedTasks} />
        </>
      )}
      <Flex align="start" gap="2">
        <Link type="button" href="/add">
          Add a task
        </Link>
        <Button type="button" color="red" onClick={clearCompletedTasks}>
          Clear Completed
        </Button>
      </Flex>
    </Grid>
  );
}
