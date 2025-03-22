import TestimonialsSection from "@/app/components/testimonials";
import { ROICTA } from "./components/roi-cta";
import { ROIFAQ } from "./components/roi-faq";
import ROIHeorSection from "./components/roi-hero";
import { ROIHIW } from "./components/roi-hiw";

export default function InboxPlacement() {
  return (
    <main>
      <ROIHeorSection />
      <ROIHIW />
      <TestimonialsSection />
      <ROIFAQ />
      <ROICTA />
    </main>
  );
}
