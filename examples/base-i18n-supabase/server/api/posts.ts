import { supabase, getServerSession, queries } from '~/server/utils/supabase';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  // GET /api/posts or /api/posts?id=uuid
  if (method === 'GET') {
    const query = getQuery(event);

    if (query.id) {
      const { data, error } = await queries.posts.byId(query.id as string);
      if (error) {
        throw createError({
          statusCode: 404,
          message: 'Post not found',
        });
      }
      return data;
    }

    const { data, error } = await queries.posts.published();
    if (error) {
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }
    return data;
  }

  // POST /api/posts
  if (method === 'POST') {
    const user = await getServerSession(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const body = await readBody<{
      title: string;
      slug: string;
      content: string;
      excerpt?: string;
    }>(event);

    if (!body.title || !body.slug || !body.content) {
      throw createError({
        statusCode: 400,
        message: 'Title, slug, and content are required',
      });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        author_id: user.id,
        published: false,
      })
      .select();

    if (error) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }

    setResponseStatus(event, 201);
    return data?.[0];
  }

  // PUT /api/posts?id=uuid
  if (method === 'PUT') {
    const user = await getServerSession(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const query = getQuery(event);
    const postId = query.id as string;
    const body = await readBody(event);

    // Verify user owns the post
    const { data: post } = await queries.posts.byId(postId);
    if (!post || post.author_id !== user.id) {
      throw createError({
        statusCode: 403,
        message: 'You can only update your own posts',
      });
    }

    const { data, error } = await supabase
      .from('posts')
      .update(body)
      .eq('id', postId)
      .select();

    if (error) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }

    return data?.[0];
  }

  // DELETE /api/posts?id=uuid
  if (method === 'DELETE') {
    const user = await getServerSession(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const query = getQuery(event);
    const postId = query.id as string;

    // Verify user owns the post
    const { data: post } = await queries.posts.byId(postId);
    if (!post || post.author_id !== user.id) {
      throw createError({
        statusCode: 403,
        message: 'You can only delete your own posts',
      });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      throw createError({
        statusCode: 400,
        message: error.message,
      });
    }

    setResponseStatus(event, 204);
  }
});
