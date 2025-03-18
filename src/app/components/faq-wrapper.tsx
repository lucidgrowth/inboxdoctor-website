import FaqSection from "@/components/faq-section";
import React from "react";

const faqs = [
  {
    question: "What is InboxDoctor and how does it work?",
    answer:
      "InboxDoctor is an email deliverability platform that analyzes and optimizes your emails to ensure they reach the inbox. It uses advanced algorithms to check content, authentication, and sender reputation.",
  },
  {
    question: "How can InboxDoctor improve my email deliverability?",
    answer:
      "InboxDoctor improves deliverability by analyzing SPF, DKIM, and DMARC records, checking content against spam triggers, monitoring sender reputation, and providing real-time optimization suggestions.",
  },
  // {
  //   question:
  //     "Is InboxDoctor compatible with my existing email service provider?",
  //   answer:
  //     "Yes, InboxDoctor integrates seamlessly with major email service providers including Gmail, Outlook, SendGrid, Mailchimp, and many others through our API or direct integration.",
  // },
  {
    question: "What kind of reporting and analytics does InboxDoctor provide?",
    answer:
      "We provide comprehensive analytics including delivery rates, bounce rates, spam placement rates, engagement metrics, and detailed reports on authentication issues and content optimization.",
  },
  {
    question: "How long does it take to set up InboxDoctor?",
    answer:
      "Most users can set up InboxDoctor in less than 15 minutes. Our guided setup process and automatic configuration tools make it easy to get started quickly.",
  },
  {
    question: "What security measures does InboxDoctor have in place?",
    answer:
      "We implement enterprise-grade security including SOC 2 compliance, end-to-end encryption, two-factor authentication, and regular security audits to protect your data.",
  },
  {
    question: "Can I use InboxDoctor for multiple domains?",
    answer:
      "Yes, our platform supports multiple domains and subdomains. You can manage all your email sending domains from a single dashboard with domain-specific analytics.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "We provide customer support based on your plan. Our team of email deliverability experts is available through chat, email, and phone to help you optimize your email performance.",
  },
  // {
  //   question: "What pricing plans are available?",
  //   answer:
  //     "We offer flexible pricing plans starting from a free tier for small senders, scaling up to enterprise plans for high-volume senders. All plans include core deliverability features.",
  // },
  // {
  //   question: "Can InboxDoctor help with email template optimization?",
  //   answer:
  //     "Yes, our AI analyzes your email templates for potential deliverability issues and provides specific recommendations for improvement, including content, structure, and HTML optimization.",
  // },
];

const FaqWrapper = () => {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="FFind answers to common questions about InboxDoctor."
    />
  );
};

export default FaqWrapper;
