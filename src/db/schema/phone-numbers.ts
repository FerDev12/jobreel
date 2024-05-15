import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const phoneNumbers = pgTable('phone_numbers', {
  id: uuid('phone_numbers').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  phoneNumber: text('phone_number j').notNull().unique(),
  verified: boolean('verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const phoneNumbersRelations = relations(phoneNumbers, ({ one }) => ({
  user: one(users, { fields: [phoneNumbers.userId], references: [users.id] }),
}));

export const selectPhoneNumberSchema = createSelectSchema(phoneNumbers);
export const insertPhoneNumberSchema = createInsertSchema(phoneNumbers);

export type PhoneNumber = z.infer<typeof selectPhoneNumberSchema>;
export type NewPhoneNumber = z.infer<typeof insertPhoneNumberSchema>;
