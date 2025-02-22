"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/infinity-moving-cards";

const testimonials = [
  {
    name: "Michael Smith",
    role: "Sales Executive at Global Enterprises",
    image: "/avatars/avatar_male_01.webp",
    quote:
      "I love how InboxDoctor integrates with my workflow. It saves me so much time and prevents delivery issues completely.",
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Director at Tech Innovators",
    image: "/avatars/avatar_female_01.webp",
    quote:
      "InboxDoctor has revolutionized our email campaigns. Our delivery rates have improved significantly with minimal effort.",
  },
  {
    name: "David Miller",
    role: "Operations Manager at Efficiency Experts",
    image: "/avatars/avatar_male_02.webp",
    quote:
      "The email optimization features are highly reliable and efficient. It has streamlined our process and reduced bounce rates dramatically.",
  },
  {
    name: "Emily Chen",
    role: "CEO at Digital Solutions",
    image: "/avatars/avatar_female_02.webp",
    quote:
      "As a CEO, email deliverability is crucial. InboxDoctor helps me ensure our messages reach their intended recipients every time.",
  },
  {
    name: "William Taylor",
    role: "Head of Sales at Growth Corp",
    image: "/avatars/avatar_male_03.webp",
    quote:
      "The AI-powered features have transformed our email strategy. It's like having a dedicated email expert on the team.",
  },
  {
    name: "Jane Wilson",
    role: "Marketing Lead at Creative Solutions",
    image: "/avatars/avatar_female_03.webp",
    quote:
      "InboxDoctor revolutionized our email workflows. It's like having a personal deliverability consultant working around the clock!",
  },
];

export default function TestimonialsSection() {
  return (
    <div id="testimonials" className="relative py-20 overflow-hidden bg-background">
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
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={false}
          />
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover={false}
          />
        </div>
      </div>
    </div>
  );
}
