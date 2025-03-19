import EmailHealthHIW from "../email-health/components/email-health-hiw";
import InboxPlacementCTA from "./components/inboxplacement-cta";
import InboxPlacementDemo from "./components/inboxplacement-demo";
import InboxPlacementFAQ from "./components/inboxplacement-faq";
import InboxPlacementFeatures from "./components/inboxplacement-features";
import InboxPlacementHero from "./components/inboxplacement-hero";
import InboxPlacementWhyCheck from "./components/inboxplacement-why-check";
import InboxPlacementWhyChoose from "./components/inboxplacement-why-choose";
import ProviderCompare from "./components/provider-compare";
import { ProviderSection } from "./components/providers-list";

export default function InboxPlacement() {
  return (
    <main>
      <InboxPlacementHero />
      <EmailHealthHIW />
      <InboxPlacementFeatures />
      <InboxPlacementWhyCheck />
      <InboxPlacementDemo />
      <InboxPlacementWhyChoose />
      <ProviderCompare />
      <ProviderSection />
      <InboxPlacementFAQ />
      <InboxPlacementCTA />
    </main>
  );
}
