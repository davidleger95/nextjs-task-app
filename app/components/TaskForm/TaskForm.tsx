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
        <Grid gap="1">
          <Text size="2" asChild>
            <label htmlFor="task-title-input">Title</label>
          </Text>
          <TextField.Root>
            <TextField.Input
              id="task-title-input"
              color={getFieldState('title').error?.message ? 'red' : undefined}
              type="text"
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
        </Grid>
        <Grid gap="1">
          <Text size="2" asChild>
            <label htmlFor="task-due-date-input">Due Date</label>
          </Text>
          <TextField.Input
            id="task-due-date-input"
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
        </Grid>
        <Grid gap="1">
          <Text size="2" asChild>
            <label htmlFor="task-description-input">Description</label>
          </Text>
          <TextArea
            id="task-description-input"
            placeholder="More details about the task"
            {...register('description')}
          />
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
