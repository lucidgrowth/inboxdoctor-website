import WhyChooseSection from "@/components/why-choose-section";
import {
  Brain,
  ChartLine,
  Headphones,
  Lock,
  Rocket,
  Shield,
} from "lucide-react";
import React from "react";

const data = {
  id: "why-choose-us",
  badge: "Why Choose Us",
  heading: "Why Choose InboxDoctor?",
  description:
    "InboxDoctor is more than just an email health check—it's the ultimate platform for businesses to secure, optimize, and maximize their email performance.",
  steps: [
    {
      key: 1,
      icon: <ChartLine />,
      title: "Inbox Placement Guarantee",
      description:
        "Stop guessing if your emails will reach the inbox. Our real-time email placement tests ensure maximum deliverability.",
    },
    {
      key: 2,
      icon: <Shield />,
      title: "Complete Email Security & Compliance",
      description:
        "Shield your domain from phishing, spoofing, and unauthorized use with advanced SPF, DKIM, DMARC, and DANE validation.",
    },
    {
      key: 3,
      icon: <Lock />,
      title: "Advanced Mail Server Monitoring",
      description:
        "Keep your SMTP, MX, and DNS records optimized to prevent downtime, email rejections, or slow delivery.",
    },
    {
      key: 4,
      icon: <Rocket />,
      title: "Deliverability & Reputation Booster",
      description:
        "Track blacklists, IP reputation, and bounce rates to keep your sending domains and mail servers trusted.",
    },
    {
      key: 5,
      icon: <Brain />,
      title: "AI-Powered Email Analytics",
      description:
        "Get deep, data-driven insights on your email campaigns, sender reputation, and authentication setup.",
    },
    {
      key: 6,
      icon: <Headphones />,
      title: "Enterprise-Grade Support & Consulting",
      description:
        "Our email experts provide 24/7 support, troubleshooting, and guidance to keep your emails performing at their best.",
    },
  ],
};

const InboxPlacementWhyChoose = () => {
  return <WhyChooseSection data={data} />;
};

export default InboxPlacementWhyChoose;
