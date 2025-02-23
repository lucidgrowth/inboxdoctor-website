"use client";

import Container from "@/components/container";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

export default function ComparisonSection() {
  const features = [
    {
      id: 9,
      name: "Gated & Vetted Warmup Pool Access",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 10,
      name: "Dedicated Warmup Seed Pool for Enterprise",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 11,
      name: "Near Real-Time Warmup Analytics",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 12,
      name: "Largest & Widest Seed Email Warmup Pool",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 13,
      name: "Premium Seed Accounts Across USA",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 14,
      name: "Set Your Warmup Email Open Rates, Time Window & Speed",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 15,
      name: "Higher Warmup Email Send Rates",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 16,
      name: "No IMAP-Based Warmup Engagement",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 17,
      name: "GUI-Based Warmup Engagement on Mobile & Laptop",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 18,
      name: "Seed Accounts Connected on Mobile & Laptop",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 19,
      name: "Send Emails on Your Schedule & Timezone",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 20,
      name: "Send Warmup Emails with Your Own Template",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 21,
      name: "Do Warmup in Your Own Languages",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 22,
      name: "Unlimited Google Postmaster Integration",
      inboxDoctor: true,
      others: false,
    },
    {
      id: 23,
      name: "Email Coach - Score & Optimize Your Email Templates",
      inboxDoctor: true,
      others: false,
    },
  ];

  return (
    <Container id="comparison">
      {/* Subtle grid overlay */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      /> */}

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
            <span className="text-sm text-primary">Comparison</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            How Do We Compare To
            <br />
            <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
              Inbox Providers
            </span>
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            We compare InboxDoctor to the leading email providers to help you
            choose the best fit for your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-x-auto"
        >
          <div className="min-w-[500px] max-w-[800px] mx-auto">
            <div className="flex flex-col gap-px bg-white/10">
              {/* Header */}
              <div className="flex">
                <div className="bg-background p-6 w-[150px] lg:w-[250px] shrink-0">
                  <span className="sr-only">Feature</span>
                </div>
                <div className="bg-background p-4 lg:p-6 min-w-[100px] lg:min-w-[150px] flex-1">
                  <h3 className="text-sm lg:text-lg font-semibold text-primary text-center whitespace-nowrap">
                    InboxDoctor
                  </h3>
                </div>
                <div className="bg-background p-4 lg:p-6 min-w-[100px] lg:min-w-[150px] flex-1">
                  <h3 className="text-sm lg:text-lg font-semibold text-gray-400 text-center whitespace-nowrap">
                    Others
                  </h3>
                </div>
              </div>

              {/* Features */}
              {features.map((feature, index) => (
                <div key={feature.id} className="flex w-full">
                  <div className="bg-background p-6 w-[150px] lg:w-[250px] border-t border-white/10 shrink-0">
                    <p className="text-white text-sm lg:text-lg">
                      {feature.name}
                    </p>
                  </div>
                  <div className="bg-background p-4 lg:p-6 border-t min-w-[100px] flex items-center justify-center border-white/10 flex-1">
                    <div className="flex justify-center">
                      {feature.inboxDoctor ? (
                        <Check className="w-6 h-6 text-primary" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="bg-background p-4 lg:p-6 border-t flex items-center justify-center min-w-[100px] border-white/10 flex-1">
                    <div className="flex justify-center">
                      {feature.others ? (
                        <Check className="w-6 h-6 text-gray-400" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
