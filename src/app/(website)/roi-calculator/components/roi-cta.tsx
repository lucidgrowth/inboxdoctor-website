import CTASection from "@/components/cta-section";
import { bookingLink } from "@/lib/constants";

const ctaData = {
  title: "Ready to Boost Your Email ROI?",
  description:
    "Start optimizing with InboxDoctor today.",
  buttonText: "Book a Call",
  buttonLink: bookingLink,
};

export const ROICTA = () => {
  return (
    <CTASection
      title={ctaData.title}
      description={ctaData.description}
      buttonText={ctaData.buttonText}
      buttonLink={ctaData.buttonLink}
    />
  );
};
