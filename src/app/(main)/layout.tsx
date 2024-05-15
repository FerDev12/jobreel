import { ReactNode } from 'react';
import { MainHeader } from './_components/header';
import { auth } from '@clerk/nextjs/server';
import { getUserWithProfile } from '@/data';
import { notFound } from 'next/navigation';

export default async function MainLayout({
  app,
  welcome,
  children,
}: {
  app: ReactNode;
  welcome: ReactNode;
  children: ReactNode;
}) {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  return <>{user ? welcome : app}</>;
}
