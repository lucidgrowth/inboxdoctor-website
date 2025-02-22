import ComparisonSection from "./components/comparison";
import HeroSection from "./components/hero-section";
import NavBar from "./components/nav-bar";
import PricingSection from "./components/pricing";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <ComparisonSection />
      <PricingSection />
    </main>
  );
}
