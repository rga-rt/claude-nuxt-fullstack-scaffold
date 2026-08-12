# Feature Breakdown

This document explains what each optional feature adds to your generated project.

---

## Base Stack (Always Included)

Every project you scaffold gets these fundamentals:

### Nuxt 3 + TypeScript
- SSR-ready
- API routes in `/server/api`
- Strict TypeScript mode

### Tailwind CSS
- Pre-configured with form plugin + typography
- Example component using Tailwind
- Dark mode support

### Vitest
- Unit + component testing
- @vue/test-utils pre-configured
- Example tests included
- Optional UI dashboard (`npm run test:ui`)

### ESLint + Prettier
- Nuxt-specific rules
- Vue 3 best practices
- Auto-fixable formatting

**Files generated:**
```
├── nuxt.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── .eslintrc.cjs
├── tailwind.config.ts
├── package.json (with scripts)
├── tsconfig.json
└── [example components, pages, tests]
```

---

## Optional: i18n (Multi-Language Support)

Add this if you want your app in multiple languages.

### What It Adds

1. **Route Prefixes**
   - English: `/en/page`
   - Spanish: `/es/page`
   - Set default locale (e.g., `/page` redirects to `/en/page`)

2. **Translation Files**
   - `/locales/en.json` — English translations
   - `/locales/es.json` — Spanish translations
   - Easy to add more languages

3. **Locale Switcher Component**
   - `/components/LocaleSwitcher.vue`
   - Buttons to switch between languages
   - Sticky on page (stays in navbar/header)

4. **Configuration**
   - `i18n.config.ts` — Central i18n setup
   - `nuxt.config.ts` — Updated with i18n module

### Usage

```vue
<template>
  <div>
    <!-- Automatically uses current locale -->
    <h1>{{ $t('hero.title') }}</h1>
    
    <!-- Switch locale -->
    <LocaleSwitcher />
  </div>
</template>
```

### Add New Locales Later

Edit `i18n.config.ts`:
```typescript
locales: [
  { code: 'en', file: 'en.json' },
  { code: 'es', file: 'es.json' },
  { code: 'fr', file: 'fr.json' },  // Add French
]
```

Then create `/locales/fr.json`.

### npm Scripts
- `npm run dev` — Dev server (all locales work)
- `npm run build` — Build (all locales pre-rendered)

---

## Optional: Database (Choose One)

### None (Skip Database)

Just want a headless API or CMS-powered site? Start without a database.

**Add database later:**
- SQLite: Run skill again or follow `/docs/sqlite-setup.md`
- Supabase: Run skill again or follow `/docs/supabase-setup.md`

---

### SQLite (Local File-Based Database)

**Best for:**
- Development
- Solo projects
- Learning Drizzle ORM
- Prototypes
- No external dependencies

### What It Adds

1. **Database File**
   - `/data/app.db` — SQLite database (gitignored)
   - Zero setup, works offline

2. **Drizzle ORM**
   - Type-safe queries
   - Schema-first approach
   - `/server/db/schema.ts` — Define tables here

3. **Example Schema** (included)
   - `posts` table with title, content, author
   - `authors` table
   - `tags` table + post-tags junction
   - `comments` table

4. **API Routes**
   - `/server/api/posts.ts` — CRUD endpoints
   - Example: GET `/api/posts`, POST `/api/posts`, etc.

5. **Migrations**
   - `drizzle.config.ts` — Migration setup
   - `npm run db:push` — Apply schema changes
   - Drizzle handles schema versioning

6. **Seed Script**
   - `/server/db/seed.ts` — Populate example data
   - `npm run db:seed` — Run seed

7. **Local Inspector**
   - `npm run db:studio` — Open Drizzle Studio (GUI)

### Usage

**Define tables:**
```typescript
// server/db/schema.ts
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
});
```

**Query type-safely:**
```typescript
// server/api/posts.ts
const posts = await db.query.posts.findMany();
```

### npm Scripts
- `npm run db:push` — Apply schema to database
- `npm run db:studio` — Open Drizzle Studio
- `npm run db:seed` — Populate example data
- `npm run dev` — Dev server

### Upgrade to Postgres Later

If you outgrow SQLite, switch to Supabase (same Drizzle syntax, swap credentials).

---

### Supabase (Managed Postgres + Auth + Real-time)

**Best for:**
- Production apps
- Team collaboration
- Built-in authentication
- Real-time features
- Scalability

### What It Adds

1. **Supabase Client**
   - `/server/utils/supabase.ts` — Configured client
   - Environment variables for API key/URL

2. **Authentication**
   - Magic link login (email only, no passwords)
   - `/server/api/auth/login.ts` — Send magic link
   - `/server/api/auth/logout.ts` — Sign out
   - `/components/AuthStatus.vue` — Login UI
   - `/stores/auth.ts` — Pinia auth store

3. **Database Tables** (same as SQLite example)
   - `posts`, `authors`, `tags`, `comments`
   - But now in managed Postgres on Supabase

4. **Row-Level Security (RLS)**
   - Policies included in SQL schema
   - Users can read published posts
   - Users can edit their own posts
   - Built-in privacy

5. **Example API Routes**
   - `/server/api/posts.ts` — CRUD with auth checks
   - Type-safe with @supabase/supabase-js

6. **Setup File**
   - `/sql/schema.sql` — Copy-paste into Supabase dashboard
   - No migration tool needed

### Usage

**Create account:**
```bash
1. Go to https://supabase.com
2. Sign up (free)
3. Create project (2-3 min setup)
4. Copy SUPABASE_URL and SUPABASE_ANON_KEY to .env.local
```

**Query with auth:**
```typescript
// server/api/posts.ts
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true);
```

**Use auth in components:**
```vue
<template>
  <div v-if="user">
    <p>Signed in as {{ user.email }}</p>
  </div>
</template>

<script setup>
const authStore = useAuth();
const user = computed(() => authStore.user);
</script>
```

### Free Tier Limits
- 500MB database space
- 2GB file storage
- 50k concurrent users (more than enough for side projects)
- Unlimited API calls

### npm Scripts
- `npm run dev` — Dev server
- (No db scripts needed — Supabase handles it)

### Real-Time Features (Optional)
Supabase includes real-time subscriptions. Enable in Supabase dashboard:
```typescript
supabase
  .channel('posts')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change detected!', payload)
  )
  .subscribe();
```

---

## Comparison Table

| Feature | Base | + i18n | + SQLite | + Supabase |
|---------|------|--------|----------|-----------|
| Nuxt 3 | ✅ | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ |
| Vitest | ✅ | ✅ | ✅ | ✅ |
| ESLint | ✅ | ✅ | ✅ | ✅ |
| Multi-language | ❌ | ✅ | ✅ | ✅ |
| Database | ❌ | ❌ | ✅ (local) | ✅ (cloud) |
| Authentication | ❌ | ❌ | Manual | Built-in |
| Real-time | ❌ | ❌ | ❌ | ✅ |
| Setup time | 1 min | 2 min | 3 min | 5 min |
| Cost | Free | Free | Free | Free tier (generous) |

---

## Recommended Combinations

### Starter Blog
- Base + i18n + SQLite
- Posts and comments
- Multi-language support
- No auth complexity

### SaaS Application
- Base + i18n + Supabase
- User authentication
- Real-time features
- Scalable to production

### Content Site
- Base + i18n
- No database (static or headless CMS)
- Focus on content, not complexity

### Dashboard (Internal Tool)
- Base + SQLite
- One language, one timezone
- Simple local database
- Built with Nuxt for speed

---

## Mixing Features

You can combine **any** of these:
- Base only ✅
- Base + i18n ✅
- Base + SQLite ✅
- Base + Supabase ✅
- Base + i18n + SQLite ✅
- Base + i18n + Supabase ✅

The skill will scaffold whichever combination you choose, with proper integration between layers.

---

## Remove or Upgrade Features Later

All features are **optional and removable:**

**Remove i18n:** Delete `i18n.config.ts`, remove from `nuxt.config.ts`, delete `locales/` folder
**Add SQLite:** Use skill again, or follow `docs/sqlite-setup.md` manually
**Upgrade SQLite to Supabase:** Same Drizzle schema, just change connection string
**Remove database:** Delete `/server/db`, update `nuxt.config.ts`

Nothing is "locked in" — you're always in control.
