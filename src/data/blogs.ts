import fs from "node:fs";
import path from "node:path";

// Blog posts live in content/blogs/<slug>.json and are edited from /admin
// (Decap CMS). This file only reads them; do not add posts here.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  coverAlt: string;
  keywords: string[];
  // Optional SEO overrides; fall back to title / excerpt
  seoTitle?: string;
  metaDescription?: string;
  // Date of the last real content update (YYYY-MM-DD)
  updatedAt?: string;
  author?: string;
  // Product slugs linked from the article
  relatedProducts?: string[];
  sections: {
    heading: string;
    // Separate paragraphs with a blank line ("\n\n")
    body: string;
    table?: {
      caption: string;
      headers: string[];
      rows: string[][];
    };
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

type BlogFile = Omit<BlogPost, "sections"> & {
  draft?: boolean;
  sections: {
    heading: string;
    body: string;
    tableCaption?: string;
    // One row per line, cells separated by "|". The first line is the header.
    table?: string;
  }[];
};

const blogDirectory = path.join(process.cwd(), "content", "blogs");

function parseTable(text: string, caption: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((cell) => cell.trim()));

  if (lines.length < 2) return undefined;

  const [headers, ...rows] = lines;
  return { caption: caption || headers.join(", "), headers, rows };
}

function toPost(file: BlogFile): BlogPost {
  return {
    ...file,
    keywords: file.keywords ?? [],
    faqs: file.faqs ?? [],
    sections: (file.sections ?? []).map((section) => ({
      heading: section.heading,
      body: section.body ?? "",
      table: section.table?.trim()
        ? parseTable(section.table, section.tableCaption ?? "")
        : undefined,
    })),
  };
}

function loadBlogPosts(): BlogPost[] {
  return fs
    .readdirSync(blogDirectory)
    .filter((name) => name.endsWith(".json"))
    .map(
      (name) =>
        JSON.parse(
          fs.readFileSync(path.join(blogDirectory, name), "utf8"),
        ) as BlogFile,
    )
    .filter((file) => !file.draft)
    .map(toPost)
    // Newest first; posts from the same day stay in title order
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.title.localeCompare(b.title),
    );
}

export const blogPosts: BlogPost[] = loadBlogPosts();

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
