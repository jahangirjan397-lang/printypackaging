import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
  },

  // /admin is the Decap CMS editor (public/admin/index.html)
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },

  async redirects() {
    return [
      {
        source: "/dieline-checker",
        destination: "/dieline-generator",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/products",
        permanent: true,
      },
      // old or mistyped URLs Google found (Search Console 404 report, 2026-10-18)
      { source: "/box", destination: "/products", permanent: true },
      { source: "/box-sizes/:slug", destination: "/box-sizes?size=:slug", permanent: true },
      { source: "/sheet", destination: "/products/butter-paper", permanent: true },
      { source: "/categories/corrugated-packaging", destination: "/categories/ecommerce-packaging", permanent: true },
      {
        source: "/shop/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/product/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/product-category/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/why-printy-packaging",
        permanent: true,
      },
      {
        source: "/testimonials/:path*",
        destination: "/why-printy-packaging",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/my-account",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/packaging/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/custom-packaging/:market",
        destination: "/markets/:market",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;