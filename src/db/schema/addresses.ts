import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  street: text('street').notNull(),
  street2: text('street_2'),
  extNumber: text('exterior_number').notNull(),
  interiorNumber: text('interior_number'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  zipCode: text('zipCode').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const selectAddressSchema = createSelectSchema(addresses);
export const insertAddressSchema = createInsertSchema(addresses);

export type Address = z.infer<typeof selectAddressSchema>;
export type NewAddress = z.infer<typeof insertAddressSchema>;
