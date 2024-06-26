import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { reels } from './reels';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const likes = pgTable(
  'likes',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    reelId: uuid('reel_id')
      .notNull()
      .references(() => reels.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => ({
    unq: unique('user_reel').on(t.userId, t.reelId),
  })
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, { fields: [likes.userId], references: [users.id] }),
  reel: one(reels, { fields: [likes.reelId], references: [reels.id] }),
}));

export const selectLikeSchema = createSelectSchema(likes);
export const insertLikeSchema = createInsertSchema(likes);

export type Like = z.infer<typeof selectLikeSchema>;
export type NewLike = z.infer<typeof insertLikeSchema>;
