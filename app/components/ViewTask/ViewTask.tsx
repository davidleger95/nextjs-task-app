'use client';

import { selectAllTasks, useSelector } from '../../../lib/redux';
import { createSelector } from '@reduxjs/toolkit';
import { Text, Card, Grid, Heading, Separator } from '@radix-ui/themes';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { TaskActions } from '../TaskActions/TaskActions';
import { DisplayDate } from '../DisplayDate/DisplayDate';

type Props = {
  id: string;
};

export default function ViewTask({ id }: Props) {
  const selectTaskById = createSelector([selectAllTasks], (allTasks) =>
    allTasks.find((task) => task.id === id)
  );
  const task = useSelector(selectTaskById);

  if (!task) return <Card>Invalid task id: {id}</Card>;

  return (
    <Card>
      <Grid gap="4" p="4">
        <Grid columns="1fr auto" asChild>
          <header>
            <Heading>
              <Grid gap="2">{task.title}</Grid>
            </Heading>
            <TaskActions task={task} />
          </header>
        </Grid>
        <Separator size="4" />
        <Grid gap="2">
          <Heading as="h2" size="4">
            Status
          </Heading>
          <div>
            <StatusBadge status={task.status} />
          </div>
        </Grid>
        <Grid gap="2">
          <Heading as="h2" size="4">
            Due Date
          </Heading>
          <DisplayDate value={task.dueDate} />
        </Grid>
        <Grid gap="2">
          <Heading as="h2" size="4">
            Description
          </Heading>
          {task.description ? (
            <Text style={{ whiteSpace: 'pre-wrap' }}>{task.description}</Text>
          ) : (
            <Text color="gray">
              <em>No Description</em>
            </Text>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
