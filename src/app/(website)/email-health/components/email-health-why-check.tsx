"use client";

import Container from "@/components/container";
import { BarChart3, CheckCircle, Mail, Shield } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Shield,
    title: "Protects Against Deliverability Issues",
    description:
      "Regular checks identify issues with SPF, DKIM, and DMARC that could send your emails to spam, ensuring they land in the inbox.",
  },
  {
    icon: Mail,
    title: "Enhances Email Security",
    description:
      "Evaluate security settings like DANE and TLS to safeguard your domain from phishing or unauthorized email attempts.",
  },
  {
    icon: BarChart3,
    title: "Improves Inbox Placement Rates",
    description:
      "Monitor domain age and blacklist status to boost your reputation, increasing the likelihood of higher open rates.",
  },
  {
    icon: CheckCircle,
    title: "Provides Actionable Insights",
    description:
      "Get a detailed report with scores, failed checks, and recommendations to optimize your email performance.",
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
            <span className="text-sm text-primary">Why Check?</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Why Run an Email Domain Health Test?
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            Ensure your emails reach the inbox by evaluating critical domain
            health factors like authentication, security, and reputation.
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
