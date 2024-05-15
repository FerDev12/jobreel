import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';
import { skills } from './skills';
import { relations } from 'drizzle-orm';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const profileSkills = pgTable(
  'profile_skills',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),

    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    skillId: uuid('skill_id')
      .notNull()
      .references(() => skills.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    unq: unique('profile_skill').on(t.profileId, t.skillId),
  })
);

export const profileSkillsRelations = relations(profileSkills, ({ one }) => ({
  profile: one(profiles, {
    fields: [profileSkills.profileId],
    references: [profiles.id],
  }),
  skill: one(skills, {
    fields: [profileSkills.skillId],
    references: [skills.id],
  }),
}));

export const selectProfileSkillSchema = createSelectSchema(profileSkills);
export const insertProfileSkillSchema = createInsertSchema(profileSkills);

export type ProfileSkill = z.infer<typeof selectProfileSkillSchema>;
export type NewProfileSkill = z.infer<typeof insertProfileSkillSchema>;
