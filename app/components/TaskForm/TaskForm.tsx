'use client';

import {
  Button,
  Flex,
  Grid,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { Task } from '../../../lib/redux';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  submitAction: (task: Partial<Task> | Omit<Task, 'id' | 'status'>) => void;
  cancelAction: Function;
  submitText: string;
  initialState?: Task;
};

export default function TaskForm(props: Props) {
  const onSubmit: SubmitHandler<Partial<Task>> = (data) => {
    props.submitAction(data);
  };

  const { handleSubmit, register, formState, getFieldState } = useForm<
    Partial<Task>
  >({
    defaultValues: props.initialState || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gap="4">
        <Grid gap="1" asChild>
          <label>
            <Text size="2">Title (required)</Text>
            <TextField.Root>
              <TextField.Input
                color={
                  getFieldState('title').error?.message ? 'red' : undefined
                }
                placeholder="What do you need to do?"
                {...register('title', {
                  required: 'Title is required.',
                  validate: (value) => !!value?.length,
                })}
                aria-invalid={formState.errors.title ? 'true' : 'false'}
              />
            </TextField.Root>
            {formState.errors.title && (
              <Text size="1" color="red">
                {formState.errors.title.message}
              </Text>
            )}
          </label>
        </Grid>
        <Grid gap="1" asChild>
          <label>
            <Text size="2">Due Date</Text>
            <TextField.Input
              placeholder="Select a due date"
              type="date"
              {...register('dueDate', {
                validate: (value) => {
                  if (!value) return true;
                  return new Date(value) >= new Date(Date.now())
                    ? true
                    : 'Due Date cannot be in the past.';
                },
              })}
              aria-invalid={formState.errors.dueDate ? 'true' : 'false'}
            />
            {formState.errors.dueDate && (
              <Text size="1" color="red">
                {formState.errors.dueDate.message}
              </Text>
            )}
          </label>
        </Grid>
        <Grid gap="1" asChild>
          <label>
            <Text size="2">Description</Text>
            <TextArea
              placeholder="More details about the task"
              {...register('description')}
            />
          </label>
        </Grid>
        <Flex align="start" gap="2">
          <Button type="submit">{props.submitText}</Button>
          <Button
            type="button"
            color="red"
            onClick={() => props.cancelAction()}
          >
            Cancel
          </Button>
        </Flex>
      </Grid>
    </form>
  );
}
