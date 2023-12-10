import ViewTask from 'app/components/ViewTask/ViewTask';

type Props = {
  params: { id: string };
};

export default function ViewTaskPage({ params }: Props) {
  return <ViewTask id={params.id} />;
}

export const metadata = {
  title: 'Task',
};
