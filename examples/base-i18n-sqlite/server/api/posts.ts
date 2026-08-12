import { db, queries } from '~/server/db';
import { posts, type NewPost } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  // GET /api/posts or /api/posts?id=1
  if (method === 'GET') {
    const query = getQuery(event);
    
    if (query.id) {
      const post = await queries.posts.byId(Number(query.id));
      if (!post) {
        throw createError({ statusCode: 404, message: 'Post not found' });
      }
      return post;
    }

    // Get published posts
    return await queries.posts.published();
  }

  // POST /api/posts
  if (method === 'POST') {
    const body = await readBody<NewPost>(event);
    
    if (!body.title || !body.slug || !body.content || !body.authorId) {
      throw createError({ 
        statusCode: 400, 
        message: 'Title, slug, content, and authorId are required' 
      });
    }

    try {
      const result = await db.insert(posts).values(body).returning();
      setResponseStatus(event, 201);
      return result[0];
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        throw createError({ 
          statusCode: 400, 
          message: 'A post with that slug already exists' 
        });
      }
      throw error;
    }
  }

  // PUT /api/posts?id=1
  if (method === 'PUT') {
    const query = getQuery(event);
    const id = Number(query.id);
    const body = await readBody(event);

    const post = await queries.posts.byId(id);
    if (!post) {
      throw createError({ statusCode: 404, message: 'Post not found' });
    }

    try {
      const result = await db
        .update(posts)
        .set(body)
        .where(eq(posts.id, id))
        .returning();
      
      return result[0];
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        throw createError({ 
          statusCode: 400, 
          message: 'A post with that slug already exists' 
        });
      }
      throw error;
    }
  }

  // DELETE /api/posts?id=1
  if (method === 'DELETE') {
    const query = getQuery(event);
    const id = Number(query.id);

    const post = await queries.posts.byId(id);
    if (!post) {
      throw createError({ statusCode: 404, message: 'Post not found' });
    }

    await db.delete(posts).where(eq(posts.id, id));
    setResponseStatus(event, 204);
  }
});
