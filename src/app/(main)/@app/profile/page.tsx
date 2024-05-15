import { db } from '@/db/http-client';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function ProfilePage() {
  const { userId } = auth().protect();

  const user = await db.query.users.findFirst({
    columns: { clerkId: false },
    where: (user, { eq }) => eq(user.clerkId, userId),
    with: {
      primaryEmailAddress: true,
      primaryPhoneNumber: true,
      profile: {
        with: {
          address: {
            columns: {
              city: true,
              state: true,
              country: true,
              zipCode: true,
            },
          },
          skills: {
            columns: { id: true },
            with: {
              skill: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return <></>;
}
