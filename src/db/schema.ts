import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import {
  AnyPgColumn,
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  primaryEmailAddressId: uuid('primary_email_address_id').references(
    (): AnyPgColumn => emailAddresses.id,
    { onDelete: 'set null' }
  ),
  primaryPhoneNumberId: uuid('primary_phone_number_id').references(
    (): AnyPgColumn => phoneNumbers.id,
    { onDelete: 'set null' }
  ),
});

export const emailAddresses = pgTable('email_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  emailAddress: text('email_address').notNull().unique(),
  verified: boolean('verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

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

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

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

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  tag: text('tag').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

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

export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  addressId: uuid('address_id').references(() => addresses.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles),
  emailAddresses: many(emailAddresses),
  phoneNumbers: many(phoneNumbers),
  primaryEmailAddress: one(emailAddresses, {
    fields: [users.primaryEmailAddressId],
    references: [emailAddresses.id],
  }),
  primaryPhoneNumber: one(phoneNumbers, {
    fields: [users.primaryPhoneNumberId],
    references: [phoneNumbers.id],
  }),
}));

export const emailAddressesRelations = relations(emailAddresses, ({ one }) => ({
  user: one(users, { fields: [emailAddresses.userId], references: [users.id] }),
}));

export const phoneNumbersRelations = relations(phoneNumbers, ({ one }) => ({
  user: one(users, { fields: [phoneNumbers.userId], references: [users.id] }),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  address: one(addresses, {
    fields: [profiles.addressId],
    references: [addresses.id],
  }),
  skills: many(profileSkills),
}));

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

export const reelsRelations = relations(reels, ({ one, many }) => ({
  tags: many(reelTags),
  likes: many(likes),
  user: one(users, { fields: [reels.userId], references: [users.id] }),
}));

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const selectEmailAddressSchema = createSelectSchema(emailAddresses);
export const insertEmailAddressSchema = createInsertSchema(emailAddresses);

export const selectPhoneNumberSchema = createSelectSchema(phoneNumbers);
export const insertPhoneNumberSchema = createInsertSchema(phoneNumbers);

export const selectProfileSchema = createSelectSchema(profiles);
export const insertProfileSchema = createInsertSchema(profiles);

export const selectReelSchema = createSelectSchema(reels);
export const insertReelSchema = createInsertSchema(reels);

export const selectLikeSchema = createSelectSchema(likes);
export const insertLikeSchema = createInsertSchema(likes);

export const selectSkillSchema = createSelectSchema(skills);
export const insertSkillSchema = createInsertSchema(skills);

export const selectTagSchema = createSelectSchema(tags);
export const insertTagSchema = createInsertSchema(tags);

export const selectAddressSchema = createSelectSchema(addresses);
export const insertAddressSchema = createInsertSchema(addresses);

export const selectReelTagSchema = createSelectSchema(reelTags);
export const insertReelTagSchema = createInsertSchema(reelTags);

export const selectProfileSkillSchema = createSelectSchema(profileSkills);
export const insertProfileSkillSchema = createInsertSchema(profileSkills);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;

export type EmailAddress = z.infer<typeof selectEmailAddressSchema>;
export type NewEmailAddress = z.infer<typeof insertEmailAddressSchema>;

export type PhoneNumber = z.infer<typeof selectPhoneNumberSchema>;
export type NewPhoneNumber = z.infer<typeof insertPhoneNumberSchema>;

export type Profile = z.infer<typeof selectProfileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;

export type Skill = z.infer<typeof selectSkillSchema>;
export type NewSkill = z.infer<typeof insertSkillSchema>;

export type ProfileSkill = z.infer<typeof selectProfileSkillSchema>;
export type NewProfileSkill = z.infer<typeof insertProfileSkillSchema>;

export type Reel = z.infer<typeof selectReelSchema>;
export type NewReel = z.infer<typeof insertReelSchema>;

export type Tag = z.infer<typeof selectTagSchema>;
export type NewTag = z.infer<typeof insertTagSchema>;

export type ReelTag = z.infer<typeof selectReelTagSchema>;
export type NewReelTag = z.infer<typeof insertReelTagSchema>;

export type Like = z.infer<typeof selectLikeSchema>;
export type NewLike = z.infer<typeof insertLikeSchema>;

export type Address = z.infer<typeof selectAddressSchema>;
export type NewAddress = z.infer<typeof insertAddressSchema>;
