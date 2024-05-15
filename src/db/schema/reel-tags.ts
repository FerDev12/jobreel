import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { reels } from './reels';
import { tags } from './tags';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const reelTags = pgTable(
  'reel_tags',
  {
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'restrict' }),
    reelId: uuid('reel_id')
      .notNull()
      .references(() => reels.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    unq: unique('reel_tag').on(t.reelId, t.tagId),
  })
);

export const selectReelTagSchema = createSelectSchema(reelTags);
export const insertReelTagSchema = createInsertSchema(reelTags);

export type ReelTag = z.infer<typeof selectReelTagSchema>;
export type NewReelTag = z.infer<typeof insertReelTagSchema>;
