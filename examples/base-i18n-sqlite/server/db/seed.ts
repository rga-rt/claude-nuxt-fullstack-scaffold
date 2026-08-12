import { db } from './index';
import { authors, posts } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create author
  const author = await db.insert(authors).values({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer and writer',
  }).returning();

  const authorId = author[0].id;

  // Create posts
  await db.insert(posts).values([
    {
      title: 'Welcome to My Blog',
      slug: 'welcome-to-my-blog',
      content: 'This is my first blog post. I\'m excited to share my thoughts and experiences.',
      excerpt: 'An introduction to my new blog',
      published: true,
      authorId,
    },
    {
      title: 'Building with Nuxt 3',
      slug: 'building-with-nuxt-3',
      content: 'Nuxt 3 is an amazing framework for building modern web applications...',
      excerpt: 'Thoughts on Nuxt 3 development',
      published: true,
      authorId,
    },
    {
      title: 'Database Design Tips',
      slug: 'database-design-tips',
      content: 'Here are some tips for designing efficient databases...',
      excerpt: 'Best practices for databases',
      published: true,
      authorId,
    },
  ]);

  console.log('✅ Database seeded successfully!');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
