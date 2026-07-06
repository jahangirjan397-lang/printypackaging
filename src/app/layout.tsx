import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Printy Packaging | Custom Boxes and Packaging Solutions",
    template: "%s | Printy Packaging",
  },
  description:
    "Printy Packaging provides custom boxes, packaging styles, materials, finishes and quote support for USA, UK, Canada and international buyers.",
  keywords: [
    "custom packaging",
    "custom boxes",
    "mailer boxes",
    "rigid boxes",
    "folding cartons",
    "display boxes",
    "packaging quote",
    "Printy Packaging",
  ],
  openGraph: {
    title: "Printy Packaging | Custom Boxes and Packaging Solutions",
    description:
      "Custom boxes, packaging materials, finishes and quote support for international buyers.",
    url: "https://printypackaging.com",
    siteName: "Printy Packaging",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}