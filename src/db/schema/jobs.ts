import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { addresses } from './addresses';
import { businesses } from './businesses';

export const jobType = pgEnum('job_type', [
  'internship',
  'part_time',
  'full_time',
  'contract',
]);

export const jobLocationType = pgEnum('job_location_type', [
  'on-site',
  'hybrid',
  'remote',
]);

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: jobType('type').notNull(),
  location_type: jobLocationType('location_type').notNull(),
  imageUrl: text('image_url'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  addressId: uuid('address_id').references(() => addresses.id, {
    onDelete: 'set null',
  }),
  businessId: uuid('business_id')
    .notNull()
    .references(() => businesses.id, { onDelete: 'cascade' }),
});
