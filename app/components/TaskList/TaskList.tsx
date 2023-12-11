'use client';

import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from '@radix-ui/themes';
import {
  useDispatch,
  useSelector,
  tasksSlice,
  selectCompleteTasks,
  Task,
  selectIncompleteTasks,
  selectTaskCounts,
} from '../../../lib/redux';
import Link from 'next/link';
import AddTask from '../AddTask/AddTask';
import { TaskActions } from '../TaskActions/TaskActions';
import { DisplayDate } from '../DisplayDate/DisplayDate';

const EmptyTasksList = () => {
  return (
    <Card>
      <Flex direction="column" gap="4" p="4" align="center">
        <Text align="center">You have no tasks to do.</Text>
        <AddTask />
      </Flex>
    </Card>
  );
};

type TaskListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Grid gap="2" asChild>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Card asChild>
              <Link
                href={task.id}
                onClick={(e) => {
                  const shouldPreventNavigation = (
                    e.target as HTMLElement
                  ).closest('[data-prevent-navigation="true"]');
                  if (shouldPreventNavigation) e.preventDefault();
                }}
              >
                <Grid gap="4" p="2" columns="1fr 1fr auto">
                  <div>
                    <b>{task.title}</b>
                  </div>
                  <DisplayDate value={task.dueDate} />
                  <TaskActions task={task} />
                </Grid>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </Grid>
  );
};

export default function Tasks() {
  const dispatch = useDispatch();
  const taskCounts = useSelector(selectTaskCounts);
  const completedTasks = useSelector(selectCompleteTasks);
  const incompleteTasks = useSelector(selectIncompleteTasks);

  const clearCompletedTasks = () =>
    dispatch(tasksSlice.actions.clearCompleted());

  return (
    <Grid gap="4" columns="repeat(auto-fit, minmax(500px, 1fr))">
      <Flex gap="4" direction="column" grow="1">
        <Flex gap="2" align="center">
          <Heading as="h2">Todo</Heading>
          {!!taskCounts.todo && (
            <Badge variant="surface">{taskCounts.todo}</Badge>
          )}
        </Flex>
        {incompleteTasks.length === 0 ? (
          <EmptyTasksList />
        ) : (
          <>
            <TaskList tasks={incompleteTasks} />
            <AddTask />
          </>
        )}
      </Flex>
      <Flex gap="4" direction="column" grow="1">
        <Flex gap="2" align="center">
          <Heading as="h2">Completed</Heading>
          {!!taskCounts.completed && (
            <Badge variant="surface">{taskCounts.completed}</Badge>
          )}
        </Flex>
        {completedTasks.length === 0 ? (
          <Card>
            <Text size="1">No tasks completed. Get to Work!</Text>
          </Card>
        ) : (
          <>
            <TaskList tasks={completedTasks} />
            <Button
              type="button"
              variant="surface"
              color="red"
              onClick={clearCompletedTasks}
            >
              Clear Completed
            </Button>
          </>
        )}
      </Flex>
    </Grid>
  );
}
