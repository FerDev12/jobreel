import { db } from '@/db/http-client';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import 'server-only';

export async function handleUserDeleted(clerkId: string) {
  await db.delete(users).where(eq(users.clerkId, clerkId));
  revalidateTag(`user-${clerkId}`);
}
