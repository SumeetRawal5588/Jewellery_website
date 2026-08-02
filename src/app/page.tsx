import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import ShowcaseSection from "@/components/ShowcaseSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import ScrollDivider from "@/components/ScrollDivider";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ScrollDivider />
      <ProductGrid />
      <ScrollDivider />
      <ShowcaseSection />
      <ScrollDivider />
      <FeaturesSection />
      <ScrollDivider />
      <TestimonialsSection />
      <ScrollDivider />
      <NewsletterSection />
    </>
  );
}
