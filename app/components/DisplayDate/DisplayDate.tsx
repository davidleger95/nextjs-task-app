import { Text, Tooltip } from '@radix-ui/themes';

const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

type Props = {
  value?: Date | string;
};

export const DisplayDate = ({ value }: Props) => {
  if (!value)
    return (
      <Text color="gray" size="2">
        <em>No Date</em>
      </Text>
    );

  const date = new Date(value);

  const isOverdue = date < new Date(Date.now());

  return (
    <div>
      <Tooltip content={isOverdue ? 'Overdue' : 'Due Date'}>
        <Text size="2" color={isOverdue ? 'orange' : undefined}>
          <time dateTime={date.toISOString()}>{formatDate(date)}</time>
        </Text>
      </Tooltip>
    </div>
  );
};
