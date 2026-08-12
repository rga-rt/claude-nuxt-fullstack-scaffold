import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    // Requires `happy-dom` (declared in devDependencies).
    environment: 'nuxt',
  },
});
