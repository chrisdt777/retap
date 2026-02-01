import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMetadata } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): Post[] {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: {
          title: data.title || '',
          date: data.date || '',
          tags: data.tags || [],
          featured: data.featured || false,
          description: data.description || '',
        },
        content,
      } as Post;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: {
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        featured: data.featured || false,
        description: data.description || '',
      },
      content,
    } as Post;
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getAllPostsMetadata(): PostMetadata[] {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags,
    featured: post.frontmatter.featured,
    description: post.frontmatter.description,
  }));
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedPosts(): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.frontmatter.featured);
}

export function searchPosts(query: string): Post[] {
  const posts = getAllPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerQuery);
    const descriptionMatch = post.frontmatter.description.toLowerCase().includes(lowerQuery);
    const contentMatch = post.content.toLowerCase().includes(lowerQuery);
    const tagsMatch = post.frontmatter.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    return titleMatch || descriptionMatch || contentMatch || tagsMatch;
  });
}
