"use client";

import Container from "@/components/container";
import { motion } from "motion/react";
import React from "react";

type Props = {};

const steps = [
  {
    step: 1,
    title: "Initiate Your Test with a Unique Email",
    description:
      "Copy the provided test email address, compose an email from your domain, send it, check the confirmation box, and click 'View Results' to start the analysis.",
  },
  {
    step: 2,
    title: "Unlock a Detailed Health Report",
    description:
      "Sit back as our system evaluates your domain's authentication, security, and deliverability, generating a comprehensive report tailored to your email setup.",
  },
  {
    step: 3,
    title: "Explore and Download Your Results",
    description:
      "Access your personalized report on the results page, review key insights, and download it for further action or record-keeping.",
  },
];

const EmailHealthHIW = (props: Props) => {
  return (
    <Container id="how-it-works">
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
            <span className="text-sm text-primary">Three Simple Steps</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            Our domain health check process is quick, secure, and provides
            actionable insights to improve your email security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div
              className="hiw-card"
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: step.step * 0.3 }}
              viewport={{ once: true }}
            >
              {/* image */}
              <div className="aspect-square h-[300px] w-full relative"></div>

              <div className="flex flex-col gap-4 text-foreground">
                <div className="rounded-full bg-primary/10 px-4 py-2 uppercase text-sm text-white/90 w-fit">
                  STEP {step.step}
                </div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-base text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EmailHealthHIW;
