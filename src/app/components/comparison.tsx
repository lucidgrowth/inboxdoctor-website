"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

export default function ComparisonSection() {
  const features = [
    {
      id: 1,
      name: "Higher Email Send Rates",
      inboxDoctor: true,
      warmy: false,
      inboxAlly: false,
      folderly: false,
      warmupIp: false,
    },
    {
      id: 2,
      name: "AI-Powered Warmup",
      inboxDoctor: true,
      warmy: true,
      inboxAlly: false,
      folderly: true,
      warmupIp: false,
    },
    {
      id: 3,
      name: "Real-Time Analytics",
      inboxDoctor: true,
      warmy: true,
      inboxAlly: true,
      folderly: true,
      warmupIp: true,
    },
    {
      id: 4,
      name: "Dedicated Support",
      inboxDoctor: true,
      warmy: false,
      inboxAlly: false,
      folderly: false,
      warmupIp: false,
    },
    {
      id: 5,
      name: "Custom Warmup Rules",
      inboxDoctor: true,
      warmy: false,
      inboxAlly: false,
      folderly: true,
      warmupIp: false,
    },
    {
      id: 6,
      name: "Spam Testing",
      inboxDoctor: true,
      warmy: true,
      inboxAlly: true,
      folderly: true,
      warmupIp: false,
    },
    {
      id: 7,
      name: "Domain Health Monitoring",
      inboxDoctor: true,
      warmy: true,
      inboxAlly: true,
      folderly: true,
      warmupIp: true,
    },
    {
      id: 8,
      name: "Free Domain Replacement",
      inboxDoctor: true,
      warmy: false,
      inboxAlly: false,
      folderly: false,
      warmupIp: false,
    },
  ];

  return (
    <div className="relative py-20 overflow-hidden bg-background">
      {/* Subtle grid overlay */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      /> */}

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 w-[763px] mx-auto"
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
          <div className="">
            <div className="grid grid-cols-5 gap-px bg-white/10">
              {/* Header */}
              <div className="bg-background p-6">
                <span className="sr-only">Feature</span>
              </div>
              <div className="bg-background p-6">
                <h3 className="text-lg font-semibold text-primary text-center">
                  InboxDoctor
                </h3>
              </div>
              <div className="bg-background p-6">
                <h3 className="text-lg font-semibold text-gray-400 text-center">
                  Warmy.io
                </h3>
              </div>
              <div className="bg-background p-6">
                <h3 className="text-lg font-semibold text-gray-400 text-center">
                  InboxAlly
                </h3>
              </div>
              <div className="bg-background p-6">
                <h3 className="text-lg font-semibold text-gray-400 text-center">
                  Folderly
                </h3>
              </div>

              {/* Features */}
              {features.map((feature, index) => (
                <React.Fragment key={feature.id}>
                  <div className="bg-background p-6 border-t border-white/10">
                    <p className="text-white">{feature.name}</p>
                  </div>
                  <div className="bg-background p-6 border-t border-white/10">
                    <div className="flex justify-center">
                      {feature.inboxDoctor ? (
                        <Check className="w-6 h-6 text-primary" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="bg-background p-6 border-t border-white/10">
                    <div className="flex justify-center">
                      {feature.warmy ? (
                        <Check className="w-6 h-6 text-gray-400" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="bg-background p-6 border-t border-white/10">
                    <div className="flex justify-center">
                      {feature.inboxAlly ? (
                        <Check className="w-6 h-6 text-gray-400" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="bg-background p-6 border-t border-white/10">
                    <div className="flex justify-center">
                      {feature.folderly ? (
                        <Check className="w-6 h-6 text-gray-400" />
                      ) : (
                        <X className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
