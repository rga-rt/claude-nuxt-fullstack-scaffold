<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Welcome to Your Nuxt App
        </h1>
        <p class="text-lg text-gray-600">
          Built with Nuxt 3, Tailwind CSS, and Vitest
        </p>
      </header>

      <main class="grid gap-8 md:grid-cols-2 mb-12">
        <HelloWorld />

        <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-3">
              <span class="text-blue-600 font-bold">1</span>
              <span>Edit <code class="bg-gray-100 px-2 py-1 rounded text-sm">pages/index.vue</code></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-600 font-bold">2</span>
              <span>Create components in <code class="bg-gray-100 px-2 py-1 rounded text-sm">components/</code></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-600 font-bold">3</span>
              <span>Add pages in <code class="bg-gray-100 px-2 py-1 rounded text-sm">pages/</code></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-blue-600 font-bold">4</span>
              <span>Run <code class="bg-gray-100 px-2 py-1 rounded text-sm">npm run test</code> to test</span>
            </li>
          </ul>
        </div>
      </main>

      <footer class="border-t border-gray-200 pt-8 text-center text-gray-600">
        <p>Built with ❤️ using Nuxt 3, Tailwind CSS, and TypeScript</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '~/components/HelloWorld.vue';
</script>

<style scoped>
/* Component-specific styles go here */
</style>
