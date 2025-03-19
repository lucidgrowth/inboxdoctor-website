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
      title: "Overall Results",
      image: "/inbox-placement/chart.png",
      description:
        "View a summary of your inbox placement performance, including the percentage of emails that landed in the inbox, spam, or were unreceived, helping you gauge overall deliverability.",
    },
    {
      key: 5,
      title: "Individual Email Details",
      image: "/inbox-placement/email-detail-side.png",
      description:
        "Review comprehensive metadata of the test email, such as IP address, date, message ID, and raw content, to trace its journey and verify authenticity.",
    },

    {
      key: 3,
      title: "Test Email Details",
      image: "/inbox-placement/email-details.png",
      description:
        "Get the details of the test email that was sent, including sender, recipient, subject, and content, to understand its delivery path and placement outcome.",
    },
    {
      key: 4,
      title: "Blacklist Status",
      image: "/email-health/feature_06.png",
      description:
        "Check if your domain or mail servers are listed on blacklists, which can impact deliverability, and identify areas to improve your sender reputation.",
    },
    {
      key: 2,
      title: "Placement by Provider Type",
      image: "/inbox-placement/provider.png",
      description:
        "Analyze how your emails perform across major providers like Microsoft 365, Google Workspace, and Zoho Workmail, showing inbox, spam, and unreceived rates for each.",
    },
    {
      key: 6,
      title: "Open Relay Checks",
      image: "/email-health/feature_07.png",
      description: "Check session transcripts and detected Open Relay.",
    },
  ],
};

const InboxPlacementFeatures = () => {
  return <FeaturesSection data={data} twoColIndexes={[0, 3, 4]} />;
};

export default InboxPlacementFeatures;
