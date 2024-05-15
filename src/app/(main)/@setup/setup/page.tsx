import { getUserWithProfile } from '@/data';
import { db } from '@/db/http-client';
import { profiles } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

export default async function SetupPage() {
  const { userId } = auth().protect();

  const user = await getUserWithProfile(userId);

  if (!user) {
    return notFound();
  }

  await db.insert(profiles).values({
    userId: user.id,
  });

  revalidateTag(`user-${userId}`);

  return redirect('/app');
}
