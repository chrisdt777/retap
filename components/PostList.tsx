'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { PostMetadata } from '@/types/post';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';
import { TagFilter } from '@/components/TagFilter';

interface PostListProps {
  posts: PostMetadata[];
  tags: string[];
}

export function PostList({ posts, tags }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery);
        const descriptionMatch = post.description.toLowerCase().includes(lowerQuery);
        const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
        return titleMatch || descriptionMatch || tagsMatch;
      });
    }

    if (activeTag) {
      filtered = filtered.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );
    }

    return filtered;
  }, [posts, searchQuery, activeTag]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTag(null);
  };

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 dark:border-zinc-800 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Retap
            </h1>
          </Link>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            A minimal space for writing and ideas.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between mb-12">
          <SearchBar onSearch={handleSearch} />
          <TagFilter
            tags={tags}
            activeTag={activeTag}
            onTagClick={handleTagClick}
            tagCounts={tagCounts}
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-500">
              {searchQuery ? 'No posts found matching your search.' : 'No posts yet.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Retap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
