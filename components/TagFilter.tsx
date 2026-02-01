'use client';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
  tagCounts?: Record<string, number>;
}

export function TagFilter({ tags, activeTag, onTagClick, tagCounts }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagClick(null)}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          activeTag === null
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            activeTag === tag
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          #{tag}
          {tagCounts && tagCounts[tag] > 0 && (
            <span className="ml-1 opacity-60">({tagCounts[tag]})</span>
          )}
        </button>
      ))}
    </div>
  );
}
