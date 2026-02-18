export type UpdateCategory = "matches" | "training" | "personal" | "media";

export interface Update {
  id: string;
  slug: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  category: UpdateCategory;
  thumbnail: string;
  heroImage?: string;
  publishedAt: string;
  featured?: boolean;
}
