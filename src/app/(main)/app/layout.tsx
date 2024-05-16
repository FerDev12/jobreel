import { auth } from '@clerk/nextjs/server';
import { ReactNode } from 'react';
import { getUserWithProfile } from '@/data';

export default async function AppLayout({
  welcome,
  main,
  children,
}: {
  welcome: ReactNode;
  main: ReactNode;
  children: ReactNode;
}) {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return welcome;
  }

  return main;
}
