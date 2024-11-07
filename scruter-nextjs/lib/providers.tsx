'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { GlobalListingProvider } from '@/context/GlobalListingProvider';
import { BookmarkProvider } from '@/context/UserBookmarkProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <GlobalListingProvider>{children}</GlobalListingProvider>
    </SessionProvider>
  );
};
