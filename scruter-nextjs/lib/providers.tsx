'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { GlobalListingProvider } from '@/context/GlobalListingProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <GlobalListingProvider>{children}</GlobalListingProvider>
    </SessionProvider>
  );
};
