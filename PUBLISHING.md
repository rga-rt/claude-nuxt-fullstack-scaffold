# Publishing to GitHub

This guide walks you through publishing the skill to your GitHub account.

---

## Option 1: Create a New Repository

### Step 1: Initialize Git Locally

```bash
cd /path/to/nuxt-fullstack-scaffold
git init
git add .
git commit -m "Initial commit: Nuxt fullstack scaffold skill"
```

### Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `claude-nuxt-fullstack-scaffold`
3. **Description:** "Claude skill for scaffolding production-ready Nuxt 3 projects with optional i18n, SQLite, or Supabase"
4. **Public** (so others can see and learn from it)
5. **Skip** "Add README" (you already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/claude-nuxt-fullstack-scaffold.git
git branch -M main
git push -u origin main
```

---

## Option 2: Set Up as a Template Repository

A template repository lets users click **"Use this template"** to create their own projects based on your skill.

### Step 1: Make Repository a Template

1. Go to https://github.com/YOUR_USERNAME/claude-nuxt-fullstack-scaffold
2. Click **Settings** (top right)
3. Scroll to "Repository options"
4. Check **"Template repository"**
5. Click **Save**

Now users will see a **"Use this template"** button instead of "Clone/Fork".

### Step 2: (Optional) Add Example Outputs

Create example generated projects in the repo:

```
nuxt-fullstack-scaffold/
├── examples/
│   ├── base-only/
│   │   ├── package.json
│   │   ├── nuxt.config.ts
│   │   └── ...
│   ├── base-i18n-sqlite/
│   │   └── ...
│   └── base-i18n-supabase/
│       └── ...
└── ...
```

This helps users understand what gets generated.

---

## Directory Structure

Here's what should be in your GitHub repo:

```
claude-nuxt-fullstack-scaffold/
├── SKILL.md                      # The actual skill (required)
├── README.md                     # Overview
├── FEATURES.md                   # Feature documentation
├── PUBLISHING.md                 # This file
├── LICENSE                       # MIT license
├── .gitignore
├── docs/
│   ├── sqlite-setup.md
│   ├── supabase-setup.md
│   └── i18n-setup.md
└── examples/                     # (Optional) Example outputs
    ├── base-only/
    ├── base-i18n-sqlite/
    └── base-i18n-supabase/
```

---

## Making It Easy for Users

### README Quick Links

Add these sections to your README:

```markdown
## Quick Links

- 📖 [Features Overview](./FEATURES.md) — What each option adds
- 🛠️ [SQLite Setup](./docs/sqlite-setup.md) — Local database
- 🌐 [Supabase Setup](./docs/supabase-setup.md) — Cloud database
- 🌍 [i18n Setup](./docs/i18n-setup.md) — Multi-language support
- 📄 [License](./LICENSE)
```

### GitHub Badges

Add badges to your README for visual appeal:

```markdown
# Nuxt Fullstack Scaffold

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt: 3](https://img.shields.io/badge/Nuxt-3-00dc82?logo=nuxt.js)](https://nuxt.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
```

---

## Promoting Your Skill

Once published, share it:

### 1. Social Media

- Tweet: "Just published a Claude skill for scaffolding Nuxt 3 projects with optional i18n, SQLite, or Supabase! 🚀"
- Include: GitHub repo link

### 2. Reddit / Dev Communities

- r/nuxt
- r/webdev
- r/opensource
- Dev.to article linking to your repo

### 3. Claude Discourse / Forums

- Post in Anthropic forums
- Share in Claude community spaces

### 4. Your Portfolio

- Link from your personal website
- Show in GitHub profile README

---

## Updating Your Skill

As you improve the skill:

1. **Make changes locally**
2. **Test thoroughly** with Claude Code
3. **Commit and push:**

```bash
git add .
git commit -m "Improve database error handling"
git push origin main
```

4. **(Optional) Create releases:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## Version History

Keep a CHANGELOG.md to document changes:

```markdown
# Changelog

## [1.0.0] - 2024-01-15

### Added
- Initial release
- Nuxt 3 + Tailwind + Vitest base stack
- Optional i18n support
- Optional SQLite + Drizzle integration
- Optional Supabase integration
- Comprehensive documentation

### Features
- Skill generates complete Nuxt projects
- Decision tree for optional features
- Example outputs for each configuration
```

---

## Repository Secrets (Optional)

If you add CI/CD (GitHub Actions) later:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets (API keys, etc.) if needed
3. Reference in `.github/workflows/` files

---

## Making Your Repo Stand Out

### 1. Add a Screenshot (Optional)

Create a `docs/screenshot.png` showing the skill in action:
- Command: "Scaffold a new Nuxt project"
- Output example

Add to README:

```markdown
## In Action

![Skill Demo](./docs/screenshot.png)
```

### 2. Add Discussion Section

Go to **Settings** → **Discussions** → Enable

Users can:
- Ask questions
- Share ideas
- Report issues

### 3. Add a Contributing Guide

Create `CONTRIBUTING.md`:

```markdown
# Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/improve-something`)
3. Make changes
4. Test with Claude Code
5. Submit a PR

## Guidelines

- Keep SKILL.md under 500 lines
- Document new features in FEATURES.md
- Update examples when making changes
- Add setup docs for new optional features
```

---

## Troubleshooting

### "I pushed but GitHub doesn't show the files"

Check your `.gitignore` — you might be excluding important files.

Review `.gitignore`:
- Should include: `node_modules/`, `.env`, `.DS_Store`
- Should NOT include: `SKILL.md`, `docs/`, `examples/`

### "I want to add example projects"

Example directory structure:

```
examples/base-only/
├── app.vue
├── nuxt.config.ts
├── package.json
└── README.md        # "This is what gets generated for base stack only"

examples/base-i18n-sqlite/
├── app.vue
├── i18n.config.ts
├── drizzle.config.ts
└── README.md
```

Add a note in each README explaining the configuration.

### "Should I make it a template?"

**Yes, if:**
- You want users to click "Use this template"
- You're providing full Nuxt project examples
- You want it to be a starter

**No, if:**
- It's just documentation of the Claude skill
- You want people to use it via Claude directly

For this project, **template mode** makes sense because users will adapt your examples.

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Enable GitHub Pages (optional, for documentation site)
3. ✅ Add GitHub Discussions
4. ✅ Share with the community
5. ✅ Gather feedback and iterate

---

## Questions?

- **GitHub Help:** https://docs.github.com
- **Nuxt Docs:** https://nuxt.com
- **Supabase Docs:** https://supabase.com/docs
- **Drizzle Docs:** https://orm.drizzle.team

Good luck! 🚀
