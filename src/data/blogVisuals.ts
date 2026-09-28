import { blogPosts } from "./blogs";

// Each post's cover image is set in /admin (the "Cover image" field)
export const blogVisuals: Record<string, { src: string; alt: string }> =
  Object.fromEntries(
    blogPosts.map((post) => [
      post.slug,
      { src: post.coverImage, alt: post.coverAlt || post.title },
    ]),
  );

export function getBlogVisual(slug: string) {
  const visual = blogVisuals[slug];
  if (!visual?.src) {
    throw new Error(`Missing cover image for blog post "${slug}"`);
  }
  return visual;
}
