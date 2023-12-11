'use client';

import {
  Link as RadixLink,
  Flex,
  Grid,
  Separator,
  Button,
  Badge,
} from '@radix-ui/themes';
import {
  selectTaskCounts,
  tasksSlice,
  useDispatch,
  useSelector,
} from 'lib/redux';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();
  const taskCounts = useSelector(selectTaskCounts);
  const dispatch = useDispatch();
  const clearAllTasks = () => dispatch(tasksSlice.actions.clear());
  return (
    <Grid>
      <Flex justify="between" p="4" align="center">
        <Button asChild variant="ghost" size="2">
          <Link href="/" aria-current={pathname === '/' ? 'page' : 'false'}>
            All Tasks
            {!!taskCounts.all && <Badge>{taskCounts.all}</Badge>}
          </Link>
        </Button>
        <Button onClick={clearAllTasks} color="red">
          Clear All Tasks
        </Button>
      </Flex>
      <Separator size="4" />
    </Grid>
  );
};
