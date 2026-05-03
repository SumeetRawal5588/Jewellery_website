import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import ShowcaseSection from "@/components/ShowcaseSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ProductGrid />
      <ShowcaseSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
