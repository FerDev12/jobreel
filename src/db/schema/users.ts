import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { phoneNumbers } from './phone-numbers';
import { emailAddresses } from './email-addresses';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { profiles } from './profiles';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  primaryEmailAddressId: uuid('primary_email_address_id').references(
    (): AnyPgColumn => emailAddresses.id,
    { onDelete: 'set null' }
  ),
  primaryPhoneNumberId: uuid('primary_phone_number_id').references(
    (): AnyPgColumn => phoneNumbers.id,
    { onDelete: 'set null' }
  ),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  emailAddresses: many(emailAddresses),
  phoneNumbers: many(phoneNumbers),
  primaryEmailAddress: one(emailAddresses, {
    fields: [users.primaryEmailAddressId],
    references: [emailAddresses.id],
  }),
  primaryPhoneNumber: one(phoneNumbers, {
    fields: [users.primaryPhoneNumberId],
    references: [phoneNumbers.id],
  }),
}));

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
