import Link from 'next/link';
import type { PostMetadata } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block border-b border-zinc-200 dark:border-zinc-800 py-8 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 -mx-4 px-4 sm:mx-0 sm:px-0 sm:hover:bg-transparent transition-colors"
    >
      <article>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {post.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
