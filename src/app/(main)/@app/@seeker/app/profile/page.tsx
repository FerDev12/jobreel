import { getUserWithProfile } from '@/data';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function ProfilePage() {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  return <div></div>;
}
