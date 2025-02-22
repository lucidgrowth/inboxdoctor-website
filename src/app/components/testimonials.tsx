"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/infinity-moving-cards";

const testimonialsPart1 = [
  {
    name: "Michael Smith",
    role: "Newsletter Creator",
    image: "/avatars/avatar_male_01.webp",
    quote:
      "The spam score analysis caught issues I never knew existed. My emails now consistently reach the primary inbox instead of promotions.",
  },
  {
    name: "Sarah Johnson",
    role: "Content Marketing Lead",
    image: "/avatars/avatar_female_05.png",
    quote:
      "As someone who sends weekly newsletters, the spam trigger detection has been invaluable. Haven't hit the spam folder since using it.",
  },
  {
    name: "David Miller",
    role: "Email Marketing Specialist",
    image: "/avatars/avatar_male_02.webp",
    quote:
      "The deliverability insights are incredible. I can now troubleshoot issues before they affect our campaigns. Setup took some time though.",
  },
  {
    name: "Michael Smith",
    role: "Newsletter Creator",
    image: "/avatars/avatar_male_01.webp",
    quote:
      "The spam score analysis caught issues I never knew existed. My emails now consistently reach the primary inbox instead of promotions.",
  },
  {
    name: "Sarah Johnson",
    role: "Content Marketing Lead",
    image: "/avatars/avatar_female_05.png",
    quote:
      "As someone who sends weekly newsletters, the spam trigger detection has been invaluable. Haven't hit the spam folder since using it.",
  },
  {
    name: "David Miller",
    role: "Email Marketing Specialist",
    image: "/avatars/avatar_male_02.webp",
    quote:
      "The deliverability insights are incredible. I can now troubleshoot issues before they affect our campaigns. Setup took some time though.",
  },
];

const testimonialsPart2 = [
  {
    name: "Emily Chen",
    role: "Content Strategy Director",
    image: "/avatars/avatar_female_02.webp",
    quote:
      "Managing multiple newsletter campaigns was a nightmare before InboxDoctor. Now I can ensure every email lands in the primary inbox.",
  },
  {
    name: "William Taylor",
    role: "Digital Content Producer",
    image: "/avatars/avatar_male_03.webp",
    quote:
      "The content optimization suggestions are brilliant. It helps me write engaging newsletters that actually reach subscribers.",
  },
  {
    name: "Jane Wilson",
    role: "Substack Writer",
    image: "/avatars/avatar_female_03.webp",
    quote:
      "Perfect for independent writers like me. Went from 62% to 98% inbox placement rate. The authentication setup guide was super helpful.",
  },
  {
    name: "Emily Chen",
    role: "Content Strategy Director",
    image: "/avatars/avatar_female_02.webp",
    quote:
      "Managing multiple newsletter campaigns was a nightmare before InboxDoctor. Now I can ensure every email lands in the primary inbox.",
  },
  {
    name: "William Taylor",
    role: "Digital Content Producer",
    image: "/avatars/avatar_male_03.webp",
    quote:
      "The content optimization suggestions are brilliant. It helps me write engaging newsletters that actually reach subscribers.",
  },
  {
    name: "Jane Wilson",
    role: "Substack Writer",
    image: "/avatars/avatar_female_03.webp",
    quote:
      "Perfect for independent writers like me. Went from 62% to 98% inbox placement rate. The authentication setup guide was super helpful.",
  },
];

export default function TestimonialsSection() {
  return (
    <div
      id="testimonials"
      className="relative py-20 overflow-hidden bg-background"
    >
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <span className="text-sm text-blue-400">Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4"
          >
            What Our Users are Saying
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl">
            Hear from satisfied users about their experience with InboxDoctor
          </p>
        </div>

        <div className="space-y-2">
          <InfiniteMovingCards
            items={testimonialsPart1}
            direction="right"
            speed="slow"
            pauseOnHover={false}
          />
          <InfiniteMovingCards
            items={testimonialsPart2}
            direction="left"
            speed="slow"
            pauseOnHover={false}
          />
        </div>
      </div>
    </div>
  );
}
