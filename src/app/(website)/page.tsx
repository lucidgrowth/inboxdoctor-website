import ComparisonSection from "../components/comparison";
import CTASection from "../components/cta-section";
import FaqSection from "../components/faq";
import FeaturesSection from "../components/features-section";
import HeroSection from "../components/hero-section";
import PricingSection from "../components/pricing";
import StatsSection from "../components/stats-section";
import TestimonialsSection from "../components/testimonials";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
      {/* <InfiniteMovingCardsDemo /> */}
    </main>
  );
}
