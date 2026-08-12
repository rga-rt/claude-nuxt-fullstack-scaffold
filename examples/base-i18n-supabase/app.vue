<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Restore the Supabase session on the client once the app mounts.
const auth = useAuth();

onMounted(() => {
  auth.init();
});
</script>
