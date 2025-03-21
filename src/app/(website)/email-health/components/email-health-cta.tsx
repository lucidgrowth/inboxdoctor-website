import CTASection from "@/components/cta-section";
import { bookingLink } from "@/lib/constants";

const ctaData = {
  title: "Get your email domain health checked today",
  description:
    "Take the domain health test to ensure your email domain is properly secured.",
  buttonText: "Book a Call",
  buttonLink: bookingLink,
};

const EmailHealthCTA = () => {
  return (
    <CTASection
      title={ctaData.title}
      description={ctaData.description}
      buttonText={ctaData.buttonText}
      buttonLink={ctaData.buttonLink}
    />
  );
};

export default EmailHealthCTA;
