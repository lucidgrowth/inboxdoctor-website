"use client";

import { InfiniteMovingCards } from "@/components/infinity-moving-cards";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/container";

const faqs = [
  {
    question: "What is InboxDoctor and how does it work?",
    answer:
      "InboxDoctor is an AI-powered email deliverability platform that analyzes and optimizes your emails to ensure they reach the inbox. It uses advanced algorithms to check content, authentication, and sender reputation.",
  },
  {
    question: "How can InboxDoctor improve my email deliverability?",
    answer:
      "InboxDoctor improves deliverability by analyzing SPF, DKIM, and DMARC records, checking content against spam triggers, monitoring sender reputation, and providing real-time optimization suggestions.",
  },
  {
    question:
      "Is InboxDoctor compatible with my existing email service provider?",
    answer:
      "Yes, InboxDoctor integrates seamlessly with major email service providers including Gmail, Outlook, SendGrid, Mailchimp, and many others through our API or direct integration.",
  },
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
  // {
  //   question: "Can I use InboxDoctor for multiple domains?",
  //   answer:
  //     "Yes, our platform supports multiple domains and subdomains. You can manage all your email sending domains from a single dashboard with domain-specific analytics.",
  // },
  // {
  //   question: "Do you offer customer support?",
  //   answer:
  //     "We provide 24/7 customer support through chat, email, and phone. Our team of email deliverability experts is always ready to help you optimize your email performance.",
  // },
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

export default function FaqSection() {
  return (
    <Container id="faq">
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <span className="text-sm text-blue-400">FAQ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl">
            Find answers to common questions about InboxDoctor.
          </p>
        </div>

        <div className="space-y-2">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 bg-white/[0.02] rounded-2xl px-4"
              >
                <AccordionTrigger className="py-6 hover:no-underline text-lg [&>svg]:size-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
