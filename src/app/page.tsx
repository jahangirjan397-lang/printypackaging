import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import StatsBar from "../components/StatsBar";
import FeaturedProducts from "../components/FeaturedProducts";
import PremiumPackagingShowcase from "../components/PremiumPackagingShowcase";
import WhyChoosePrintySection from "../components/WhyChoosePrintySection";
import OrderProcessSection from "../components/OrderProcessSection";
import IndustryBuyerSection from "../components/IndustryBuyerSection";
import QuoteSection from "../components/QuoteSection";
import ContactTrustSection from "../components/ContactTrustSection";

export const metadata: Metadata = {
  title: "Custom Boxes, Rigid Boxes & Food Packaging",
  description:
    "Printy Packaging provides premium custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels and stickers for USA, UK, Europe, UAE and worldwide brands.",
  alternates: {
    canonical: "https://printypackaging.com",
  },
  openGraph: {
    title: "Printy Packaging | Premium Custom Boxes & Packaging",
    description:
      "Premium custom boxes, rigid boxes, mailer boxes, folding cartons, food packaging, butter paper, paper bags, labels and stickers for global brands.",
    url: "https://printypackaging.com",
    type: "website",
    images: [
      {
        url: "https://printypackaging.com/images/home/home-hero-mailer.webp",
        width: 1448,
        height: 1086,
        alt: "Printy Packaging branded mailer boxes for ecommerce and retail brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printy Packaging | Premium Custom Boxes & Packaging",
    description:
      "Custom boxes, rigid boxes, food packaging, butter paper, paper bags, labels and stickers for USA, UK, Europe and worldwide buyers.",
    images: ["https://printypackaging.com/images/home/home-hero-mailer.webp"],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustedBy />
      <StatsBar />
      <FeaturedProducts />
      <PremiumPackagingShowcase />
      <WhyChoosePrintySection />
      <OrderProcessSection />
      <IndustryBuyerSection />      <ContactTrustSection />      <QuoteSection />
    </>
  );
}
