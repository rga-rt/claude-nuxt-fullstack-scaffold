<template>
  <div class="flex gap-2">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="rounded px-3 py-1 text-sm font-medium transition"
      :class="
        loc.code === locale
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      "
    >
      {{ loc.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(
  () => locales.value as Array<{ code: string; name: string }>,
);
</script>
