import { auth } from '@clerk/nextjs/server';
import { ReactNode } from 'react';
import { MainHeader } from '../../_components/header';

export default function MainAppLayout({
  seeker,
  business,
  children,
}: {
  seeker: ReactNode;
  business: ReactNode;
  children: ReactNode;
}) {
  const { orgId } = auth().protect();

  return (
    <>
      <MainHeader />
      <main className='min-h-[calc(100svh-64px)] container max-w-2xl py-8'>
        {!orgId ? seeker : business}
      </main>
    </>
  );
}
