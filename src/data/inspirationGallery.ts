// Style reference photos from the wider packaging industry. Brand names on
// these boxes belong to their owners — they are NOT Printy Packaging orders,
// so the gallery is labelled as inspiration and never carries our logo.

export type InspirationCategory = "rigid" | "bakery" | "retail";

export type InspirationImage = {
  src: string;
  label: string;
  category: InspirationCategory;
  // Printy product page that makes this style
  product: string;
};

export const inspirationCategories: { key: InspirationCategory; title: string }[] = [
  { key: "rigid", title: "Rigid & gift boxes" },
  { key: "bakery", title: "Bakery & food boxes" },
  { key: "retail", title: "Retail & favour boxes" },
];

export const inspirationGallery: InspirationImage[] = [
  { src: "/images/inspiration/rigid-2.webp", label: "Gable gift box", category: "rigid", product: "gable-boxes" },
  { src: "/images/inspiration/rigid-4.webp", label: "Magnetic ribbon gift box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-5.webp", label: "Rigid box with insert", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-6.webp", label: "Lid and base box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-7.webp", label: "Two-piece rigid box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-8.webp", label: "Magnetic box size range", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-9.webp", label: "Lid and base rigid box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-10.webp", label: "Two-piece rigid boxes", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-11.webp", label: "Shoulder-neck rigid box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-13.webp", label: "Sleeve drawer box", category: "rigid", product: "drawer-boxes" },
  { src: "/images/inspiration/rigid-14.webp", label: "Shoulder-neck rigid box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-15.webp", label: "Lid and base rigid boxes", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-16.webp", label: "Shoulder-neck rigid box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-18.webp", label: "Lid and base box", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-23.webp", label: "Magnetic rigid box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-24.webp", label: "Magnetic box with insert", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-26.webp", label: "Rigid box with insert", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-27.webp", label: "Magnetic box with insert", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-29.webp", label: "Book-style rigid box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-30.webp", label: "Magnetic box with holographic lining", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-31.webp", label: "Stacked rigid boxes", category: "rigid", product: "rigid-boxes" },
  { src: "/images/inspiration/rigid-33.webp", label: "Book-style gift box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-34.webp", label: "Magnetic rigid box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/rigid-35.webp", label: "Drawer box", category: "rigid", product: "drawer-boxes" },
  { src: "/images/inspiration/rigid-37.webp", label: "Magnetic rigid box", category: "rigid", product: "magnetic-boxes" },
  { src: "/images/inspiration/bakery-1.webp", label: "Gable cake box", category: "bakery", product: "gable-boxes" },
  { src: "/images/inspiration/bakery-2.webp", label: "Cake carry box", category: "bakery", product: "cake-boxes" },
  { src: "/images/inspiration/bakery-3.webp", label: "Cupcake window box", category: "bakery", product: "cupcake-boxes" },
  { src: "/images/inspiration/bakery-4.webp", label: "Gable cake box", category: "bakery", product: "gable-boxes" },
  { src: "/images/inspiration/bakery-5.webp", label: "Bakery box range", category: "bakery", product: "bakery-boxes" },
  { src: "/images/inspiration/bakery-7.webp", label: "Window cake box", category: "bakery", product: "cake-boxes" },
  { src: "/images/inspiration/bakery-8.webp", label: "Bakery box set", category: "bakery", product: "bakery-boxes" },
  { src: "/images/inspiration/bakery-10.webp", label: "Cupcake box", category: "bakery", product: "cupcake-boxes" },
  { src: "/images/inspiration/bakery-13.webp", label: "Window pastry box", category: "bakery", product: "bakery-boxes" },
  { src: "/images/inspiration/bakery-18.webp", label: "Cookie tray box", category: "bakery", product: "cookie-boxes" },
  { src: "/images/inspiration/bakery-21.webp", label: "Cookie sleeve box", category: "bakery", product: "cookie-boxes" },
  { src: "/images/inspiration/bakery-22.webp", label: "Cookie gift pack", category: "bakery", product: "cookie-boxes" },
  { src: "/images/inspiration/bakery-24.webp", label: "Gable box", category: "bakery", product: "gable-boxes" },
  { src: "/images/inspiration/bakery-29.webp", label: "Pillow box", category: "retail", product: "pillow-boxes" },
  { src: "/images/inspiration/bakery-30.webp", label: "Pillow box", category: "retail", product: "pillow-boxes" },
];
