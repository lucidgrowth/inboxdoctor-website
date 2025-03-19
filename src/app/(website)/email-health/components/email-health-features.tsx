import FeaturesSection from "@/components/features-section";

const data = {
  id: "features",
  badge: "Features",
  heading: "Preview Your Domain Health Insights",
  description:
    "Discover the detailed metrics you’ll get with our Email Domain Health Test",
  steps: [
    {
      key: 1,
      title: "Overall Health Score",
      image: "/email-health/feature_01.png",
      description:
        "See your domain's overall score, like this example of 90/100, to gauge deliverability.",
    },
    {
      key: 2,
      title: "Security Insights",
      image: "/email-health/feature_02.png",
      description:
        "Get a security breakdown, such as a 92% score with 2 failed checks, to identify risks.",
    },
    {
      key: 3,
      title: "Records Status",
      image: "/email-health/feature_03.png",
      description:
        "Check the overall status of the DNS records of your domain.",
    },
    {
      key: 4,
      title: "Delivery Chain Analysis",
      image: "/email-health/feature_04.png",
      description:
        "Track your email's journey, like this Amazon SES success, with no open relay issues.",
    },
    {
      key: 5,
      title: "Domain Age Impact",
      image: "/email-health/feature_05.png",
      description:
        "Learn how domain age affects delivery, like this 10-day domain needing reputation growth.",
    },
    {
      key: 6,
      title: "Open Relay Checks",
      image: "/email-health/feature_07.png",
      description: "Check session transcripts and detected Open Relay.",
    },
    {
      key: 7,
      title: "Blacklist Monitoring",
      image: "/email-health/feature_06.png",
      description:
        "Find out if you're blacklisted, as shown by this sample with 1 listing needing attention.",
    },
  ],
};

const EmailHealthFeatures = () => {
  return <FeaturesSection data={data} twoColIndexes={[3, 6]} />;
};

export default EmailHealthFeatures;
