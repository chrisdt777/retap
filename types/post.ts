export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  featured?: boolean;
  description: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  featured?: boolean;
  description: string;
}
