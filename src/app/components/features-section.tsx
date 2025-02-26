"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import {
  FileText,
  HeartPulse,
  Inbox,
  Plug,
  ShieldCheck,
  Tag,
  TestTube,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Feature = {
  id: number;
  badge: string;
  name: string;
  description: string;
  icon: React.ElementType;
  image: string;
  images: string[];
};

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      id: 1,
      badge: "Mailboxes",
      name: "Effortless Email Account Management",
      description:
        "Easily connect, manage, and monitor multiple mailboxes in one centralized dashboard. Track connection status, SMTP settings, and warm-up activity in real time for improved email deliverability.",
      icon: Inbox,
      image: "/features/mailboxes/mailbox-main.png",
      images: [
        "/features/mailboxes/mailbox-main.png",
        "/features/mailboxes/mailbox-details.png",
        "/features/mailboxes/mailbox-sender-profile.png",
      ],
    },
    {
      id: 2,
      badge: "Postmaster",
      name: "Email Reputation Insights",
      description:
        "Monitor domain reputation, spam rates, and IP health in one place. Stay ahead of deliverability issues with real-time analytics and actionable recommendations to maintain a high sender reputation.",
      icon: ShieldCheck,
      image: "/features/postmaster/postmaster-main.png",
      images: [
        "/features/postmaster/postmaster-main.png",
        "/features/postmaster/spam-rate.png",
        "/features/postmaster/ip-reputation.png",
        "/features/postmaster/domain-reputation.png",
        "/features/postmaster/authentication.png",
        "/features/postmaster/encryption.png",
        "/features/postmaster/delivery-error.png",
        "/features/postmaster/feedback-loop.png",
      ],
    },
    {
      id: 3,
      badge: "Email Health",
      name: "Ensure Maximum Deliverability",
      description:
        "Get a complete assessment of your email infrastructure with real-time diagnostics to prevent spam issues and deliverability failures.",
      icon: HeartPulse,
      image: "/features/email-health/email-health-main.png",
      images: [
        "/features/email-health/email-health-main.png",
        "/features/email-health/details.png",
        "/features/email-health/test-email.png",
      ],
    },
    {
      id: 4,
      badge: "Seed List",
      name: "Improve Your Email Deliverability",
      description:
        "Ensure your emails reach the right inboxes by testing deliverability across a network of trusted seed mailboxes.",
      icon: TestTube,
      image: "/features/seed-list/seed-list-main.png",
      images: [
        "/features/seed-list/seed-list-main.png",
        "/features/seed-list/seed-list-details.png",
      ],
    },
    {
      id: 5,
      badge: "Templates",
      name: "Optimize Your Email Content",
      description:
        "Craft high-performing email templates with personalization, structure analysis, and spam detection to improve inbox placement.",
      icon: FileText,
      image: "/features/templates/template-main.png",
      images: [
        "/features/templates/template-main.png",
        "/features/templates/template-text.png",
        "/features/templates/template-html.png",
      ],
    },
  ];

  return (
    <Container id="features">
      {/* Ambient background glow */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" /> */}

      {/* Grid overlay */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      /> */}

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <span className="text-sm text-primary">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6">
            Designed for <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
              Email Deliverability and Warm-up
            </span>
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto">
            It helps users improve inbox placement, reduce spam folder rates,
            and improve email sending reputation.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:gap-24">
          {features.map((feature, index) => (
            <FeatureItem2 key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

function FeatureItem({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col gap-16 ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center`}
    >
      <div className="flex-1 lg:max-w-[45%] relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-400/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <feature.icon className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            {feature.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            {feature.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Image */}
      {/* wrapper */}
      <div className="w-1/2 max-w-[576px] relative">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotateY: 0 }
              : { opacity: 0, scale: 0.9, rotateY: 30 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video w-full perspective-1000"
        >
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 aspect-video group">
            <div className="z-2 bg-gradient-to-b from-[var(--primary)] to-[var(--primary)] [background-origin:border-box] [background-clip:padding-box,border-box] border border-transparent rounded-[20px] relative overflow-hidden">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.name}
                height={767}
                width={479}
                className="object-contain object-top w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeatureItem2({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return; // Don't set interval if hovering

    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % feature.images.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [feature.images.length, isHovering]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "gap-8 flex-col justify-between items-center pt-12 pb-12 flex",
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* text */}
      <div
        className={cn(
          "gap-6 flex flex-col w-full lg:w-[45%] max-w-[488px] relative z-10 ",
          index % 2 === 0 ? "lg:ml-12" : "lg:mr-12"
        )}
      >
        <div className="gap-4 flex flex-col justify-center lg:justify-start items-center lg:items-start">
          <div className="gap-2 bg-primary/20 rounded-[100px] flex-none justify-center items-center p-2 px-4 flex">
            <feature.icon className="w-4 h-4 text-white" />
            <span className="text-sm text-white uppercase">
              {feature.badge}
            </span>
          </div>
          <h3 className="text-center lg:text-left text-3xl md:text-5xl font-semibold text-white bg-clip-text text-transparent pb-3">
            {feature.name}
          </h3>
        </div>
        <p className="text-center lg:text-left text-gray-300 lg:text-lg leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* image wrapper */}
      <div
        className="lg:w-1/2 w-full max-w-[576px] relative z-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* image  */}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[15]" />

        {/* aspect-[574/449] */}

        <div className="z-10 relative w-full overflow-hidden aspect-video rounded-2xl border border-primary bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={feature.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${feature.name} ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
          {/* <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.name}
            fill
            className="object-contain w-full h-full object-top"
          /> */}
        </div>
        {/* glow */}
        <div className="z-[9] pointer-events-none absolute inset-[-11%_7%_auto]">
          <Image
            src="/glow-image-sm.png"
            alt="InboxDoctor Interface"
            height={72}
            width={495}
            className="object-contain w-full h-full"
          />
        </div>
        {/* Image indicator dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {feature.images.map((dotIndex, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full cursor-pointer",
                currentImageIndex === index ? "bg-primary" : "bg-white/50"
              )}
              initial={false}
              animate={{
                scale: currentImageIndex === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        <div className="z-0 pointer-events-none w-[150%] absolute inset-0 lg:top-[-525px] top-[-285px] left-[-90px] lg:left-[-142px]">
          <img
            src="/light-spot-grid.png"
            alt="InboxDoctor Interface"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
