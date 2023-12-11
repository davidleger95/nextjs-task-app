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
import { Task } from '../../../lib/redux';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  title: string;
  submitAction: (task: Partial<Task>) => void;
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
  console.log(formState.errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gap="4">
        <Card>
          <Grid p="4" gap="4">
            <Heading>{props.title}</Heading>

            <label>
              <Grid gap="1">
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
              </Grid>
            </label>
            <label>
              <Grid gap="1">
                <Text size="2">Due Date</Text>
                <TextField.Input
                  placeholder="Select a due date"
                  type="date"
                  {...register('dueDate', {
                    validate: (value) => {
                      if (!value) return true;
                      return new Date(value) > new Date(Date.now())
                        ? true
                        : 'Due Date must be in the future.';
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
            </label>
            <label>
              <Grid gap="1">
                <Text size="2">Description</Text>
                <TextArea
                  placeholder="More details about the task"
                  {...register('description')}
                />
              </Grid>
            </label>
          </Grid>
        </Card>
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
