---
name: claude-nuxt-fullstack-scaffold
description: 'Create a production-ready Nuxt 3 project with Tailwind CSS, Vitest, ESLint, i18n, and optional local SQLite database. Use this skill whenever the user wants to scaffold a new Nuxt application with these tools pre-configured, avoiding manual setup of build tools, type safety, and database layers. Triggers include: "scaffold a Nuxt project," "new Nuxt app," "setup Nuxt + Tailwind," "create a Nuxt dashboard/tool," or any request to build a full-stack Nuxt application. Always offer optional i18n and database setup.'
---

# Nuxt Fullstack Scaffold

A skill for scaffolding production-ready Nuxt 3 applications with sensible defaults and optional layers.

## Overview

This skill generates a complete project structure for:
- **Nuxt 3** with SSR/API routes (always included)
- **Tailwind CSS** (pre-configured with typography, forms; always included)
- **Vitest** + testing utilities (always included)
- **ESLint + Prettier** (configured for Nuxt; always included)
- **Optional i18n:** Multi-locale support with route prefixes and language switcher
- **Optional Database:** Choose your own:
  - **SQLite + Drizzle** (local, zero-config, perfect for dev/small projects)
  - **Supabase** (managed Postgres, auth, real-time, hosted)
  - **None** (API-only or headless CMS)

## Usage

When the user asks to scaffold a Nuxt project, follow this flow:

### 1. Gather Project Details

Ask for:
- **Project name** (kebab-case, e.g., `ai-dashboard`)
- **Add i18n?** (yes/no — default: no)
  - If yes: which locales? (default: `en`, `es`)
- **Add database?** (yes/no — default: no)
  - If yes: Which type?
    - `sqlite` → SQLite + Drizzle (local, no setup, `.db` file)
    - `supabase` → Managed Postgres + Auth + Real-time
    - `none` → Skip database layer
  - If not none: schema hints (optional; can be added later)

### 2. Confirm Feature Set

Display a summary of what will be generated:
```
Project: my-app
├── Base Stack: Nuxt 3 + Tailwind + Vitest + ESLint
├── i18n: YES (en, es)
├── Database: SQLite + Drizzle
└── Ready for: GitHub + local development
```

### 3. Generate Scaffolding

Use the scaffolding prompts below. Generate:
- Directory structure (tree format)
- All config files (`nuxt.config.ts`, `tailwind.config.ts`, `vitest.config.ts`, `.eslintrc`, `i18n.config.ts`, etc.)
- Example files (API route, component, test, DB schema)
- `package.json` with deps + scripts
- Setup instructions

---

## Scaffolding Prompts

### Prompt A: Base Project Structure (Always Generate)

```
Generate a Nuxt 3 fullstack project structure with:
- Tailwind CSS (pre-configured)
- Vitest + @vue/test-utils
- ESLint + Prettier (Nuxt preset)
- TypeScript
- Server API routes under /server/api

Output format:
1. Directory tree
2. package.json (deps + scripts)
3. nuxt.config.ts
4. tailwind.config.ts
5. vitest.config.ts
6. .eslintrc.cjs
7. Example: /app.vue, /pages/index.vue, /server/api/health.ts, /tests/components/HelloWorld.test.ts
```

### Prompt B: i18n Setup (If User Opts In)

```
Add Nuxt i18n integration to the project above:
- Use nuxt-i18n v8
- Route-based localization (prefix strategy): /en/*, /es/*
- Locale switcher component (/components/LocaleSwitcher.vue)
- Translation files in /locales/en.json, /locales/es.json
- Middleware for default locale handling

Output:
1. i18n.config.ts (configuration file)
2. /nuxt.config.ts (updated with i18n module)
3. /components/LocaleSwitcher.vue (example)
4. /locales/en.json and /locales/es.json (example translations)
5. /middleware/i18n.ts (optional; auto-routing)
```

### Prompt C: SQLite + Drizzle Setup (If User Selects SQLite)

```
Add SQLite + Drizzle ORM to the Nuxt project:
- Database file: /data/app.db (gitignored)
- Drizzle schema in /server/db/schema.ts
- Drizzle migrations folder: /server/db/migrations
- Server utility: /server/db/index.ts (db connection)
- Example API route: /server/api/posts.ts (CRUD endpoints)
- Drizzle studio integration for local inspection

Output:
1. Updated package.json (add better-sqlite3, drizzle-orm, drizzle-kit)
2. /drizzle.config.ts (migration config)
3. /server/db/schema.ts (example: posts table)
4. /server/db/index.ts (connection setup + helper)
5. /server/db/seed.ts (optional seed script)
6. /server/api/posts.ts (example GET, POST, PUT, DELETE)
7. /tests/server/api/posts.test.ts (example API tests)
8. Setup instructions: npm run db:push, npm run db:seed
9. .gitignore (add /data/app.db)
```

### Prompt D: Supabase Setup (If User Selects Supabase)

```
Add Supabase (managed Postgres + Auth) to the Nuxt project:
- Supabase client setup in /server/utils/supabase.ts
- Example tables defined (posts, users) via SQL schema
- Environment variables: SUPABASE_URL, SUPABASE_ANON_KEY
- Example API routes using Supabase SDK
- Auth helper component: /components/AuthStatus.vue
- Example: Magic link login + user profile

Output:
1. Updated package.json (add @supabase/supabase-js)
2. .env.example (with SUPABASE_URL, SUPABASE_ANON_KEY)
3. /server/utils/supabase.ts (Supabase client + RLS helpers)
4. /server/api/posts.ts (example GET, POST using Supabase)
5. /server/api/auth/login.ts (magic link auth)
6. /server/api/auth/logout.ts
7. /components/AuthStatus.vue (display user, logout button)
8. /stores/auth.ts (Pinia store for auth state)
9. SQL schema file (copy-paste into Supabase dashboard)
10. Setup instructions: Create Supabase project, copy keys to .env, run SQL schema
11. Links to Supabase dashboard, RLS docs
```

---

## Feature Decision Tree

```
User wants new Nuxt project
│
├── BASE STACK (always generated)
│   ├── Nuxt 3 + TypeScript
│   ├── Tailwind CSS
│   ├── Vitest + Vue Test Utils
│   ├── ESLint + Prettier
│   └── example components, pages, tests
│
├── i18n? (optional)
│   ├── YES → Add locale structure, switcher, route prefixes
│   └── NO  → Skip (easily added later)
│
└── Database? (optional)
    ├── NONE → Skip database layer entirely
    ├── SQLite → Local file-based DB with Drizzle ORM
    │   ├── Schema file
    │   ├── Drizzle migrations
    │   ├── API routes (CRUD)
    │   └── Seed script
    ├── Supabase → Managed Postgres + Auth + Real-time
    │   ├── .env setup for API key
    │   ├── Supabase client wrapper
    │   ├── Example tables (posts, users)
    │   ├── API routes using Supabase SDK
    │   └── Auth integration (email/magic link)
    └── DOC → How to add database later (link to guides)
```

---

## Generated File Checklist

After scaffolding, provide the user a checklist based on chosen features:

**Always:**
- [ ] Run `npm install`
- [ ] Run `npm run dev` to start dev server (localhost:3000)
- [ ] Run `npm run test` to verify tests pass
- [ ] Customize `/app.vue` and `/pages/index.vue` for your app

**If i18n enabled:**
- [ ] Add translations to `/locales/*.json`
- [ ] Test locale switching with `/LocaleSwitcher.vue` component
- [ ] Verify routes work: `/en/page`, `/es/page`

**If SQLite enabled:**
- [ ] Run `npm run db:push` to create tables from schema
- [ ] Run `npm run db:seed` to populate example data (optional)
- [ ] Review schema in `/server/db/schema.ts` and modify as needed
- [ ] Test API endpoints: `GET /api/posts`, `POST /api/posts`, etc.

**If Supabase enabled:**
- [ ] Create a free Supabase project at https://supabase.com
- [ ] Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` to `.env.local`
- [ ] Paste the SQL schema into Supabase SQL editor and run
- [ ] Enable RLS policies (Supabase dashboard → Authentication)
- [ ] Test auth flow: login with email, check `/AuthStatus.vue` component
- [ ] Test API endpoints: `GET /api/posts`, `POST /api/posts`, etc.

---

## Example Outputs

### Minimal (Base Only)

For a user who just wants base Nuxt + Tailwind:
```
nuxt-app/
├── app.vue
├── nuxt.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── .eslintrc.cjs
├── package.json
├── tsconfig.json
├── pages/
│   └── index.vue
├── components/
│   └── HelloWorld.vue
├── server/
│   └── api/
│       └── health.ts
├── tests/
│   └── components/
│       └── HelloWorld.test.ts
└── .gitignore
```

### Base + i18n Only

Adds:
```
├── i18n.config.ts
├── locales/
│   ├── en.json
│   └── es.json
└── components/
    └── LocaleSwitcher.vue
```

### Base + SQLite + i18n

Adds:
```
├── i18n.config.ts
├── drizzle.config.ts
├── locales/
│   ├── en.json
│   └── es.json
├── components/
│   └── LocaleSwitcher.vue
├── server/
│   ├── db/
│   │   ├── schema.ts
│   │   ├── index.ts
│   │   ├── seed.ts
│   │   └── migrations/
│   └── api/
│       ├── health.ts
│       └── posts.ts
├── tests/
│   └── server/
│       └── api/
│           └── posts.test.ts
└── data/
    └── app.db (gitignored)
```

### Base + Supabase + i18n

Adds:
```
├── i18n.config.ts
├── .env.example (SUPABASE_URL, SUPABASE_ANON_KEY)
├── locales/
│   ├── en.json
│   └── es.json
├── components/
│   ├── LocaleSwitcher.vue
│   └── AuthStatus.vue
├── stores/
│   └── auth.ts (Pinia)
├── server/
│   ├── utils/
│   │   └── supabase.ts
│   └── api/
│       ├── health.ts
│       ├── posts.ts
│       └── auth/
│           ├── login.ts
│           └── logout.ts
├── sql/
│   └── schema.sql (copy to Supabase dashboard)
└── tests/
    └── server/
        └── api/
            └── posts.test.ts
```

---

## Output Format

When the user confirms their choices, generate a **single artifact** containing:

1. **Directory structure** (tree format, showing all files)
2. **package.json** (full, ready to copy)
3. **Config files** (nuxt.config.ts, tailwind.config.ts, vitest.config.ts, .eslintrc.cjs, etc.)
4. **Example components & pages** (with TypeScript + Tailwind)
5. **Example API routes** (with types)
6. **Example tests** (Vitest + Vue Test Utils)
7. **(If i18n)** i18n config + LocaleSwitcher component + translation files
8. **(If DB)** Database schema, API routes (CRUD), seed script
9. **Setup instructions** (step-by-step from npm install to first run)

Suggest placing all generated code in a single downloadable file or GitHub gist so the user can quickly bootstrap locally.

---

## GitHub Publication

After scaffolding, suggest publishing as:
- **Repo name:** `nuxt-fullstack-scaffold` or `gino-nuxt-template`
- **README.md:** Document the stack, quick-start, optional features
- **GitHub Template:** Enable "template repository" flag for easy `Use this template` button
- **License:** MIT (suggested)

Example GH structure:
```
gino-nuxt-template/
├── README.md (quick start guide)
├── FEATURES.md (optional i18n, DB setup)
├── package.json (base + all optional deps)
├── [all other config files]
└── src/ (example project)
```

---

## Notes

### General
- **Vitest configuration** uses `@vitest/ui` for test dashboard (optional but recommended)
- **TypeScript:** Strict mode enabled by default; all examples are fully typed
- **Tailwind:** Form plugin + typography plugin pre-configured
- **Both i18n and database are truly optional** — users can scaffold just the base stack and add them later

### i18n (Optional)
- **Route prefixes:** `/en/page`, `/es/page` (default locale can be customized)
- **Easy to add later** via `npm install @nuxtjs/i18n` + simple config merge

### SQLite (Optional Database)
- **Drizzle Kit** handles migrations; users run `npm run db:push` to apply schema
- **SQLite file** stored in `/data/app.db` (added to `.gitignore`)
- **Drizzle Studio** provides local inspection GUI
- **No external setup** — works out of the box

### Supabase (Optional Database)
- **Managed Postgres** — no local setup, hosted by Supabase
- **Free tier** includes 500MB database, sufficient for most side projects
- **Auth included** — users can add email/magic link auth without extra code
- **Real-time** — optional feature available in Supabase console
- **Row-level security (RLS)** — must be enabled in Supabase dashboard for auth to work
- **Environment variables** in `.env.local` (never commit to repo)
