# Supabase Setup Guide

Managed Postgres database with built-in authentication, real-time, and hosting.

## Prerequisites

- Node.js 18+
- npm or yarn
- Free Supabase account (https://supabase.com)

## Quick Start

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Sign Up"
3. Choose your organization and region
4. Set a strong database password
5. Wait for project to deploy (2-3 minutes)

### 2. Copy API Keys

In Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy your **Project URL** (e.g., `https://YOUR_PROJECT.supabase.co`)
3. Copy your **anon public key**

### 3. Add Environment Variables

Create `.env.local` in your project root:

```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

**Never commit `.env.local` to git** — add to `.gitignore` (already done).

### 4. Create Database Tables

In Supabase dashboard:

1. Go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `/sql/schema.sql` from your generated project
4. Paste into the SQL editor
5. Click **Run**

This creates:
- `users` table (linked to auth)
- `posts` table
- `tags` table
- `comments` table
- Row-level security policies

### 5. Enable Authentication

1. Go to **Authentication** → **Providers**
2. Click **Email** (should be enabled by default)
3. Click the toggle to enable

Supabase now allows users to sign in with magic links (email-based).

### 6. Install Dependencies

```bash
npm install
```

### 7. Start Dev Server

```bash
npm run dev
```

Open http://localhost:3000 and test:

1. **Login page:** Try signing in with your email
2. **Check your email:** Supabase sends a magic link
3. **Click the link:** You're logged in!

---

## Magic Link Authentication

### How It Works

1. User enters email at `/AuthStatus.vue`
2. Supabase sends an email with a magic link
3. User clicks link → authenticated
4. User info stored in Pinia store (`/stores/auth.ts`)

### Login API Route

`/server/api/auth/login.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getHeader(event, 'origin')}/auth/callback`,
    },
  });
  
  if (error) throw createError({ statusCode: 400, message: error.message });
  return { message: 'Check your email for the login link' };
});
```

### Logout API Route

`/server/api/auth/logout.ts`:

```typescript
export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '');
  
  if (!token) throw createError({ statusCode: 401 });
  
  const { error } = await supabase.auth.signOut({ jwt: token });
  if (error) throw createError({ statusCode: 400, message: error.message });
});
```

### Custom Auth Flow

Want password auth instead? Modify `/server/api/auth/login.ts`:

```typescript
// Instead of OTP:
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

See [Supabase Auth Docs](https://supabase.com/docs/guides/auth) for all options.

---

## Row-Level Security (RLS)

Your generated schema includes RLS policies that:

- ✅ Allow anyone to read published posts
- ✅ Allow users to edit only their own posts
- ✅ Allow users to create comments on published posts
- ✅ Prevent unauthorized data access

### How RLS Works

RLS intercepts every database query and enforces policies based on the logged-in user:

```sql
-- Only show published posts OR posts by current user
SELECT * FROM posts 
WHERE published = true OR author_id = auth.uid();
```

### Add Custom RLS Policy

In Supabase SQL Editor:

```sql
CREATE POLICY "Users can see their own drafts"
ON posts
FOR SELECT
USING (author_id = auth.uid() OR published = true);
```

---

## Working with Your Database

### Query with Supabase Client

In API routes or server utilities:

```typescript
import { supabase } from '~/server/utils/supabase';

// Read
const { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true);

// Create
const { data: newPost, error } = await supabase
  .from('posts')
  .insert({
    title: 'My Post',
    content: 'Content here',
    author_id: userId,
    published: false,
  })
  .select();

// Update
const { data: updated, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId);

// Delete
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
```

### Real-Time Subscriptions (Optional)

Subscribe to live database changes:

```typescript
supabase
  .channel('posts')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New update!', payload.eventType, payload.new);
    }
  )
  .subscribe();
```

This is perfect for live comments, notifications, collaborative editing, etc.

---

## File Structure

```
your-project/
├── server/
│   ├── utils/
│   │   └── supabase.ts        # Supabase client setup
│   └── api/
│       ├── posts.ts            # CRUD endpoints
│       └── auth/
│           ├── login.ts        # Magic link login
│           └── logout.ts       # Logout
├── stores/
│   └── auth.ts                 # Pinia auth store
├── components/
│   └── AuthStatus.vue          # Login/logout UI
├── sql/
│   └── schema.sql              # Database schema (copy to Supabase)
├── .env.local                  # API keys (never commit!)
└── package.json
```

---

## Free Tier Limits

Supabase's free tier includes:

| Feature | Limit |
|---------|-------|
| Database | 500 MB |
| Storage | 2 GB |
| Concurrent users | 50,000 |
| API calls | Unlimited |
| Auth users | Unlimited |
| Real-time connections | Unlimited |

**Perfect for side projects and prototypes.**

Upgrade anytime to the paid plan ($25/mo) for more resources.

---

## npm Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run test             # Run tests
npm run lint             # ESLint check
npm run lint:fix         # Fix ESLint issues
```

---

## Common Tasks

### Add a New Table

1. Go to Supabase SQL Editor
2. Create the table:

```sql
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content text NOT NULL,
  post_id uuid NOT NULL REFERENCES posts(id),
  author_id uuid NOT NULL REFERENCES users(id),
  created_at timestamp DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
ON comments FOR SELECT USING (true);

CREATE POLICY "Users can create comments"
ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
```

### Generate TypeScript Types

Make your Supabase queries fully typed:

```bash
npm install -D supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts
```

Then use in your code:

```typescript
import type { Database } from '~/types/supabase';

const { data: posts } = await supabase
  .from('posts')
  .select('*') as unknown as { data: Database['public']['Tables']['posts']['Row'][] };
```

### Enable Real-Time

In Supabase dashboard → Replication:

1. Click the table you want to track (e.g., `posts`)
2. Toggle the "Realtime" switch
3. Now you can subscribe to changes

---

## Deployment

### Vercel, Netlify, Render, etc.

1. Add environment variables to your hosting platform:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

2. Deploy normally with `npm run build`

Supabase handles the backend, so your Nuxt app is purely frontend/API.

### Environment Variables

For production, use your platform's secrets management (not `.env.local`):

- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Build & Deploy → Environment
- **GitHub Actions:** Secrets & variables

---

## Troubleshooting

### "Can't connect to Supabase"

Check:
1. API keys are correct in `.env.local`
2. Project is deployed (green checkmark in dashboard)
3. Network request is hitting `https://YOUR_PROJECT.supabase.co`

### "RLS policy violation"

Means the user doesn't have permission for that action. Check:
1. User is logged in (has `auth.uid()`)
2. Policy allows the action (e.g., `author_id = auth.uid()`)
3. Adjust RLS policy if needed

### "JWT expired"

Auth tokens expire after 1 hour. Supabase automatically refreshes them. If issues persist:
1. Clear browser cache
2. Clear `.env.local` and re-add keys
3. Create a new session

### "Magic link not working"

1. Check email spam folder
2. Verify email is correct
3. In Supabase dashboard → Authentication → Providers → Email:
   - Check "Enable email OTP" is toggled
   - Verify email template hasn't been misconfigured

---

## Next Steps

- Review the example API routes in `/server/api/posts.ts`
- Check the auth store in `/stores/auth.ts`
- Explore Supabase docs: https://supabase.com/docs
- Enable real-time features for live updates
- Try adding a second table and querying with joins

---

## SQLite to Supabase Migration

Already built with SQLite and want to switch to Supabase?

1. Copy your Drizzle schema to SQL (similar structure)
2. Create tables in Supabase SQL Editor
3. Change connection from SQLite → Supabase client
4. Code remains largely the same (both use SQL query patterns)

Or contact Supabase support — they can help migrate data.
