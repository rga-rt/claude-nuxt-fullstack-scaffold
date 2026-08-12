<template>
  <div>
    <div v-if="auth.isLoggedIn" class="flex items-center gap-3 text-sm">
      <span class="text-gray-600">
        {{ t('auth.loggedInAs') }} <strong>{{ auth.user?.email }}</strong>
      </span>
      <button
        class="rounded bg-gray-100 px-3 py-1 font-medium text-gray-700 transition hover:bg-gray-200"
        @click="auth.logout()"
      >
        {{ t('auth.logout') }}
      </button>
    </div>

    <form v-else class="flex items-center gap-2" @submit.prevent="onSubmit">
      <input
        v-model="email"
        type="email"
        required
        :placeholder="t('auth.enterEmail')"
        class="rounded border border-gray-300 px-3 py-1 text-sm"
      />
      <button
        type="submit"
        :disabled="auth.loading"
        class="rounded bg-gray-900 px-3 py-1 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
      >
        {{ t('auth.sendLink') }}
      </button>
    </form>

    <p v-if="auth.message" class="mt-1 text-xs text-gray-500">{{ auth.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();
const auth = useAuth();
const email = ref('');

function onSubmit() {
  auth.login(email.value);
}
</script>
