import EmailHealthCTA from "./components/email-health-cta";
import EmailHealthFAQ from "./components/email-health-faq";
import EmailHealthFeatures from "./components/email-health-features";
import EmailHealthHero from "./components/email-health-hero";
import EmailHealthHIW from "./components/email-health-hiw";
import EmailHealthWhyCheck from "./components/email-health-why-check";
import EmailHealthWhyChoose from "./components/email-health-why-choose";

export default function EmailHealth() {
  return (
    <main>
      <EmailHealthHero />
      <EmailHealthHIW />
      <EmailHealthWhyChoose />
      <EmailHealthWhyCheck />
      <EmailHealthFeatures />
      <EmailHealthFAQ />
      <EmailHealthCTA />
    </main>
  );
}
