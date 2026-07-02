import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Printy Packaging | Custom Boxes, Rigid Boxes & Food Packaging",
  description:
    "Printy Packaging provides premium custom boxes, rigid boxes, folding cartons, butter paper, paper bags, labels, stickers, food packaging and luxury printed packaging for brands worldwide.",
  keywords: [
    "custom packaging",
    "custom boxes",
    "rigid boxes",
    "food packaging",
    "butter paper",
    "printed boxes",
    "folding cartons",
    "paper bags",
    "labels and stickers",
    "luxury packaging",
    "custom printed boxes",
    "packaging manufacturer",
  ],
  openGraph: {
    title: "Printy Packaging | Premium Custom Printing & Packaging",
    description:
      "Premium custom printing and packaging solutions for USA, UK, Europe and worldwide brands.",
    type: "website",
    url: "https://printypackaging.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}