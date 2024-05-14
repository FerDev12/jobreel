'use client';
import { ReactNode } from 'react';
import { Toaster } from '../ui/sonner';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster position='top-center' richColors />
    </>
  );
}
