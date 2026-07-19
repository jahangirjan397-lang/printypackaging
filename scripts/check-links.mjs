const requestedBaseUrl =
  process.argv[2] || "http://localhost:3000";

let baseUrl;

try {
  baseUrl = new URL(requestedBaseUrl);
} catch {
  console.error("Invalid website URL:", requestedBaseUrl);
  process.exit(1);
}

const origin = baseUrl.origin;

const allowedHosts = new Set([
  baseUrl.hostname,
  "printypackaging.com",
  "www.printypackaging.com",
]);

const queue = [];
const queuedRoutes = new Set();
const checkedRoutes = new Set();
const discoveredFrom = new Map();

const brokenRoutes = [];
const redirectRoutes = [];
const sitemapUrlCounts = new Map();

const legacyRoutes = [
  "/shop",
  "/testimonials",
  "/cart",
  "/checkout",
  "/my-account",
];

function normalizeRoute(rawHref) {
  if (!rawHref) {
    return null;
  }

  const href = rawHref.replaceAll("&amp;", "&").trim();

  if (
    !href ||
    href.startsWith("#") ||
    /^(mailto:|tel:|javascript:|data:)/i.test(href)
  ) {
    return null;
  }

  let url;

  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }

  if (!allowedHosts.has(url.hostname)) {
    return null;
  }

  let pathname = url.pathname || "/";

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/")
  ) {
    return null;
  }

  if (
    /\.(?:avif|webp|png|jpe?g|gif|svg|ico|pdf|zip|css|js|map|xml|txt|woff2?)$/i.test(
      pathname
    )
  ) {
    return null;
  }

  pathname = pathname.replace(/\/{2,}/g, "/");

  if (pathname.length > 1) {
    pathname = pathname.replace(/\/+$/, "");
  }

  return pathname || "/";
}

function addRoute(rawRoute, source) {
  const route = normalizeRoute(rawRoute);

  if (!route) {
    return;
  }

  if (!discoveredFrom.has(route)) {
    discoveredFrom.set(route, source);
  }

  if (!queuedRoutes.has(route) && !checkedRoutes.has(route)) {
    queuedRoutes.add(route);
    queue.push(route);
  }
}

async function loadSitemap() {
  try {
    const response = await fetch(`${origin}/sitemap.xml`, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      brokenRoutes.push({
        route: "/sitemap.xml",
        status: response.status,
        source: "Website configuration",
      });

      return;
    }

    const xml = await response.text();
    const matches = xml.matchAll(/<loc>(.*?)<\/loc>/gis);

    for (const match of matches) {
      const sitemapUrl = match[1]?.trim();

      if (!sitemapUrl) {
        continue;
      }

      const route = normalizeRoute(sitemapUrl);

      if (!route) {
        continue;
      }

      sitemapUrlCounts.set(
        route,
        (sitemapUrlCounts.get(route) || 0) + 1
      );

      addRoute(route, "sitemap.xml");
    }
  } catch (error) {
    brokenRoutes.push({
      route: "/sitemap.xml",
      status: "FETCH_ERROR",
      source:
        error instanceof Error ? error.message : "Unknown error",
    });
  }
}

function extractLinks(html, sourceRoute) {
  const linkMatches = html.matchAll(
    /\shref\s*=\s*["']([^"']+)["']/gi
  );

  for (const match of linkMatches) {
    addRoute(match[1], sourceRoute);
  }
}

addRoute("/", "Starting page");

for (const legacyRoute of legacyRoutes) {
  addRoute(legacyRoute, "Legacy redirect test");
}

await loadSitemap();

while (queue.length > 0) {
  const route = queue.shift();

  if (!route || checkedRoutes.has(route)) {
    continue;
  }

  checkedRoutes.add(route);

  try {
    const response = await fetch(`${origin}${route}`, {
      redirect: "manual",
      headers: {
        "User-Agent": "PrintyPackaging-Link-Audit/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      const targetRoute = normalizeRoute(location || "");

      redirectRoutes.push({
        route,
        status: response.status,
        target: targetRoute || location || "Unknown destination",
      });

      if (targetRoute) {
        addRoute(targetRoute, route);
      }

      console.log(
        `[REDIRECT] ${route} -> ${
          targetRoute || location || "Unknown"
        }`
      );

      continue;
    }

    if (!response.ok) {
      brokenRoutes.push({
        route,
        status: response.status,
        source: discoveredFrom.get(route) || "Unknown",
      });

      console.log(`[BROKEN] ${route} (${response.status})`);
      continue;
    }

    console.log(`[OK] ${route} (${response.status})`);

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      const html = await response.text();
      extractLinks(html, route);
    }
  } catch (error) {
    brokenRoutes.push({
      route,
      status: "FETCH_ERROR",
      source:
        error instanceof Error ? error.message : "Unknown error",
    });

    console.log(`[ERROR] ${route}`);
  }
}

const duplicateSitemapUrls = Array.from(
  sitemapUrlCounts.entries()
).filter(([, count]) => count > 1);

console.log("");
console.log("========================================");
console.log("PRINTY PACKAGING LINK AUDIT");
console.log("========================================");
console.log(`Checked routes: ${checkedRoutes.size}`);
console.log(`Redirects found: ${redirectRoutes.length}`);
console.log(`Broken routes: ${brokenRoutes.length}`);
console.log(
  `Duplicate sitemap URLs: ${duplicateSitemapUrls.length}`
);

if (redirectRoutes.length > 0) {
  console.log("");
  console.log("REDIRECTS:");

  for (const redirect of redirectRoutes) {
    console.log(
      `- ${redirect.route} (${redirect.status}) -> ${redirect.target}`
    );
  }
}

if (duplicateSitemapUrls.length > 0) {
  console.log("");
  console.log("DUPLICATE SITEMAP URLS:");

  for (const [route, count] of duplicateSitemapUrls) {
    console.log(`- ${route} appears ${count} times`);
  }
}

if (brokenRoutes.length > 0) {
  console.log("");
  console.log("BROKEN ROUTES:");

  for (const broken of brokenRoutes) {
    console.log(
      `- ${broken.route} | Status: ${broken.status} | Found from: ${broken.source}`
    );
  }

  process.exitCode = 1;
} else {
  console.log("");
  console.log("No broken internal routes found.");
}