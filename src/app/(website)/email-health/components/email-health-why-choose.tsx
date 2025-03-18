"use client";

import Container from "@/components/container";
import { ChartLine, Headphones, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    key: 1,
    icon: Lock,
    title: "95% Security Improvement",
    description:
      "Our customers see dramatic improvements in email security and deliverability",
  },
  {
    key: 2,
    icon: ChartLine,
    title: "Comprehensive Analysis",
    description:
      "Get detailed insights into your domain's email authentication setup",
  },
  {
    key: 3,
    icon: Shield,
    title: "Phishing Protection",
    description:
      "Identify and fix vulnerabilities that could lead to domain spoofing",
  },
  {
    key: 4,
    icon: Headphones,
    title: "Expert Support",
    description:
      "Our team of security experts is ready to help you implement fixes",
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">Why Choose Us</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Why Choose InboxDoctor?
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            We are a team of email experts who are dedicated to providing the
            best email health check service to our customers.
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
                <feature.icon className="mr-4 mt-1 text-primary size-8" />
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

export default EmailHealthWhyChoose;
