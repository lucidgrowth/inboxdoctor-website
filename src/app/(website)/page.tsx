import ComparisonSection from "../components/comparison";
import CTASection from "../components/cta-section";
import FaqWrapper from "../components/faq-wrapper";
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
      <FaqWrapper />
      <CTASection />
      {/* <InfiniteMovingCardsDemo /> */}
    </main>
  );
}
