"use client";

import Button from "@/components/button";
import Container from "@/components/container";
import { Check, Mail, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import CTAForm from "./cta-form";

export default function HeroSection() {
  const reviews = [
    {
      stars: 5,
      name: "Priya Sharma",
      role: "Content Marketing Lead",
      image: "/avatars/avatar_female_07.png",
      quote:
        "As someone who sends weekly newsletters, the spam trigger detection has been invaluable. Haven't hit the spam folder since using it.",
    },
    {
      stars: 4,
      name: "Rajesh Kumar",
      role: "Email Marketing Specialist",
      image: "/avatars/avatar_male_11.png",
      quote:
        "The deliverability insights are incredible. I can now troubleshoot issues before they affect our campaigns. Setup took some time though.",
    },
    {
      stars: 5,
      name: "Amit Desai",
      quote:
        "InboxDoctor transformed our email deliverability! Our open rates skyrocketed after using their warmup tool, making our campaigns more effective than ever.",
      role: "Email Marketing Specialist",
      image: "/avatars/avatar_male_12.png",
    },
    {
      stars: 4,
      name: "Karan Malhotra",
      role: "Digital Campaign Specialist",
      image: "/avatars/avatar_male_05.png",
      quote:
        "InboxDoctor's warmup built mailbox credibility fast. Now our newsletters hit inboxes—perfect for a Digital Campaign Specialist!",
    },
    {
      stars: 4,
      name: "Suresh Nair",
      image: "/avatars/avatar_male_06.png",
      quote:
        "InboxDoctor warmed up our mailboxes, boosting engagement. Promotional emails now reach customers easily—great for e-commerce!",
      role: "E-commerce Operations Manager",
    },
    {
      stars: 5,
      name: "Tenzing Lepcha",
      quote:
        "New domain, no delivery—weeks of chaos. InboxDoctor sorted it out. I handle Email Ops; it's smooth sailing from here!",
      role: "Email Operations Specialist",
      image: "/avatars/avatar_male_07.png",
    },
    {
      stars: 5,
      name: "Anjali Mehta",
      role: "Content Strategy Director",
      image: "/avatars/avatar_female_08.png",
      quote:
        "Managing multiple newsletter campaigns was a nightmare before InboxDoctor. Now I can ensure every email lands in the primary inbox.",
    },
    {
      stars: 4,
      name: "Manish Thakur",
      quote:
        "At our startup, emails vanished into spam during a big pitch. InboxDoctor warmed them up—now, as Growth Lead, we land in inboxes perfectly!",
      role: "Growth Lead",
      image: "/avatars/avatar_male_09.png",
    },
  ];

  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  return (
    <section className="overflow-clip">
      <Container type="div" className="py-0 overflow-visible">
        {/* Sparkles Effect */}
        {/* <div className="absolute inset-0 h-[400px] w-full">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2}
          particleColor="#2563eb"
          particleDensity={100}
          speed={0.8}
          className="h-full w-full"
        />
      </div> */}

        {/* Grid Background */}
        {/* <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      /> */}

        <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div>

        {/* Decorative Elements */}
        {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-40 left-40 w-4 h-4 rotate-45 bg-primary-light blur-sm"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute top-80 right-60 w-4 h-4 rotate-45 bg-primary-light blur-sm"
      /> */}

        {/* Content */}
        <div className="relative mx-auto pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center max-w-[1200px] mx-auto space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm text-primary">
                Inbox Placement Optimizer
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold font-aspekta tracking-tight"
            >
              <span className="text-white">
                Boost Your Email Deliverability <br /> And Stay{" "}
              </span>
              <span className="bg-primary bg-clip-text text-transparent">
                Out of Spam
              </span>

              {/* <span className="text-white">with AI-Powered Intelligence</span> */}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Land in inboxes, not spam folders. Boost open rates and sender
              reputation with ease.
            </motion.p>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                {/* Avatars */}
                <div className="flex -space-x-3">
                  {reviews.map((review, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden transition-transform hover:scale-110 hover:z-10">
                        <Image
                          src={review.image || "/avatar_male_01.webp"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Review Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 z-50">
                        <div className="bg-[#0F1117] rounded-xl p-4 shadow-xl border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt={review.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                              <h4 className="text-white font-medium">
                                {review.name}
                              </h4>
                              <p className="text-gray-400 text-sm text-left">
                                {review.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(review.stars)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <p className="text-white text-left text-sm">
                            {review.quote}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Stars and Text */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-300">
                    Loved by 100+ professionals
                  </span>
                </div>
              </div>
              {selectedReview && (
                <div className="mt-4 p-4 bg-white/10 rounded-lg text-white">
                  <p>{selectedReview}</p>
                </div>
              )}
            </motion.div>

            {/* CTA Buttons */}
            {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-4 relative z-10"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 10px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="rounded-full"
              >
                <Button className="bg-primary hover:bg-primary-light text-white font-medium text-base px-8 py-3 transition-colors duration-200 rounded-full">
                  Book a Call
                </Button>
              </motion.div>
              <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 font-medium text-base px-8 py-3 transition-colors duration-200 rounded-full">
                7 Days Free Trial
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>7 Days Free Trial</span>
              </div>
            </div>
          </motion.div> */}

            <CTAForm />

            {/* App Screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative !mt-10"
            >
              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[15]" />
                <div className="z-0 w-[62%] absolute -top-[12.5%] lg:-top-[23.5%] bottom-auto left-1/2 -translate-x-1/2">
                  <Image
                    src="/glow-image.png"
                    alt="InboxDoctor Interface"
                    width={1400}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="relative rounded-[50%] blur-[150px] bg-primary aspect-square lg:aspect-[1194/378] z-0"></div>
              </div>
              <div className="relative z-10">
                <Image
                  src="/hero-image-mobile.png"
                  alt="InboxDoctor Interface"
                  width={767}
                  height={767}
                  className="rounded-xl lg:rounded-2xl shadow-2xl border border-primary/30 w-full z-10 lg:hidden"
                />
                <Image
                  src="/hero-image.png"
                  alt="InboxDoctor Interface"
                  width={1400}
                  height={600}
                  className="rounded-xl lg:rounded-2xl shadow-2xl border border-primary/30 w-full z-10 hidden lg:block"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
