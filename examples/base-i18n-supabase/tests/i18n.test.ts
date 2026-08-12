import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Read the raw JSON from disk. Importing the files instead would run them
// through the i18n build plugin, which precompiles messages into an AST.
const here = dirname(fileURLToPath(import.meta.url));
const load = (file: string): Record<string, unknown> =>
  JSON.parse(readFileSync(resolve(here, '../locales', file), 'utf-8'));

const en = load('en.json');
const es = load('es.json');

/** Recursively collect the dotted key paths of an object. */
function keyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object'
      ? keyPaths(value as Record<string, unknown>, path)
      : [path];
  });
}

describe('locale files', () => {
  it('English and Spanish define the same set of keys', () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(es).sort());
  });

  it('include the auth translation keys', () => {
    expect(keyPaths(en)).toEqual(
      expect.arrayContaining(['auth.login', 'auth.logout', 'auth.sendLink']),
    );
  });
});
