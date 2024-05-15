import {
  NewPhoneNumber,
  insertPhoneNumberSchema,
  phoneNumbers,
} from '@/db/schema/phone-numbers';
import {
  NewEmailAddress,
  emailAddresses,
  insertEmailAddressSchema,
} from '@/db/schema/email-addresses';
import { NewUser, insertUserSchema, users } from '@/db/schema/users';
import { getTransactionalClient } from '@/db/transactional-client';
import { clerkClient } from '@clerk/nextjs/server';
import { and, eq, notInArray } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import 'server-only';
import { profiles } from '@/db/schema';

export async function handleUserUpsert(clerkId: string) {
  const clerkUser = await clerkClient.users.getUser(clerkId);

  if (!clerkUser) {
    throw new Error('User not found');
  }

  const userData: NewUser = {
    clerkId,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    username: clerkUser.username,
  };

  const parsedUserData = insertUserSchema.safeParse(userData);

  if (!parsedUserData.success) {
    throw new Error(parsedUserData.error.issues[0].message);
  }

  const { db, pool } = getTransactionalClient();

  try {
    let dbPhones: { id: string; clerkId: string }[] = [];

    await db.transaction(async (tx) => {
      const [dbUser] = await tx
        .insert(users)
        .values(parsedUserData.data)
        .onConflictDoUpdate({
          target: users.clerkId,
          set: parsedUserData.data,
        })
        .returning({ id: users.id });

      const emailAddressesData: NewEmailAddress[] =
        clerkUser.emailAddresses.map((email) => ({
          userId: dbUser.id,
          clerkId: email.id,
          emailAddress: email.emailAddress,
          verified: email.verification?.status === 'verified',
        }));

      const parsedEmailAddressesData = insertEmailAddressSchema
        .array()
        .min(1)
        .safeParse(emailAddressesData);

      if (!parsedEmailAddressesData.success) {
        throw new Error(parsedEmailAddressesData.error.issues[0].message);
      }

      if (clerkUser.phoneNumbers.length > 0) {
        const phoneNumbersData: NewPhoneNumber[] = clerkUser.phoneNumbers.map(
          (phone) => ({
            userId: dbUser.id,
            clerkId: phone.id,
            phoneNumber: phone.phoneNumber,
            verified: phone.verification?.status === 'verified',
          })
        );

        const parsedPhoneNumbersData = insertPhoneNumberSchema
          .array()
          .min(1)
          .safeParse(phoneNumbersData);

        if (!parsedPhoneNumbersData.success) {
          throw new Error(parsedPhoneNumbersData.error.issues[0].message);
        }

        dbPhones = await tx
          .insert(phoneNumbers)
          .values(parsedPhoneNumbersData.data)
          .onConflictDoUpdate({
            target: phoneNumbers.clerkId,
            set: { verified: true },
          })
          .returning({ id: phoneNumbers.id, clerkId: phoneNumbers.clerkId });
      }

      const dbEmails = await tx
        .insert(emailAddresses)
        .values(parsedEmailAddressesData.data)
        .onConflictDoUpdate({
          target: emailAddresses.clerkId,
          set: { verified: true },
        })
        .returning({
          id: emailAddresses.id,
          clerkId: emailAddresses.clerkId,
        });

      const primaryEmailAddress = dbEmails.find(
        (email) => email.clerkId === clerkUser.primaryEmailAddressId
      );

      const primaryPhoneNumber = dbPhones.find(
        (phone) => phone.clerkId === clerkUser.id
      );

      if (!dbPhones.length) {
        await Promise.all([
          tx
            .insert(profiles)
            .values({ userId: dbUser.id })
            .onConflictDoNothing({
              target: profiles.userId,
            }),
          tx.update(users).set({
            primaryEmailAddressId: primaryEmailAddress?.id,
            primaryPhoneNumberId: primaryPhoneNumber?.id,
          }),
          tx.delete(emailAddresses).where(
            and(
              eq(emailAddresses.userId, dbUser.id),
              notInArray(
                emailAddresses.clerkId,
                dbEmails.map((e) => e.clerkId)
              )
            )
          ),
        ]);
      } else {
        await Promise.all([
          tx
            .insert(profiles)
            .values({ userId: dbUser.id })
            .onConflictDoNothing({
              target: profiles.userId,
            }),
          tx.update(users).set({
            primaryEmailAddressId: primaryEmailAddress?.id,
            primaryPhoneNumberId: primaryPhoneNumber?.id,
          }),
          tx.delete(emailAddresses).where(
            and(
              eq(emailAddresses.userId, dbUser.id),
              notInArray(
                emailAddresses.clerkId,
                dbEmails.map((e) => e.clerkId)
              )
            )
          ),
          tx.delete(phoneNumbers).where(
            and(
              eq(phoneNumbers.userId, dbUser.id),
              notInArray(
                phoneNumbers.clerkId,
                dbPhones.map((p) => p.clerkId)
              )
            )
          ),
        ]);
      }
    });

    revalidateTag(`user-${clerkId}`);
  } catch (err: any) {
    throw err;
  } finally {
    await pool.end();
  }
}
