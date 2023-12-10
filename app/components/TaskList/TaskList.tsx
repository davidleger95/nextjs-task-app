'use client';

import { Button } from '@radix-ui/themes';
import {
  selectTasksTotalCount,
  selectAllTasks,
  useDispatch,
  useSelector,
  tasksSlice,
} from '../../../lib/redux';

export default function IndexPage() {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTasksTotalCount);
  const tasks = useSelector(selectAllTasks);

  const addTask = () => dispatch(tasksSlice.actions.add({ title: 'item' }));
  return (
    <div>
      Total count: {totalCount}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
      <Button type="button" onClick={addTask}>
        Add
      </Button>
    </div>
  );
}
