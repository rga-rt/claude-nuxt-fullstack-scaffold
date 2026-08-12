import { describe, it, expect } from 'vitest';
import { getTableColumns } from 'drizzle-orm';
import { posts, authors } from '~/server/db/schema';

/**
 * Unit tests for the posts data layer.
 *
 * These validate the Drizzle schema without needing a running server. For full
 * HTTP integration tests of `/api/posts`, use the `@nuxt/test-utils` e2e helpers
 * (https://nuxt.com/docs/getting-started/testing) against a seeded test database
 * (run `npm run db:push && npm run db:seed` first).
 */
describe('posts schema', () => {
  it('defines the posts table with the expected columns', () => {
    const columns = Object.keys(getTableColumns(posts));
    expect(columns).toEqual(
      expect.arrayContaining([
        'id',
        'title',
        'slug',
        'content',
        'excerpt',
        'published',
        'authorId',
      ]),
    );
  });

  it('defines the authors table with the expected columns', () => {
    const columns = Object.keys(getTableColumns(authors));
    expect(columns).toEqual(
      expect.arrayContaining(['id', 'name', 'email', 'bio']),
    );
  });
});
