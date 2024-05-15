import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const emailAddresses = pgTable('email_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  emailAddress: text('email_address').notNull().unique(),
  verified: boolean('verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const emailAddressesRelations = relations(emailAddresses, ({ one }) => ({
  user: one(users, { fields: [emailAddresses.userId], references: [users.id] }),
}));

export const selectEmailAddressSchema = createSelectSchema(emailAddresses);
export const insertEmailAddressSchema = createInsertSchema(emailAddresses);

export type EmailAddress = z.infer<typeof selectEmailAddressSchema>;
export type NewEmailAddress = z.infer<typeof insertEmailAddressSchema>;
