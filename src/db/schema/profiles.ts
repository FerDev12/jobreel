import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { addresses } from './addresses';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { profileSkills } from './profile-skills';
import { users } from './users';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  bio: text('bio'),
  job_title: text('job_title'),
  resume_url: text('resume_url'),
  birthDate: date('birth_date'),
  school: text('school'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  addressId: uuid('address_id').references(() => addresses.id, {
    onDelete: 'cascade',
  }),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  address: one(addresses, {
    fields: [profiles.addressId],
    references: [addresses.id],
  }),
  skills: many(profileSkills),
}));

export const selectProfileSchema = createSelectSchema(profiles);
export const insertProfileSchema = createInsertSchema(profiles);

export type Profile = z.infer<typeof selectProfileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;
