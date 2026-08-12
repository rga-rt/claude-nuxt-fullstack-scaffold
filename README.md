# Claude Nuxt Fullstack Scaffold

[![CI](https://github.com/rga-rt/claude-nuxt-fullstack-scaffold/actions/workflows/ci.yml/badge.svg)](https://github.com/rga-rt/claude-nuxt-fullstack-scaffold/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![Claude Skill](https://img.shields.io/badge/Claude-Skill-D97757?logo=anthropic&logoColor=white)](https://claude.ai)

A Claude skill for quickly scaffolding production-ready Nuxt 3 applications with **optional** i18n, SQLite, or Supabase database integration.

## 🚀 Quick Start

### Install in Claude Code (plugin marketplace)

```bash
# 1. Add this repo as a plugin marketplace
/plugin marketplace add rga-rt/claude-nuxt-fullstack-scaffold

# 2. Install the plugin
/plugin install nuxt-fullstack-scaffold@claude-nuxt-scaffold
```

Then prompt: **"Scaffold a new Nuxt project"**. Update later with `/plugin marketplace update claude-nuxt-scaffold`.

### Install in Claude Desktop or claude.ai

1. Clone or download this repository
2. Copy `skills/nuxt-fullstack-scaffold/SKILL.md` to your Claude skills directory
3. Enable the skill in Claude
4. Prompt: **"Scaffold a new Nuxt project"**

### What Gets Generated

When you use this skill, Claude will:

1. **Ask you** about your project needs:
   - Project name
   - Want i18n? (yes/no)
   - Want a database? (none / SQLite / Supabase)

2. **Generate** a complete Nuxt 3 project with:
   - ✅ Nuxt 3 + TypeScript
   - ✅ Tailwind CSS (pre-configured)
   - ✅ Vitest + testing utilities
   - ✅ ESLint + Prettier
   - ✅ (Optional) i18n with route prefixes + locale switcher
   - ✅ (Optional) SQLite + Drizzle ORM for local DB
   - ✅ (Optional) Supabase for managed Postgres + Auth

3. **Provide** setup instructions you can follow locally

---

## 📦 What's Included

- **skills/nuxt-fullstack-scaffold/SKILL.md** — The skill definition (use in Claude)
- **.claude-plugin/** — Claude Code plugin + marketplace manifests
- **examples/** — Example project structures for different configs
- **docs/** — Setup guides for optional features
- **LICENSE** — MIT

---

## 💡 Usage Examples

### Example 1: Base Stack Only
```
User: Scaffold a new Nuxt project called my-app

Claude will generate:
→ Nuxt 3 + Tailwind + Vitest + ESLint
→ Ready to run npm install && npm run dev
```

### Example 2: Base + i18n + SQLite
```
User: Scaffold a blog with English and Spanish, plus a local database

Claude will generate:
→ Nuxt 3 + Tailwind + Vitest + ESLint
→ i18n with /en/* and /es/* routes
→ SQLite + Drizzle with posts, authors, tags tables
→ Example API routes (CRUD)
→ Seed script for demo data
```

### Example 3: Base + i18n + Supabase
```
User: Scaffold a SaaS app with Supabase and multi-language support

Claude will generate:
→ Nuxt 3 + Tailwind + Vitest + ESLint
→ i18n configured
→ Supabase client setup + RLS policies
→ Magic link authentication
→ Example posts + comments tables
→ Auth components (login, logout, user status)
```

---

## 🗂️ Project Structure

Each generated project follows this structure:

```
my-app/
├── app.vue
├── nuxt.config.ts          # Nuxt config (includes i18n if enabled)
├── tailwind.config.ts       # Tailwind config
├── vitest.config.ts         # Vitest config
├── .eslintrc.cjs            # ESLint config
├── drizzle.config.ts        # (SQLite only)
├── i18n.config.ts           # (i18n only)
├── package.json
├── tsconfig.json
├── pages/
│   └── index.vue
├── components/
│   ├── HelloWorld.vue
│   └── LocaleSwitcher.vue   # (i18n only)
├── server/
│   ├── api/
│   │   ├── health.ts
│   │   ├── posts.ts         # (Database only)
│   │   └── auth/
│   │       ├── login.ts     # (Supabase only)
│   │       └── logout.ts    # (Supabase only)
│   ├── db/
│   │   ├── schema.ts        # (SQLite only)
│   │   ├── index.ts         # (SQLite only)
│   │   └── seed.ts          # (SQLite only)
│   └── utils/
│       └── supabase.ts      # (Supabase only)
├── locales/
│   ├── en.json              # (i18n only)
│   └── es.json              # (i18n only)
├── stores/
│   └── auth.ts              # (Supabase only)
├── tests/
│   ├── components/
│   │   └── HelloWorld.test.ts
│   └── server/
│       └── api/
│           └── posts.test.ts # (Database only)
├── data/
│   └── app.db               # (SQLite only, gitignored)
└── .gitignore
```

---

## 🚀 Next Steps After Generation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database (if enabled)

**SQLite:**
```bash
npm run db:push
npm run db:seed  # optional
npm run dev
```

**Supabase:**
```bash
# 1. Create free account at https://supabase.com
# 2. Copy SUPABASE_URL and SUPABASE_ANON_KEY to .env.local
# 3. Copy SQL schema into Supabase dashboard
# 4. Enable RLS policies
npm run dev
```

### 3. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Run Tests
```bash
npm run test          # Run once
npm run test:watch   # Watch mode
npm run test:ui      # Open test dashboard
```

---

## 🎯 Optional Features

### i18n (Multi-language Support)

Generated routes: `/en/page`, `/es/page`

- Locale switcher component included
- Translation files in `/locales/*.json`
- Easily add more locales

**Docs:** See `docs/i18n-setup.md`

### SQLite (Local Database)

Zero-config local database perfect for:
- Development
- Small side projects
- Learning Drizzle ORM

**Docs:** See `docs/sqlite-setup.md`

### Supabase (Managed Postgres)

Cloud database with built-in auth, perfect for:
- Production apps
- Team collaboration
- Real-time features

**Docs:** See `docs/supabase-setup.md`

---

## 📚 Examples

Check the `examples/` folder for actual generated project outputs:

- `examples/base-only/` — Just Nuxt + Tailwind + Vitest
- `examples/base-i18n-sqlite/` — With i18n and SQLite
- `examples/base-i18n-supabase/` — With i18n and Supabase

---

## 🔧 Tech Stack

**Always Included:**
- Nuxt 3
- Tailwind CSS
- Vitest
- ESLint + Prettier
- TypeScript (strict mode)

**Optional:**
- **i18n:** @nuxtjs/i18n v9
- **SQLite:** better-sqlite3 + drizzle-orm
- **Supabase:** @supabase/supabase-js + Pinia

---

## 🔄 Releasing updates

Plugin versions are **pinned**, so installed users only receive changes when you bump the version. To ship an update:

1. Make your edits (skill, examples, or docs).
2. Bump the version in **both** places — they must match:
   - `.claude-plugin/plugin.json` → `version`
   - `.claude-plugin/marketplace.json` → the plugin entry's `version`
3. Add an entry to [`CHANGELOG.md`](./CHANGELOG.md).
4. Validate, tag, and push:
   ```bash
   claude plugin validate .
   claude plugin tag .          # creates git tag nuxt-fullstack-scaffold--v<version>
   git push && git push --tags
   ```

Users then pick up the update with `/plugin marketplace update claude-nuxt-scaffold`.

---

## 📝 License

MIT — Feel free to use, fork, and share!

---

## 🤝 Contributing

Found a bug? Want to suggest a feature?

1. Open an issue
2. Fork and submit a PR
3. Examples welcome!

---

## 🎓 Learn More

- [Nuxt 3 Docs](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Supabase Docs](https://supabase.com/docs)
- [Vitest Docs](https://vitest.dev)

---

**Happy scaffolding! 🚀**
