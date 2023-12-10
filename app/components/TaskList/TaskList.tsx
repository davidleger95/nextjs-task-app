'use client';

import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
} from '@radix-ui/themes';
import {
  selectTasksTotalCount,
  selectAllTasks,
  useDispatch,
  useSelector,
  tasksSlice,
  Status,
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
  const dispatch = useDispatch();
  const addTask = () => dispatch(tasksSlice.actions.add({ title: 'item' }));
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

export default function Tasks() {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTasksTotalCount);
  const tasks = useSelector(selectAllTasks);

  const clearAllTasks = () => dispatch(tasksSlice.actions.clear());

  if (totalCount === 0) {
    return <EmptyTasksList />;
  }

  return (
    <Grid gap="4">
      Total count: {totalCount}
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
            </Flex>
          </div>
        ))}
      </Card>
      <Flex align="start" gap="2">
        <Link type="button" href="/add">
          Add a task
        </Link>
        <Button type="button" color="red" onClick={clearAllTasks}>
          Clear List
        </Button>
      </Flex>
    </Grid>
  );
}
