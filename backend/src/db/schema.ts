import { pgTable, integer, varchar, timestamp, boolean, text, unique, PgTable, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    resetPasswordToken: text('reset_password_token'),
    resetPasswordExpires: timestamp('reset_password_expires'),
    createdAt: timestamp('created_at').defaultNow(),
  }
);

export const friendRequests = pgTable(
  'friend_requests',
  {
    id: uuid().primaryKey().defaultRandom(),
    senderId: uuid('sender_id').notNull().references(() => users.id),
    receiverId: uuid('receiver_id').notNull().references(() => users.id),
    status: varchar('status', { length: 20 }).notNull().$type<'pending' | 'accepted' | 'rejected'>(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => {
    return {
      senderReceiverUnique: unique('sender_receiver_idx').on(table.senderId, table.receiverId),
    };
  }
);

export const blockedUsers = pgTable(
  'blocked_users',
  {
    id: uuid().primaryKey().defaultRandom(),
    blockerId: uuid('blocker_id').notNull().references(() => users.id),
    blockedId: uuid('blocked_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => {
    return {
      blockerBlockedUnique: unique('blocker_blocked_idx').on(table.blockerId, table.blockedId),
    };
  }
);

export const conversations = pgTable(
  'conversations',
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }),
    type: varchar('type', { length: 10 }).notNull().$type<'private' | 'group'>(),
    photo: varchar('photo', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
  }
);

export const conversationMembers = pgTable(
  'conversation_members',
  {
    id: uuid().primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id),
    userId: uuid('user_id').notNull().references(() => users.id),
    isAdmin: boolean('is_admin').default(false),
    joinedAt: timestamp('joined_at').defaultNow(),
  },
  (table) => {
    return {
      conversationUserUnique: unique('conversation_user_idx').on(table.conversationId, table.userId),
    };
  }
);

export const messages = pgTable(
  'messages',
  {
    id: uuid().primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id),
    senderId: uuid('sender_id').notNull().references(() => users.id),
    contentType: varchar('content_type', { length: 10 }).notNull().$type<'text' | 'file' | 'image' | 'voice'>(),
    content: text('content'),
    filePath: varchar('file_path', { length: 255 }),
    fileName: varchar('file_name', { length: 255 }),
    fileSize: integer('file_size'),
    duration: integer('duration'),
    createdAt: timestamp('created_at').defaultNow(),
  }
);
export const refreshTokens = pgTable('refresh_tokens', {
    token: varchar('token', { length: 255 }).primaryKey(),
  });