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
import SalesSupportSection from "../components/SalesSupportSection";
import QuoteSection from "../components/QuoteSection";
import FloatingActions from "../components/FloatingActions";
import ContactTrustSection from "../components/ContactTrustSection";
import SeoGrowthLinksSection from "../components/SeoGrowthLinksSection";

export const metadata: Metadata = {
  title: "Custom Boxes, Rigid Boxes & Food Packaging | Printy Packaging",
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
        url: "https://printypackaging.com/images/hero/hero-packaging.webp",
        width: 1600,
        height: 900,
        alt: "Premium custom packaging boxes by Printy Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printy Packaging | Premium Custom Boxes & Packaging",
    description:
      "Custom boxes, rigid boxes, food packaging, butter paper, paper bags, labels and stickers for USA, UK, Europe and worldwide buyers.",
    images: ["https://printypackaging.com/images/hero/hero-packaging.webp"],
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
      <SeoGrowthLinksSection />
      <PremiumPackagingShowcase />
      <WhyChoosePrintySection />
      <OrderProcessSection />
      <IndustryBuyerSection />
      <SalesSupportSection />
      <ContactTrustSection />
      <QuoteSection />
      <FloatingActions />
    </>
  );
}