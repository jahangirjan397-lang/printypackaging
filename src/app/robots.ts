import type { MetadataRoute } from 'next';

const siteUrl = 'https://printypackaging.com';

const privatePaths = ["/api/", "/admin/"];

// AI assistants and AI search engines that send buyers to the site (ChatGPT,
// Claude, Perplexity, Gemini, Copilot via Bing, Apple). They are named
// explicitly so they keep access even if the general rule ever changes.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: aiCrawlers,
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: siteUrl + '/sitemap.xml',
    host: siteUrl,
  };
}
