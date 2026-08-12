# SQLite Setup Guide

Local file-based database using Drizzle ORM.

## Prerequisites

- Node.js 18+
- npm or yarn

No additional setup needed — SQLite is bundled with `better-sqlite3`.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Database

```bash
npm run db:push
```

This creates `/data/app.db` and applies the schema from `/server/db/schema.ts`.

### 3. Seed Example Data (Optional)

```bash
npm run db:seed
```

Populates the database with example posts, authors, and tags.

### 4. Start Dev Server

```bash
npm run dev
```

Open http://localhost:3000 and test the API:

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get single post
curl http://localhost:3000/api/posts?id=1

# Create a post (POST /api/posts with body)
```

---

## Working with the Database

### Inspect Your Database

Open the Drizzle Studio GUI:

```bash
npm run db:studio
```

This opens a web interface where you can:
- Browse tables
- View/edit data
- Run SQL queries
- See indexes and relationships

### Define Your Schema

Edit `/server/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const myTable = sqliteTable('my_table', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique(),
});
```

Then apply the schema:

```bash
npm run db:push
```

### Query Data

In your API routes or server utilities:

```typescript
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

// Read
const allPosts = await db.query.posts.findMany();
const post = await db.query.posts.findFirst({ 
  where: (t) => t.id === 1 
});

// Create
await db.insert(posts).values({
  title: 'New Post',
  content: 'Content here',
  authorId: 1,
});

// Update
await db.update(posts).set({ title: 'Updated' }).where(eq(posts.id, 1));

// Delete
await db.delete(posts).where(eq(posts.id, 1));
```

### TypeScript Safety

Drizzle generates types from your schema:

```typescript
import type { Post, NewPost } from '~/server/db/schema';

const newPost: NewPost = {
  title: 'My Post',
  content: '...',
  authorId: 1,
};

const savedPost: Post = await db.insert(posts).values(newPost).returning().then(r => r[0]);
```

---

## npm Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run db:push         # Apply schema changes
npm run db:studio       # Open Drizzle Studio GUI
npm run db:seed         # Populate example data
npm run db:migrate      # Run migrations (rarely needed)
npm run test            # Run tests
npm run lint            # ESLint check
npm run lint:fix        # Fix ESLint issues
```

---

## File Structure

```
your-project/
├── server/
│   ├── db/
│   │   ├── schema.ts          # Table definitions
│   │   ├── index.ts           # Database connection
│   │   ├── seed.ts            # Example seed script
│   │   └── migrations/        # (auto-generated)
│   └── api/
│       └── posts.ts           # Example CRUD routes
├── data/
│   └── app.db                 # SQLite database file (.gitignored)
├── drizzle.config.ts          # Drizzle config
└── package.json
```

---

## Common Tasks

### Add a New Table

1. Edit `/server/db/schema.ts`:

```typescript
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  postId: integer('post_id').notNull(),
});
```

2. Apply the schema:

```bash
npm run db:push
```

### Add a Column

1. Edit the table in `/server/db/schema.ts`:

```typescript
export const posts = sqliteTable('posts', {
  // ...existing columns
  tags: text('tags'), // New column
});
```

2. Apply the change:

```bash
npm run db:push
```

### Query with Relationships

```typescript
const postsWithAuthors = await db.query.posts.findMany({
  with: {
    author: true, // Include author data
  },
});
```

---

## Production Deployment

### Important Notes

1. **SQLite is single-file** — all data is in `app.db`
2. **Not ideal for concurrent writes** — consider Supabase/Postgres if you have multiple users
3. **Must be readable/writable** on your server

### For Serverless (Vercel, Netlify, etc.)

SQLite works on serverless platforms, but data won't persist between deployments (as the `/data` folder is ephemeral).

**Solution:** Use Supabase instead (managed cloud database).

### For Self-Hosted (VPS)

SQLite works great on VPS. Just make sure `/data/app.db` is:
1. Readable/writable by the Node process
2. Included in your backup strategy
3. Not stored on ephemeral storage

---

## Troubleshooting

### "Cannot find module 'better-sqlite3'"

```bash
npm install
npm rebuild better-sqlite3
```

### "Database is locked"

Means two processes are writing at once. Not common, but reduce with:

```typescript
sqlite.pragma('journal_mode = WAL');
```

(This is already in the generated `server/db/index.ts`)

### "Schema out of sync"

```bash
npm run db:push
```

This compares your schema file with the actual database and applies changes.

---

## Next Steps

- Review the example API routes in `/server/api/posts.ts`
- Check the test examples in `/tests/server/api/`
- Explore Drizzle docs: https://orm.drizzle.team

Need to add auth? Consider Supabase instead (it has built-in auth). Or implement custom middleware.
