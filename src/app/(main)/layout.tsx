import { ReactNode } from 'react';
import { MainHeader } from './_components/header';
import { auth } from '@clerk/nextjs/server';
import { getUserWithProfile } from '@/data';
import { notFound } from 'next/navigation';

export default async function MainLayout({
  app,
  setup,
  children,
}: {
  app: ReactNode;
  setup: ReactNode;
  children: ReactNode;
}) {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <MainHeader />
      <main className='container min-h-screen/header'>
        {user.profile ? app : setup}
      </main>
    </>
  );
}
