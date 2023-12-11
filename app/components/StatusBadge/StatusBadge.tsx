import { Badge } from '@radix-ui/themes';

import { BadgeProps } from '@radix-ui/themes/dist/cjs/components/badge';
import { Status } from 'lib/redux';

const badgeColorMap: Record<Status, BadgeProps['color']> = {
  complete: 'green',
  todo: 'blue',
};

type StatusBadgeProps = {
  status: Status;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge color={badgeColorMap[status]}>{status}</Badge>;
};
