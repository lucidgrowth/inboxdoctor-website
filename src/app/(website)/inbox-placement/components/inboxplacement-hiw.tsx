import HowItWorks from "@/components/how-it-works";

const data = {
  id: "how-it-works",
  badge: "Three Simple Steps",
  heading: "How to Run Your Inbox Placement Test",
  description:
    "Follow these simple steps to ensure your emails land in the inbox",
  steps: [
    {
      step: 1,
      image: "/email-health/hiw_01.png",
      title: "Choose Your Audience and Send a Test Email",
      description:
        "Select B2B or B2C to target your audience, copy the provided test email address, and send an email from your domain to start the placement analysis.",
    },
    {
      step: 2,
      image: "/email-health/hiw_02.png",
      title: "Unlock a Detailed Placement Report",
      description:
        "Sit back as our system evaluates your email's delivery across major providers, generating a comprehensive report tailored to your setup.",
    },
    {
      step: 3,
      image: "/email-health/hiw_03.png",
      title: "Explore and Download Your Placement Results",
      description:
        "Access your personalized report to see where your emails land—inbox, spam, or elsewhere—and download it for actionable insights.",
    },
  ],
};
const InboxPlacementHIW = () => {
  return <HowItWorks data={data} />;
};

export default InboxPlacementHIW;
