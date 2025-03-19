"use client";

import Container from "@/components/container";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

const HowItWorks = ({
  data,
}: {
  data: {
    id: string;
    badge: string;
    heading: string;
    description: string;
    steps: {
      step: number;
      image: string;
      title: string;
      description: string;
    }[];
  };
}) => {
  return (
    <Container id={data.id}>
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
            <span className="text-sm text-primary">{data.badge}</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            {data?.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data?.steps.map((step) => (
            <motion.div
              className="hiw-card"
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: step.step * 0.3 }}
              viewport={{ once: true }}
            >
              {/* image */}
              <div className="aspect-square h-[300px] w-full relative rounded-xl">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

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

export default HowItWorks;
