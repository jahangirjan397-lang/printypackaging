export const topSeoRoutes = [
  {
    title: "Custom Packaging",
    href: "/custom-packaging",
    priority: 0.95,
    changeFrequency: "weekly",
  },
  {
    title: "Custom Packaging USA",
    href: "/markets/usa",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Custom Packaging UK",
    href: "/markets/uk",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Custom Packaging Canada",
    href: "/markets/canada",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Custom Packaging Europe",
    href: "/markets/europe",
    priority: 0.85,
    changeFrequency: "weekly",
  },
    {
    title: "Custom Packaging UAE",
    href: "/markets/uae",
    priority: 0.87,
    changeFrequency: "weekly",
  },
  {
    title: "Custom Packaging Australia",
    href: "/markets/australia",
    priority: 0.85,
    changeFrequency: "weekly",
  },
  {
    title: "Rigid Boxes",
    href: "/products/rigid-boxes",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Mailer Boxes",
    href: "/products/mailer-boxes",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    title: "Folding Cartons",
    href: "/products/folding-cartons",
    priority: 0.88,
    changeFrequency: "weekly",
  },
  {
    title: "Food Packaging",
    href: "/products/food-packaging",
    priority: 0.88,
    changeFrequency: "weekly",
  },
  {
    title: "Paper Bags",
    href: "/products/paper-bags",
    priority: 0.84,
    changeFrequency: "weekly",
  },
  {
    title: "Labels and Stickers",
    href: "/products/labels-stickers",
    priority: 0.84,
    changeFrequency: "weekly",
  },
  {
    title: "Packaging Materials",
    href: "/packaging-materials",
    priority: 0.78,
    changeFrequency: "monthly",
  },
  {
    title: "Finishing Options",
    href: "/finishing-options",
    priority: 0.78,
    changeFrequency: "monthly",
  },
  {
    title: "Artwork Guide",
    href: "/artwork-guide",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    title: "Sample Kit",
    href: "/sample-kit",
    priority: 0.72,
    changeFrequency: "monthly",
  },
  {
    title: "Packaging Guide",
    href: "/packaging-guide",
    priority: 0.82,
    changeFrequency: "monthly",
  },
] as const;

export type TopSeoRoute = (typeof topSeoRoutes)[number];



