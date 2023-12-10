'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [{ path: '/', name: 'Home' }];

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map((link) => (
        <Link
          key={link.path}
          href="/"
          aria-current={pathname === link.path ? 'page' : undefined}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};
