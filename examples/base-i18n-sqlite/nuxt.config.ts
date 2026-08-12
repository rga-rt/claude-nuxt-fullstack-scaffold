// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  typescript: {
    strict: true,
  },
  i18n: {
    // Keep config + locale files at the project root (v8-style layout)
    restructureDir: false,
    // Base vue-i18n options live in ./i18n.config.ts
    vueI18n: './i18n.config.ts',
    // Message files live in ./locales and are lazy-loaded per locale
    langDir: 'locales',
    lazy: true,
    defaultLocale: 'en',
    strategy: 'prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
    ],
  },
});
