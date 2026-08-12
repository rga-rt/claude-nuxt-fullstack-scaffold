# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-11

### Added

- Claude skill (`skills/nuxt-fullstack-scaffold/SKILL.md`) for scaffolding
  production-ready Nuxt 3 apps with Tailwind, Vitest, ESLint, and optional i18n,
  SQLite (Drizzle), or Supabase.
- Claude Code plugin + marketplace manifests (`.claude-plugin/`) so the repo is
  installable via `/plugin marketplace add rga-rt/claude-nuxt-fullstack-scaffold`.
- Three runnable example projects, each building with passing tests:
  - `base-only` — Nuxt 3 + Tailwind + Vitest
  - `base-i18n-sqlite` — i18n + Drizzle/SQLite CRUD + seed data
  - `base-i18n-supabase` — i18n + Supabase magic-link auth (Pinia)
- Setup guides in `docs/` for i18n, SQLite/Drizzle, and Supabase.
- README status badges and repository description/topics.

### Notes

- Example dependencies were pinned to versions compatible with current releases
  (Nuxt/unhead, `@nuxtjs/i18n` v9, `better-sqlite3` v12, `vitest` v3).

[1.0.0]: https://github.com/rga-rt/claude-nuxt-fullstack-scaffold/releases/tag/nuxt-fullstack-scaffold--v1.0.0
