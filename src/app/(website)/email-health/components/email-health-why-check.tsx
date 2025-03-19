import WhyUseFeature from "@/components/why-use-feature";
import { BarChart3, CheckCircle, Mail, Shield } from "lucide-react";

const data = {
  id: "why-check",
  badge: "Why Check?",
  heading: "Why Run an Email Domain Health Test?",
  description:
    "Ensure your emails reach the inbox by evaluating critical domain health factors like authentication, security, and reputation.",
  steps: [
    {
      icon: <Shield />,
      title: "Protects Against Deliverability Issues",
      description:
        "Regular checks identify issues with SPF, DKIM, and DMARC that could send your emails to spam, ensuring they land in the inbox.",
    },
    {
      icon: <Mail />,
      title: "Enhances Email Security",
      description:
        "Evaluate security settings like DANE and TLS to safeguard your domain from phishing or unauthorized email attempts.",
    },
    {
      icon: <BarChart3 />,
      title: "Improves Inbox Placement Rates",
      description:
        "Monitor domain age and blacklist status to boost your reputation, increasing the likelihood of higher open rates.",
    },
    {
      icon: <CheckCircle />,
      title: "Provides Actionable Insights",
      description:
        "Get a detailed report with scores, failed checks, and recommendations to optimize your email performance.",
    },
  ],
};

const EmailHealthWhyCheck = () => {
  return <WhyUseFeature data={data} />;
};

export default EmailHealthWhyCheck;
