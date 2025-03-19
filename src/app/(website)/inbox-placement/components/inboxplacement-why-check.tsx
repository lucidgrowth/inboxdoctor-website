import WhyUseFeature from "@/components/why-use-feature";
import {
  BarChart3,
  Brain,
  ChartLine,
  CheckCircle,
  Mail,
  Rocket,
  Shield,
} from "lucide-react";

const data = {
  id: "why-check",
  badge: "Why Run a Test?",
  heading: "Why Run an Inbox Placement Test?",
  description:
    "Ensure your emails land in the inbox by evaluating placement across major providers like Gmail, Outlook, and Yahoo.",
  steps: [
    {
      key: 1,
      icon: <Shield />,
      title: "Prevents Spam Folder Misplacement",
      description:
        "Regular checks identify issues that could divert your emails to spam, ensuring they reach the intended inbox.",
    },
    {
      key: 2,
      icon: <Rocket />,
      title: "Optimizes Email Deliverability",
      description:
        "Analyze placement across providers to enhance delivery rates and maintain a strong sender reputation.",
    },
    {
      key: 3,
      icon: <ChartLine />,
      title: "Boosts Open and Engagement Rates",
      description:
        "Monitor placement performance to improve your email visibility, increasing the likelihood of higher open rates.",
    },
    {
      key: 4,
      icon: <Brain />,
      title: "Delivers Detailed Placement Insights",
      description:
        "Get a comprehensive report with placement results, provider-specific data, and tips to improve your email strategy.",
    },
  ],
};

const InboxPlacementWhyCheck = () => {
  return <WhyUseFeature data={data} />;
};

export default InboxPlacementWhyCheck;
