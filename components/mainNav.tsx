'use client';
import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export const MainNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/overview`,
      label: 'Overview',
      active: pathName === `/${params.storeId}/overview}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName === `/${params.storeId}/billboards}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings}`,
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark: text-white'
              : 'text-muted-foreground'
          )}
          href={route.href}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
