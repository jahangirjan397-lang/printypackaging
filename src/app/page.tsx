import type { Metadata } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import BrandTypesStrip from "../components/BrandTypesStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import PremiumPackagingShowcase from "../components/PremiumPackagingShowcase";
import OrderProcessSection from "../components/OrderProcessSection";
import IndustryBuyerSection from "../components/IndustryBuyerSection";
import PaymentMethodsSection from "../components/PaymentMethodsSection";
import { paymentMethodsVerified } from "@/data/businessInfo";
import QuoteSection from "../components/QuoteSection";
import BoxFinder from "../components/BoxFinder";
import CustomerReviewsSection from "../components/CustomerReviewsSection";

export const metadata: Metadata = {
  title: { absolute: "Custom Packaging Boxes with Logo | Printy Packaging" },
  description:
    "Custom printed boxes, rigid boxes, mailer boxes, food packaging, butter paper and labels for USA, UK, Europe and UAE brands. Get a free packaging quote.",
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
        url: "https://printypackaging.com/images/products/mailer-boxes/mailer-boxes-hero-brand.webp",
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
    images: ["https://printypackaging.com/images/products/mailer-boxes/mailer-boxes-hero-brand.webp"],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <BrandTypesStrip />
      <StatsBar />
      <FeaturedProducts />
      <BoxFinder />
      <PremiumPackagingShowcase />
      <OrderProcessSection />
      <IndustryBuyerSection />
      <CustomerReviewsSection />
      <QuoteSection />
      {paymentMethodsVerified && <PaymentMethodsSection />}
    </>
  );
}
