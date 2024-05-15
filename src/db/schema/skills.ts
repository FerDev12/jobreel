import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const selectSkillSchema = createSelectSchema(skills);
export const insertSkillSchema = createInsertSchema(skills);

export type Skill = z.infer<typeof selectSkillSchema>;
export type NewSkill = z.infer<typeof insertSkillSchema>;
