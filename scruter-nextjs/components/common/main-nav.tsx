'use client';

import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHouseUser,
  faCutlery,
  faTag,
} from '@fortawesome/free-solid-svg-icons'; // Import relevant icons

const MainNav = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const routes = [
    {
      href: `/`,
      label: 'Home',
      icon: faHome,
      active: pathname.startsWith(`/`),
    },
    {
      href: `/house`,
      label: 'Housing',
      icon: faHouseUser,
      active: pathname.startsWith(`/house`),
    },
    {
      href: `/food`,
      label: 'Food',
      icon: faCutlery,
      active: pathname.startsWith(`/food`),
    },
    {
      href: `/for-sale`,
      label: 'For Sale',
      icon: faTag,
      active: pathname.startsWith(`/for-sale`),
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="mx-40 flex items-center justify-center space-x-4 lg:space-x-6">
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colours hover:text-black flex items-center space-x-2', // Add flex and space-x for icon and text alignment
            route.active ? 'text-black' : 'text-neutral-500'
          )}
        >
          <FontAwesomeIcon icon={route.icon} className="text-lg" />{' '}
          {/* Display the icon */}
          <span>{route.label}</span> {/* Display the label */}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
