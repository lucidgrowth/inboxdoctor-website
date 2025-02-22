import ComparisonSection from "./components/comparison";
import FaqSection from "./components/faq";
import FeaturesSection from "./components/features-section";
import HeroSection from "./components/hero-section";
import NavBar from "./components/nav-bar";
import PricingSection from "./components/pricing";
import TestimonialsSection from "./components/testimonials";
import Footer from "./components/footer";
import CTASection from "./components/cta-section";
import StatsSection from "./components/stats-section";
export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
      <Footer />
      {/* <InfiniteMovingCardsDemo /> */}
    </main>
  );
}
