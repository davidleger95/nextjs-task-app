import EditTask from 'app/components/EditTask/EditTask';
import { useRouter } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function EditTaskPage({ params }: Props) {
  return <EditTask id={params.id} />;
}

export const metadata = {
  title: 'Edit Task',
};
