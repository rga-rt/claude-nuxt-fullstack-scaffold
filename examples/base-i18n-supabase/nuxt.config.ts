// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    // Server-only (available via process.env in server routes as well)
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      // Exposed to the browser for the client-side auth flow
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  i18n: {
    // Keep config + locale files at the project root (v8-style layout)
    restructureDir: false,
    vueI18n: './i18n.config.ts',
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
