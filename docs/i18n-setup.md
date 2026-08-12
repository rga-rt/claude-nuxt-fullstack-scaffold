# i18n Setup Guide

Multi-language support with locale-based routing.

## Overview

When you scaffold with i18n enabled, you get:

- **Route prefixes:** `/en/page`, `/es/page`, etc.
- **Automatic locale detection:** Browser language preference respected
- **Default locale:** English (configurable)
- **Locale switcher component:** Easy language switching in UI
- **Translation files:** JSON files for each language

---

## Quick Start

### 1. Start Dev Server

```bash
npm install
npm run dev
```

### 2. Visit Different Locales

- English: http://localhost:3000/en/
- Spanish: http://localhost:3000/es/

### 3. Switch Languages

Use the **LocaleSwitcher** component (included in navbar).

---

## Adding Translations

Translations live in `/locales/` directory:

```
locales/
├── en.json
└── es.json
```

### English Translations (`/locales/en.json`)

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "title": "Welcome to My App",
    "subtitle": "Built with Nuxt, Tailwind, and i18n"
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong"
  }
}
```

### Spanish Translations (`/locales/es.json`)

```json
{
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Bienvenido a mi Aplicación",
    "subtitle": "Construido con Nuxt, Tailwind e i18n"
  },
  "common": {
    "loading": "Cargando...",
    "error": "Algo salió mal"
  }
}
```

---

## Using Translations in Components

### In Templates

```vue
<template>
  <div>
    <h1>{{ $t('hero.title') }}</h1>
    <p>{{ $t('hero.subtitle') }}</p>
  </div>
</template>
```

### In Scripts

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const message = t('common.loading');
console.log(message); // "Loading..." or "Cargando..."
</script>
```

### With Computed Properties

```vue
<script setup lang="ts">
const { t } = useI18n();

const navItems = computed(() => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.about'), path: '/about' },
  { label: t('nav.contact'), path: '/contact' },
]);
</script>
```

---

## Accessing Current Locale

```vue
<script setup lang="ts">
const { locale } = useI18n();

console.log(locale.value); // 'en' or 'es'
</script>
```

---

## Switching Locale Programmatically

```vue
<script setup lang="ts">
const { locale } = useI18n();

// Switch to Spanish
locale.value = 'es';

// Switch to English
locale.value = 'en';
</script>
```

The URL will automatically update: `/en/page` → `/es/page`

---

## Adding a New Locale

### Step 1: Create Translation File

Create `/locales/fr.json`:

```json
{
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    "contact": "Contact"
  },
  "hero": {
    "title": "Bienvenue dans Mon Application",
    "subtitle": "Construit avec Nuxt, Tailwind et i18n"
  },
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur s'est produite"
  }
}
```

### Step 2: Update i18n Config

Edit `/i18n.config.ts`:

```typescript
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: importMessages('en'),
    es: importMessages('es'),
    fr: importMessages('fr'), // Add this
  },
}));
```

### Step 3: Update Nuxt Config

Edit `nuxt.config.ts`:

```typescript
i18n: {
  strategy: 'prefix',
  langDir: 'locales/',
  locales: [
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' },
    { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' }, // Add this
  ],
  defaultLocale: 'en',
},
```

### Step 4: Test

```bash
npm run dev
```

Visit: http://localhost:3000/fr/ → French!

---

## LocaleSwitcher Component

The included `LocaleSwitcher.vue` component:

```vue
<template>
  <div class="flex gap-2">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="setLocale(locale.code)"
      :class="[
        'px-3 py-1 rounded text-sm font-medium transition',
        $i18n.locale === locale.code
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      ]"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locales, setLocale } = useI18n();
const availableLocales = computed(() => 
  locales.value.map(l => typeof l === 'string' ? { code: l } : l)
);
</script>
```

**Place in your layout/navbar:**

```vue
<nav class="flex justify-between items-center">
  <div>Logo</div>
  <LocaleSwitcher />
</nav>
```

### Customize the Switcher

Make it a dropdown instead:

```vue
<script setup lang="ts">
const { locale, locales } = useI18n();
const availableLocales = computed(() => 
  locales.value.map(l => typeof l === 'string' ? { code: l } : l)
);
</script>

<template>
  <select @change="(e) => locale = e.target.value" :value="locale">
    <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
      {{ loc.name }}
    </option>
  </select>
</template>
```

---

## File Structure

```
your-project/
├── i18n.config.ts              # i18n configuration
├── locales/                     # Translation files
│   ├── en.json
│   ├── es.json
│   └── fr.json                  # Add more as needed
├── components/
│   └── LocaleSwitcher.vue       # Language switcher
└── nuxt.config.ts              # i18n module config
```

---

## Common Patterns

### Pluralization

Not included by default, but you can use:

```json
{
  "items": {
    "one": "1 item",
    "other": "{count} items"
  }
}
```

```vue
{{ $t('items.one') }} or {{ $t('items.other') }}
```

For full pluralization support, see [Vue i18n Pluralization](https://vue-i18n.intlify.dev/guide/essentials/pluralization.html).

### Date/Time Formatting

Use Intl API:

```vue
<script setup>
const date = new Date();
const formatted = new Intl.DateTimeFormat(locale.value).format(date);
</script>
```

Or use `date-fns`:

```bash
npm install date-fns
```

```typescript
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

const localeMap = { en: enUS, es: es };
const formatted = format(date, 'PPP', { locale: localeMap[locale.value] });
```

### RTL Languages (Hebrew, Arabic)

For RTL text direction:

```vue
<html :dir="locale.startsWith('ar') || locale.startsWith('he') ? 'rtl' : 'ltr'">
```

---

## SEO with i18n

### Automatic Alternate Links

Nuxt i18n auto-generates `<link rel="alternate">` tags for SEO:

```html
<link rel="alternate" hreflang="en" href="/en/page">
<link rel="alternate" hreflang="es" href="/es/page">
```

This tells search engines about language versions of your page.

### Meta Tags Per Locale

```vue
<script setup lang="ts">
const { t, locale } = useI18n();

useHead({
  title: t('page.title'),
  meta: [
    {
      name: 'description',
      content: t('page.description'),
    },
    {
      property: 'og:locale',
      content: locale.value,
    },
  ],
});
</script>
```

---

## Removing i18n

If you decide to remove multi-language support:

1. Delete `/i18n.config.ts`
2. Delete `/locales/` folder
3. Delete `/components/LocaleSwitcher.vue`
4. Remove `@nuxtjs/i18n` from `nuxt.config.ts`:

```typescript
modules: [
  '@nuxtjs/tailwindcss',
  // '@nuxtjs/i18n', // Remove this
],
```

5. Remove from `package.json` dependencies and reinstall:

```bash
npm uninstall @nuxtjs/i18n
npm install
```

---

## npm Scripts

```bash
npm run dev              # Start dev server (all locales)
npm run build            # Build (pre-renders all locale routes)
npm run lint             # ESLint check
npm run lint:fix         # Fix issues
npm run test             # Run tests
```

---

## Troubleshooting

### Routes Not Loading

If `/es/page` shows 404:

1. Check `nuxt.config.ts` has `es` in locales array
2. Check `/locales/es.json` exists
3. Restart dev server: `npm run dev`

### Locale Not Switching

In LocaleSwitcher:

```typescript
const { locale, setLocale } = useI18n();

// Use setLocale instead of direct assignment
setLocale('es');
```

### Translations Not Updating in Build

Ensure you run:

```bash
npm run build
```

This pre-renders all locales. For SSR, restart the server.

---

## Next Steps

- Add more languages to `/locales/`
- Customize LocaleSwitcher component
- Use date-fns for multilingual dates
- Set up Crowdin or similar for translation management
- Configure SEO alt links for each locale

---

## Learn More

- [Vue i18n Docs](https://vue-i18n.intlify.dev/)
- [Nuxt i18n Docs](https://i18n.nuxtjs.org/)
- [MDN: Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
