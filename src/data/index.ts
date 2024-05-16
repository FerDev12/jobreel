import { db } from '@/db/http-client';
import { sql } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import 'server-only';

const preparedGetUserWithProfile = db.query.users
  .findFirst({
    columns: {
      id: true,
      clerkId: true,
      firstName: true,
      lastName: true,
      username: true,
      imageUrl: true,
    },
    where: (user, { eq }) => eq(user.clerkId, sql.placeholder('clerkId')),
    with: {
      primaryEmailAddress: true,
      primaryPhoneNumber: true,
      profile: {
        with: {
          skills: {
            with: {
              skill: true,
            },
          },
          address: true,
        },
      },
    },
  })
  .prepare('prepared_user_with_profile');

export async function getUserWithProfile(clerkId: string) {
  const fetchUserWithProfile = unstable_cache(
    async (clerkId: string) =>
      await preparedGetUserWithProfile.execute({ clerkId }),
    ['user_with_profile'],
    { tags: [`user-${clerkId}`], revalidate: 3600 }
  );

  return await fetchUserWithProfile(clerkId);
}
