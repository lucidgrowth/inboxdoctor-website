import FaqSection from "@/components/faq-section";
import React from "react";

const faqs = [
  {
    question: "What is an Inbox Placement Test, and why do I need it?",
    answer:
      "An Inbox Placement Test checks where your emails land—whether in the inbox, spam, or other folders—across a variety of popular email providers. It's essential because even well-crafted emails can miss the mark if they don't reach the inbox, which can hurt your marketing campaigns, customer communications, or transactional messages. By understanding where your emails end up, you can take steps to improve delivery, boost engagement, and ensure your messages get seen by your audience.",
  },
  {
    question: "How does the Inbox Placement Test work?",
    answer:
      "The test works by having you send an email to a unique test address after selecting your audience type (B2B or B2C). Our system then monitors the email's delivery across multiple email providers, evaluating where it lands and identifying factors that influence placement, such as spam filtering or sender reputation.",
  },
  {
    question: "Will this test help my emails avoid the spam folder?",
    answer:
      "Yes, the Inbox Placement Test is designed to help you avoid the spam folder by identifying the reasons your emails might be flagged. It looks at factors like your sender reputation, email content, and setup issues that could trigger spam filters. After the test, you'll receive a detailed report with practical recommendations to address these issues, such as adjusting your content or improving your authentication settings, so more of your emails land in the inbox where they belong.",
  },
  {
    question: "How can I use the results to improve my email campaigns?",
    answer:
      "The test results give you a clear picture of where your emails are landing—in the inbox, spam, or elsewhere—across different providers. You'll also learn what's affecting your placement, such as content that triggers spam filters or a low sender reputation. With this insight, you can make targeted improvements, like refining your email content or building your sender reputation over time. This helps increase your open rates and overall campaign performance, ensuring your messages reach and resonate with your audience.",
  },
  {
    question: "Do I need technical knowledge to run this test?",
    answer:
      "No technical knowledge is required to run the Inbox Placement Test! We've made the process as simple as possible: you just select your audience type (B2B or B2C), copy the test email address we provide, and send an email from your account. After that, we handle the analysis and present the results in an easy-to-understand report. You don't need to know the ins and outs of email systems—we guide you through each step and explain the findings in plain language with actionable next steps.",
  },
  {
    question: "How long does it take to get my results?",
    answer:
      "The Inbox Placement Test is designed to be fast and efficient. After you send the test email, our system typically takes just a few minutes to analyze how your email performs across different providers. Once the analysis is complete, you'll be directed to a detailed report that shows where your emails landed and offers tips for improvement. The quick turnaround means you can start optimizing your email strategy without delay.",
  },
  {
    question:
      "Can I test different types of emails, like marketing or transactional?",
    answer:
      "Absolutely, the Inbox Placement Test works for any type of email you want to send! Whether you're testing a marketing campaign, a transactional email like an order confirmation, or a customer notification, you can use the test to see how it performs across providers. This flexibility helps you optimize all your email communications, ensuring that every message—regardless of its purpose—has the best chance of landing in the inbox and engaging your recipients.",
  },
  {
    question: "Why should I start testing my inbox placement now?",
    answer:
      "Poor inbox placement can silently sabotage your email efforts, causing your messages to go unseen in spam folders and leading to missed opportunities, lower engagement, and reduced ROI. Testing your inbox placement now lets you identify and fix these issues before they impact your audience, whether you're running a time-sensitive campaign or building long-term customer relationships. Don't wait—start testing today to ensure your emails get noticed and drive the results you're aiming for!",
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
