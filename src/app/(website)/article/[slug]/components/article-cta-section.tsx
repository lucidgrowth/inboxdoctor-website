"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/container";
import { bookingLink } from "@/lib/constants";
import Link from "next/link";

const points = [
  {
    title: "Dedicated Email Deliverability Experts",
    subTitle: "Get personalized guidance to maximize inbox placement.",
  },

  {
    title: "Custom Deliverability Reports",
    subTitle: "Track your sending reputation and optimize performance.",
  },
  {
    title: "Automated IP & Domain Reputation Monitoring",
    subTitle: "Stay ahead of blacklisting risks with real-time alerts.",
  },
  {
    title: "Advanced Bounce & Feedback Loop Analysis",
    subTitle: "Reduce bounce rates and improve sender reputation.",
  },
  {
    title: "Comprehensive DMARC & BIMI Implementation",
    subTitle: "Secure your emails and build trust with recipients.",
  },
  {
    title: "ISP-Specific Strategies",
    subTitle: "Optimize deliverability for Gmail, Outlook, Yahoo, and more.",
  },
  {
    title: "Proactive Remediation",
    subTitle:
      "Get back into inboxes quickly with our blacklist removal assistance.",
  },
  {
    title: "Seamless Integration",
    subTitle:
      "Works with your existing ESPs, CRMs, and marketing automation tools",
  },
  {
    title: "Compliance & Security Assurance",
    subTitle: "Stay compliant with GDPR, CAN-SPAM, and RFC standards.",
  },
  {
    title:
      "SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, DANE, DNSSEC, RPKI, SSL, TLS, WHOIS & more",
    subTitle:
      "Prevent spoofing, secure your domain, optimize deliverability, and stay compliant with global email standards.",
  },
];

export default function ArticleCTASection() {
  return (
    <Container className="py-20 pb-10 px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Card Container */}
        <div className="relative rounded-3xl bg-background overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/cta-section-grid.png"
              alt="cta-background"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative px-8 py-20 md:px-20 md:text-center z-20">
            {/* Background gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-500/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

            {/* Heading with gradient text */}
            <h2 className="relative text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-8">
              Unlock Hassle-Free Email Delivery with Expert Support
            </h2>

            {/* Description with improved contrast */}
            <p className="text-xl text-gray-300/90 max-w-2xl md:mx-auto mb-12">
              Our Enterprise plans come with 24/7 access to our email
              deliverability and security specialists, ready to supercharge your
              inbox placement!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300/90 mb-10">
              {points.map((point, index) => (
                <div key={index} className="flex gap-2 text-left">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-1.5" />
                  <div>
                    <span className="text-lg font-medium">{point.title}</span>
                    <div className="text-sm">{point.subTitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xl text-gray-300/90 max-w-2xl md:mx-auto mb-12">
              Let our experts fine-tune your email infrastructure and maximize
              your ROI with flawless delivery! Reach Out Anytime via Email,
              Chat, or Phone
            </p>

            {/* CTA Button */}
            <Link href="/#pricing">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full group relative w-full md:w-auto"
              >
                Boost My Deliverability Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                {/* Button Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-blue-600/20 blur-lg rounded-full" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
