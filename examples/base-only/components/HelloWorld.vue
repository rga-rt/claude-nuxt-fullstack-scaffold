<template>
  <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
    <div class="mb-4">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Hello, World! 👋
      </h2>
      <p class="text-gray-600">
        This is an example component built with Vue 3 and Tailwind CSS.
      </p>
    </div>

    <div class="space-y-4">
      <div>
        <label for="count" class="block text-sm font-medium text-gray-700 mb-2">
          Counter: {{ count }}
        </label>
        <div class="flex gap-2">
          <button
            @click="count--"
            class="px-4 py-2 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition"
          >
            Decrease
          </button>
          <button
            @click="count++"
            class="px-4 py-2 bg-green-100 text-green-700 rounded font-medium hover:bg-green-200 transition"
          >
            Increase
          </button>
          <button
            @click="count = 0"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">
          <strong>Status:</strong>
          <span v-if="count === 0" class="text-gray-500">No counts yet</span>
          <span v-else-if="count > 0" class="text-green-600">Count is positive</span>
          <span v-else class="text-red-600">Count is negative</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref<number>(0);

// Expose `count` so unit tests can read it via `wrapper.vm.count`
defineExpose({ count });
</script>

<style scoped>
/* Scoped styles only affect this component */
</style>
