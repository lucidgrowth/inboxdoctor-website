import FeaturesSection from "@/components/features-section";

const data = {
  id: "features",
  badge: "Report",
  heading: "Preview Your Inbox Placement Test Report",
  description:
    "Discover the detailed metrics you’ll get with our Inbox Placement Test Report.",
  steps: [
    {
      key: 1,
      title: "Test Results",
      image: "/email-health/feature_01.png",
      description:
        "View a summary of your inbox placement performance, including the percentage of emails that landed in the inbox, spam, or were unreceived, helping you gauge overall deliverability.",
    },
    {
      key: 2,
      title: "Placement by Provider Type",
      image: "/email-health/feature_02.png",
      description:
        "Analyze how your emails perform across major providers like Microsoft 365, Google Workspace, and Zoho Workmail, showing inbox, spam, and unreceived rates for each.",
    },
    {
      key: 3,
      title: "Test Email Details",
      image: "/email-health/feature_03.png",
      description:
        "Get the details of the test email that was sent, including sender, recipient, subject, and content, to understand its delivery path and placement outcome.",
    },
    {
      key: 4,
      title: "Blacklist Status",
      image: "/email-health/feature_04.png",
      description:
        "Check if your domain or mail servers are listed on blacklists, which can impact deliverability, and identify areas to improve your sender reputation.",
    },
    {
      key: 5,
      title: "Email Details",
      image: "/email-health/feature_05.png",
      description:
        "Review comprehensive metadata of the test email, such as IP address, date, message ID, and raw content, to trace its journey and verify authenticity.",
    },
    {
      key: 6,
      title: "Deliverability Issues Detected",
      image: "/email-health/feature_07.png",
      description:
        "Receive alerts about potential deliverability problems, like emails landing in spam, with recommendations to improve inbox placement, such as warming up your inbox.",
    },
    {
      key: 7,
      title: "Inbox Placement History",
      image: "/email-health/feature_06.png",
      description:
        "Track your inbox placement trends over time with historical data, showing how your inbox, spam, and unreceived rates have evolved across tests.",
    },
  ],
};

const InboxPlacementFeatures = () => {
  return <FeaturesSection data={data} />;
};

export default InboxPlacementFeatures;
