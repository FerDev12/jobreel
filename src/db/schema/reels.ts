import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations } from 'drizzle-orm';
import { likes } from './likes';
import { reelTags } from './reel-tags';

export const reels = pgTable('reel', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  totalLikes: integer('total_likes').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const reelsRelations = relations(reels, ({ one, many }) => ({
  tags: many(reelTags),
  likes: many(likes),
  user: one(users, { fields: [reels.userId], references: [users.id] }),
}));

export const selectReelSchema = createSelectSchema(reels);
export const insertReelSchema = createInsertSchema(reels);

export type Reel = z.infer<typeof selectReelSchema>;
export type NewReel = z.infer<typeof insertReelSchema>;
