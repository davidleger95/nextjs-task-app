'use client';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { useDispatch, tasksSlice, Task } from '../../../lib/redux';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';

type InputError = {
  field: keyof Omit<Task, 'id' | 'status'>;
  message: string;
};

const validateTask = (task: Partial<Task>): InputError[] => {
  const errors = [];
  const hasTitle = (task.title?.length || 0) > 0;

  if (!hasTitle) {
    const titleError: InputError = {
      field: 'title',
      message: 'Title is required',
    };
    errors.push(titleError);
  }
  return errors;
};

export default function AddTask() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const [task, setTask] = useState<Omit<Task, 'id' | 'status'>>({ title: '' });
  const [errors, setErrors] = useState<InputError[]>([]);

  const addTask = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formErrors = validateTask(task);
    if (formErrors.length) {
      setErrors(formErrors);
      return;
    }

    dispatch(tasksSlice.actions.add(task));
    router.push('/');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    formRef.current?.reset();
  };

  return (
    <form onSubmit={addTask} ref={formRef}>
      <Grid gap="4">
        <Card style={{ overflow: 'visible' }}>
          <Grid p="4" gap="4">
            <Heading>Add New Task</Heading>
            <label>
              <Grid gap="1">
                <Text size="2">Title (required)</Text>
                <TextField.Root>
                  <TextField.Input
                    name="title"
                    placeholder="What do you need to do?"
                    required
                    value={task.title}
                    onChange={handleChange}
                  />
                </TextField.Root>
              </Grid>
            </label>
            <label>
              <Grid gap="1">
                <Text size="2">Due Date</Text>
                <DatePicker
                  customInput={<TextField.Input />}
                  name="dueDate"
                  selected={task.dueDate}
                  onChange={(date) =>
                    setTask((prev) => ({ ...prev, dueDate: date || undefined }))
                  }
                  minDate={new Date(Date.now())}
                  placeholderText="Select a due date"
                />
              </Grid>
            </label>
            <label>
              <Grid gap="1">
                <Text size="2">Description</Text>
                <TextField.Root>
                  <TextArea
                    name="description"
                    placeholder="More details about the task"
                    value={task.description}
                    onChange={handleChange}
                  />
                </TextField.Root>
              </Grid>
            </label>
            {errors.length > 0 && <Text>Has Errors</Text>}
          </Grid>
        </Card>
        <Flex align="start" gap="2">
          <Button type="submit" onClick={addTask}>
            Add
          </Button>
          <Button type="button" color="red" onClick={clearForm}>
            Clear Form
          </Button>
        </Flex>
      </Grid>
    </form>
  );
}
