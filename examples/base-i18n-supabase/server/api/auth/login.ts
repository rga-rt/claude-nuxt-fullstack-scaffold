import { supabase } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required',
    });
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getHeader(event, 'origin')}/auth/callback`,
    },
  });

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }

  return { message: 'Check your email for the login link' };
});
