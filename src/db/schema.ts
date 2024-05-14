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

  passwordId: uuid('password_id').references((): AnyPgColumn => passwords.id, {
    onDelete: 'set null',
  }),
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
  emailAddress: text('email_address').notNull().unique(),
  verified: boolean('verified').notNull().default(false),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const phoneNumbers = pgTable('phone_numbers', {
  id: uuid('phone_numbers').primaryKey().defaultRandom(),
  phoneNumber: text('phone_numbers').notNull().unique(),
  verified: boolean('verified').notNull().default(false),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const passwords = pgTable('passwords', {
  id: uuid('id').primaryKey().defaultRandom(),
  hash: text('hash').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),

  userId: uuid('user_id')
    .notNull()
    .unique()
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
