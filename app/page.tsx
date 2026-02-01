import { getAllPostsMetadata, getAllTags } from '@/lib/posts';
import { PostList } from '@/components/PostList';

export default function HomePage() {
  const allPosts = getAllPostsMetadata();
  const allTags = getAllTags();

  return <PostList posts={allPosts} tags={allTags} />;
}
