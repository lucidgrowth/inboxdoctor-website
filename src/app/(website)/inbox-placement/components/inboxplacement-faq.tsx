import FaqSection from "@/components/faq-section";
import React from "react";

const faqs = [
  {
    question: "What is an Email Domain Health Test?",
    answer:
      "An Email Domain Health Test is a comprehensive analysis of your email domain's configuration, including SPF, DKIM, DMARC, and other settings, to ensure your emails reach the inbox and avoid spam filters. It checks security, authentication, and deliverability factors to provide actionable insights.",
  },
  {
    question: "How does the Email Domain Health Test work?",
    answer:
      "Simply generate a test email address, send an email from your domain to that address, and let us analyze the delivery process. Our system evaluates your domain's health across multiple metrics and generates a detailed report, accessible on a separate results page.",
  },
  {
    question: "What kind of insights will I get from the test?",
    answer:
      "You'll receive a snapshot of your domain's overall health score, security status, authentication results (e.g., DMARC, DKIM, SPF), delivery chain analysis, domain age impact, blacklist status, and a full report with email content and logs for deeper investigation.",
  },
  {
    question: "How long does the test take?",
    answer:
      "The process is quick! After sending the test email, it typically takes a few minutes for our system to analyze and generate your results, which will be available on the results page. Processing time may vary based on email provider response.",
  },
  {
    question: "Is my data secure during the test?",
    answer:
      "Yes, your data is fully secure. We use encrypted connections and comply with strict privacy standards. Only the test email you send is analyzed, and no personal data is stored or shared beyond the results.",
  },
  {
    question: "Can I run the test multiple times?",
    answer:
      "Yes, you can run the test up to 10 times. Each test provides a fresh analysis, allowing you to monitor improvements after making changes to your domain settings.",
  },
  {
    question: "What should I do if my domain health report shows issues?",
    answer:
      "Our detailed report includes specific recommendations (e.g., fixing failed checks like DANE or blacklist issues). Follow these suggestions, retest to verify improvements, or contact our support team for expert assistance.",
  },
];
const InboxPlacementFAQ = () => {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="Find answers to common questions about email domain security."
    />
  );
};

export default InboxPlacementFAQ;
