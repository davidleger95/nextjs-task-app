'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [{ path: '/', name: 'Tasks' }];

export const Nav = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        {links.map((link) => (
          <NavigationMenu.Item key={link.path}>
            <Link legacyBehavior passHref href="/">
              <NavigationMenu.Link active={pathname === link.path}>
                {link.name}
              </NavigationMenu.Link>
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
