"use client";

import Container from "@/components/container";
import { Brain, ChartLine, Headphones, Lock, Rocket, Shield } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    key: 1,
    icon: ChartLine,
    title: "Inbox Placement Guarantee",
    description:
      "Stop guessing if your emails will reach the inbox. Our real-time email placement tests ensure maximum deliverability.",
  },
  {
    key: 2,
    icon: Shield,
    title: "Complete Email Security & Compliance",
    description:
      "Shield your domain from phishing, spoofing, and unauthorized use with advanced SPF, DKIM, DMARC, and DANE validation.",
  },
  {
    key: 3,
    icon: Lock,
    title: "Advanced Mail Server Monitoring",
    description:
      "Keep your SMTP, MX, and DNS records optimized to prevent downtime, email rejections, or slow delivery.",
  },
  {
    key: 4,
    icon: Rocket,
    title: "Deliverability & Reputation Booster",
    description:
      "Track blacklists, IP reputation, and bounce rates to keep your sending domains and mail servers trusted.",
  },
  {
    key: 5,
    icon: Brain,
    title: "AI-Powered Email Analytics",
    description:
      "Get deep, data-driven insights on your email campaigns, sender reputation, and authentication setup.",
  },
  {
    key: 6,
    icon: Headphones,
    title: "Enterprise-Grade Support & Consulting",
    description:
      "Our email experts provide 24/7 support, troubleshooting, and guidance to keep your emails performing at their best.",
  },
];

const EmailHealthWhyChoose = () => {
  return (
    <Container id="why-choose-us">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">Why Choose Us</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Why Choose InboxDoctor?
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            InboxDoctor is more than just an email health check—it's the
            ultimate platform for businesses to secure, optimize, and maximize
            their email performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((feature, index) => (
            <motion.div
              className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6"
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {/* image */}

              <div className="flex items-start">
                <feature.icon className="mr-4 mt-1 text-primary size-8 shrink-0" />
                <div className="flex flex-col gap-2 text-foreground">
                  <h3 className="text-xl font-medium">{feature.title}</h3>
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

export default EmailHealthWhyChoose;
