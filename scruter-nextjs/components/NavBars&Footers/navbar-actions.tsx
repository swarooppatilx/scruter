'use client';

import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const NavbarActions = () => {
  //prevention for hydration error

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push('/auth/seller/login')}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <LogIn size={20} color="white" />
      </Button>
    </div>
  );
};

export default NavbarActions;
