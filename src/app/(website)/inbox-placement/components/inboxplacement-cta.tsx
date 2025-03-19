import CTASection from "@/components/cta-section";
import { bookingLink } from "@/lib/constants";

const ctaData = {
  title: "Optimize Your Inbox Placement Now",
  description:
    "Run the Inbox Placement Test to secure your email delivery and boost your open rates.",
  buttonText: "Book a Call",
  buttonLink: bookingLink,
};

const InboxPlacementCTA = () => {
  return (
    <CTASection
      title={ctaData.title}
      description={ctaData.description}
      buttonText={ctaData.buttonText}
      buttonLink={ctaData.buttonLink}
    />
  );
};

export default InboxPlacementCTA;
