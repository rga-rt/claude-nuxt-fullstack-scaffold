import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    // Runs tests in a Nuxt environment so `~` aliases and auto-imports work.
    // Requires `happy-dom` (declared in devDependencies).
    environment: 'nuxt',
  },
});
