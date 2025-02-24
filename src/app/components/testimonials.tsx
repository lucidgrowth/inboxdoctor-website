"use client";

import { InfiniteMovingCards } from "@/components/infinity-moving-cards";
import { motion } from "motion/react";

const testimonialsPart1 = [
  {
    name: "Priya Sharma",
    role: "Content Marketing Lead",
    image: "/avatars/avatar_female_07.png",
    quote:
      "As someone who sends weekly newsletters, the spam trigger detection has been invaluable. Haven't hit the spam folder since using it.",
  },
  {
    name: "Rajesh Kumar",
    role: "Email Marketing Specialist",
    image: "/avatars/avatar_male_11.png",
    quote:
      "The deliverability insights are incredible. I can now troubleshoot issues before they affect our campaigns. Setup took some time though.",
  },
  {
    name: "Amit Desai",
    quote:
      "InboxDoctor transformed our email deliverability! Our open rates skyrocketed after using their warmup tool, making our campaigns more effective than ever.",
    role: "Email Marketing Specialist",
    image: "/avatars/avatar_male_12.png",
  },
  {
    name: "Karan Malhotra",
    role: "Digital Campaign Specialist",
    image: "/avatars/avatar_male_05.png",
    quote:
      "InboxDoctor's warmup built mailbox credibility fast. Now our newsletters hit inboxes—perfect for a Digital Campaign Specialist!",
  },
  {
    name: "Suresh Nair",
    image: "/avatars/avatar_male_06.png",
    quote:
      "InboxDoctor warmed up our mailboxes, boosting engagement. Promotional emails now reach customers easily—great for e-commerce!",
    role: "E-commerce Operations Manager",
  },
];

const testimonialsPart2 = [
  {
    name: "Tenzing Lepcha",
    quote:
      "New domain, no delivery—weeks of chaos. InboxDoctor sorted it out. I handle Email Ops; it's smooth sailing from here!",
    role: "Email Operations Specialist",
    image: "/avatars/avatar_male_07.png",
  },
  {
    name: "Anjali Mehta",
    role: "Content Strategy Director",
    image: "/avatars/avatar_female_08.png",
    quote:
      "Managing multiple newsletter campaigns was a nightmare before InboxDoctor. Now I can ensure every email lands in the primary inbox.",
  },
  {
    name: "Manish Thakur",
    quote:
      "At our startup, emails vanished into spam during a big pitch. InboxDoctor warmed them up—now, as Growth Lead, we land in inboxes perfectly!",
    role: "Growth Lead",
    image: "/avatars/avatar_male_09.png",
  },
  {
    name: "Meera Patel",
    role: "Substack Writer",
    image: "/avatars/avatar_female_09.png",
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
            Hear from satisfied users about their experience with InboxDoctor.
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
