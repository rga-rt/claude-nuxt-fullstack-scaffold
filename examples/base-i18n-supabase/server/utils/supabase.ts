import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables (SUPABASE_URL and SUPABASE_ANON_KEY)');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get authenticated user from request
export async function getServerSession(event: any) {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return null;
    return data.user;
  } catch (err) {
    return null;
  }
}

// Type-safe query helpers
export const queries = {
  posts: {
    all: async () =>
      supabase
        .from('posts')
        .select('*, author:author_id(id, name, email)')
        .order('created_at', { ascending: false }),
    
    published: async () =>
      supabase
        .from('posts')
        .select('*, author:author_id(id, name, email)')
        .eq('published', true)
        .order('created_at', { ascending: false }),
    
    byId: async (id: string) =>
      supabase
        .from('posts')
        .select('*, author:author_id(id, name, email)')
        .eq('id', id)
        .single(),
    
    bySlug: async (slug: string) =>
      supabase
        .from('posts')
        .select('*, author:author_id(id, name, email)')
        .eq('slug', slug)
        .single(),
  },
  
  users: {
    byId: async (id: string) =>
      supabase
        .from('users')
        .select('id, email, full_name, avatar_url')
        .eq('id', id)
        .single(),
  },
};
