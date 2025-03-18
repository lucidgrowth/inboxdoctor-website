"use client";

import Container from "@/components/container";
import { BarChart3, CheckCircle, Mail, Shield } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Shield,
    title: "Protects Your Domain Reputation",
    description:
      "Scanning your domain helps prevent phishing or spamming attempts that can harm your reputation.",
  },
  {
    icon: Mail,
    title: "Ensures Email Deliverability",
    description:
      "Regular scans identify issues with DMARC, DKIM, SPF, and BIMI records that could disrupt email delivery.",
  },
  {
    icon: BarChart3,
    title: "Improves Email Open Rates",
    description:
      "Verifying BIMI records are properly configured boosts visibility and trust with your recipients.",
  },
  {
    icon: CheckCircle,
    title: "Meets Email Authentication Standards",
    description:
      "Domain checks ensure your domain complies with industry standards and best practices for email security.",
  },
];

const EmailHealthWhyCheck = () => {
  return (
    <Container id="why-check">
      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-[763px] w-full mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">Why Check</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Why Check <span className="text-primary">Domain Security?</span>
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            Your domain&apos;s security is vital for safeguarding your brand,
            ensuring email deliverability, and maintaining trust with your
            audience. Regularly scanning your domain for DMARC, DKIM, SPF, and
            BIMI records helps you stay proactive against potential threats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((feature, index) => (
            <motion.div
              className="rounded-xl  backdrop-blur-sm p-6"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {/* image */}
              <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-4 bg-white/[0.03] rounded-full size-16 justify-center">
                  <feature.icon className="text-primary size-8 shrink-0" />
                </div>
                <div className="flex flex-col gap-2 text-foreground">
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-base text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EmailHealthWhyCheck;
