import EditTask from '../../components/EditTask/EditTask';

type Props = {
  params: { id: string };
};

export default function EditTaskPage({ params }: Props) {
  return <EditTask id={params.id} />;
}

export const metadata = {
  title: 'Edit Task',
};
