'use client';

import { Badge, Button, Card, Flex, Grid, Separator } from '@radix-ui/themes';
import {
  selectTasksTotalCount,
  selectAllTasks,
  useDispatch,
  useSelector,
  tasksSlice,
  Status,
} from '../../../lib/redux';
import { BadgeProps } from '@radix-ui/themes/dist/cjs/components/badge';

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

export default function TaskList() {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTasksTotalCount);
  const tasks = useSelector(selectAllTasks);

  const addTask = () => dispatch(tasksSlice.actions.add({ title: 'item' }));
  return (
    <Grid gap="2">
      Total count: {totalCount}
      <Card>
        {tasks.map((task, i) => (
          <>
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
          </>
        ))}
      </Card>
      <Button type="button" onClick={addTask}>
        Add
      </Button>
    </Grid>
  );
}
