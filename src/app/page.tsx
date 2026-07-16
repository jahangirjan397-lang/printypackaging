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
      <IndustryBuyerSection />
      <SalesSupportSection />
      <QuoteSection />
      <FloatingActions />
    </>
  );
}