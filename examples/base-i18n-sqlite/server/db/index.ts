import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { resolve } from 'path';

const dbPath = resolve('./data/app.db');

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

export async function initDb() {
  console.log('Database initialized at', dbPath);
}

// Type-safe query helpers
export const queries = {
  posts: {
    all: async () => db.query.posts.findMany({
      with: { author: true }
    }),
    byId: async (id: number) => db.query.posts.findFirst({ 
      where: (t) => t.id === id,
      with: { author: true }
    }),
    bySlug: async (slug: string) => db.query.posts.findFirst({ 
      where: (t) => t.slug === slug,
      with: { author: true }
    }),
    published: async () => db.query.posts.findMany({
      where: (t) => t.published === true,
      with: { author: true }
    }),
  },
  authors: {
    all: async () => db.query.authors.findMany(),
    byId: async (id: number) => db.query.authors.findFirst({ 
      where: (t) => t.id === id 
    }),
  },
};
