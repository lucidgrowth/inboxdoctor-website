import FaqSection from "@/components/faq-section";
import React from "react";

const faqs = [
  {
    question: "How does the B2B Email ROI Calculator work?",
    answer:
      "The B2B Email ROI Calculator is tailored for businesses targeting other companies, focusing on metrics like average deal value, lead-to-opportunity rate, and campaign costs. You input details about your email campaigns, such as the number of leads generated and your typical sales cycle, and the calculator estimates your ROI based on improved deliverability and engagement. It helps B2B marketers see how InboxDoctor can enhance their email outreach to drive more high-value conversions.",
  },
  {
    question: "How does the B2C Email ROI Calculator work?",
    answer:
      "The B2C Email ROI Calculator is designed for businesses targeting consumers, emphasizing metrics like average order value, conversion rate, and customer acquisition costs. You enter data about your email campaigns, such as the number of emails sent and your typical purchase rate, and the calculator projects your ROI by factoring in better inbox placement and engagement. It's perfect for B2C businesses looking to maximize sales and customer retention through email marketing.",
  },
  {
    question: "What kind of data do I need to use the calculators?",
    answer:
      "To use the calculators, you'll need basic data about your email campaigns, such as the number of emails sent, your average revenue per sale, and your campaign costs. For B2B, you might also include lead conversion rates and sales cycle length, while for B2C, details like purchase frequency or customer lifetime value can help. If you're unsure, the calculators provide guidance on typical values to get you started.",
  },
  {
    question:
      "How does InboxDoctor improve email deliverability to boost my ROI?",
    answer:
      "InboxDoctor improves email deliverability by using tools like the Inbox Placement Test and Email Domain Health Test to ensure your emails land in the inbox, not spam, through better authentication, sender reputation, and content optimization. Higher deliverability means more of your emails are seen, leading to increased open rates, conversions, and ultimately, a better ROI for your campaigns. Our expertise helps you address deliverability issues that could otherwise cost you valuable opportunities with your audience.",
  },
  {
    question: "Can I book a demo with InboxDoctor to learn more?",
    answer:
      "Yes, you can easily book a demo with our team to see InboxDoctor in action and understand how our tools can improve your email performance and ROI. During the demo, we'll walk you through features like the ROI Calculator and Inbox Placement Test, answering any questions you have about optimizing your email strategy. It's a great way to explore how InboxDoctor can help your business grow—schedule your demo today!",
  },
];
export const ROIFAQ = () => {
  return (
    <FaqSection
      faqs={faqs}
      title="Frequently Asked Questions"
      description="Find answers to common questions about email domain security."
    />
  );
};
