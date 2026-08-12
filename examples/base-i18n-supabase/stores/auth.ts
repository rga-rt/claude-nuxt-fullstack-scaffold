import { defineStore } from 'pinia';
import {
  createClient,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Lazily create a browser Supabase client from the public runtime config.
 * (Server-side data access uses `server/utils/supabase.ts` instead.)
 */
function getClient(): SupabaseClient {
  if (!client) {
    const config = useRuntimeConfig();
    client = createClient(
      config.public.supabaseUrl as string,
      config.public.supabaseAnonKey as string,
    );
  }
  return client;
}

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    message: '',
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
  },

  actions: {
    /** Restore any existing session and subscribe to auth changes. */
    async init() {
      const supabase = getClient();
      const { data } = await supabase.auth.getSession();
      this.user = data.session?.user ?? null;

      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null;
      });
    },

    /** Send a magic-link email to the given address. */
    async login(email: string) {
      this.loading = true;
      this.message = '';

      const { error } = await getClient().auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });

      this.loading = false;
      this.message = error
        ? error.message
        : 'Check your email for the login link';
    },

    /** Sign the current user out. */
    async logout() {
      await getClient().auth.signOut();
      this.user = null;
    },
  },
});
