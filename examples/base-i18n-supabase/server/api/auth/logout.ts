import { supabase } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization');

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const { error } = await supabase.auth.signOut({ jwt: token });

  if (error) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }

  return { message: 'Logged out successfully' };
});
