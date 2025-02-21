import ComparisonSection from "./components/comparison";
import HeroSection from "./components/hero-section";
import NavBar from "./components/nav-bar";
export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <ComparisonSection />
    </main>
  );
}
