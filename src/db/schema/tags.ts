import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  tag: text('tag').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const selectTagSchema = createSelectSchema(tags);
export const insertTagSchema = createInsertSchema(tags);

export type Tag = z.infer<typeof selectTagSchema>;
export type NewTag = z.infer<typeof insertTagSchema>;
