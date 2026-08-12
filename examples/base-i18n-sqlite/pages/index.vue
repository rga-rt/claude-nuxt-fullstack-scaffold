<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="container mx-auto flex items-center justify-between px-4 py-4">
        <nav class="flex gap-4 text-sm font-medium text-gray-700">
          <span>{{ t('nav.home') }}</span>
          <span>{{ t('nav.blog') }}</span>
          <span>{{ t('nav.about') }}</span>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <section class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900">{{ t('hero.title') }}</h1>
        <p class="mt-2 text-lg text-gray-600">{{ t('hero.subtitle') }}</p>
      </section>

      <section>
        <h2 class="mb-6 text-2xl font-bold text-gray-900">{{ t('blog.title') }}</h2>

        <p v-if="pending" class="text-gray-500">{{ t('common.loading') }}</p>
        <p v-else-if="error" class="text-red-600">{{ t('common.error') }}</p>
        <p v-else-if="!posts || posts.length === 0" class="text-gray-500">
          {{ t('blog.noPostsYet') }}
        </p>
        <ul v-else class="space-y-4">
          <li
            v-for="post in posts"
            :key="post.id"
            class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 class="text-xl font-semibold text-gray-900">{{ post.title }}</h3>
            <p v-if="post.excerpt" class="mt-2 text-gray-600">{{ post.excerpt }}</p>
            <NuxtLink class="mt-3 inline-block text-blue-600" to="#">
              {{ t('blog.readMore') }} →
            </NuxtLink>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/server/db/schema';

const { t } = useI18n();

const {
  data: posts,
  pending,
  error,
} = await useFetch<Post[]>('/api/posts');
</script>
