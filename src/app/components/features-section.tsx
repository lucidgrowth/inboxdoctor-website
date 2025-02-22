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
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type Feature = {
  badge: string;
  name: string;
  description: string;
  icon: React.ElementType;
  image: string;
};

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      badge: "Mailboxes",
      name: "Unified Email Management",
      description:
        "Connect, monitor, and switch between multiple email accounts seamlessly. Our unified dashboard provides centralized control, real-time synchronization, and easy account switching capabilities.",
      icon: Inbox,
      image: "/mailbox-image-full.png",
    },
    {
      badge: "Postmaster",
      name: "Email Reputation Insights",
      description:
        "Monitor bounce rates, spam complaints, and deliverability trends in detail. Get comprehensive analytics on sender reputation, engagement metrics, and actionable recommendations for improvement.",
      icon: ShieldCheck,
      image: "/mailbox-image-full.png",
    },
    {
      badge: "Email Health",
      name: "Health Monitoring",
      description:
        "Stay ahead with automated alerts and optimization suggestions. Receive real-time notifications about potential deliverability issues, blacklist monitoring, and proactive recommendations to maintain optimal email performance.",
      icon: HeartPulse,
      image: "/mailbox-image-full.png",
    },
    {
      badge: "Seed List",
      name: "Inbox Placement Testing",
      description:
        "Analyze which folders (Inbox, Spam, Promotions) your emails land in across multiple email providers. Test deliverability with real-world seed addresses and get detailed placement reports before sending campaigns.",
      icon: TestTube,
      image: "/mailbox-image-full.png",
    },
    {
      badge: "Templates",
      name: "Smart Email Templates",
      description:
        "Save time with customizable email templates enhanced by AI-powered suggestions. Get intelligent recommendations for subject lines, content optimization, and timing to maximize engagement and response rates.",
      icon: FileText,
      image: "/mailbox-image-full.png",
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
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <span className="text-sm text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-semibold text-white mb-6">
            Designed for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
              Email Deliverability and Warm-up
            </span>
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto">
            It helps users improve inbox placement, reduce spam folder rates,
            and improve email sending reputation.
          </p>
        </motion.div>

        <div className="grid gap-24">
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
            <div className="z-2 bg-gradient-to-b from-[var(--color-primary--background)] to-[var(--color-primary--background)] [background-origin:border-box] [background-clip:padding-box,border-box] border border-transparent rounded-[20px] relative overflow-hidden">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.name}
                height={767}
                width={479}
                className="object-contain w-full h-full"
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
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "gap-8 justify-between items-center pt-12 pb-12 flex",
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* text */}
      <div
        className={cn(
          "gap-6 flex flex-col w-[45%] max-w-[488px] ",
          index % 2 === 0 ? "ml-12" : "mr-12"
        )}
      >
        <div className="gap-4 flex flex-col justify-start items-start">
          <div className="gap-2 bg-primary/20 rounded-[100px] flex-none justify-center items-center p-2 px-4 flex">
            <feature.icon className="w-4 h-4 text-white" />
            <span className="text-sm text-white">{feature.badge}</span>
          </div>
          <h3 className="text-5xl font-bold text-white bg-clip-text text-transparent pb-3">
            {feature.name}
          </h3>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* image wrapper */}
      <div className="w-1/2 max-w-[576px] relative">
        {/* image  */}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[15]" />

        {/* aspect-[574/449] */}

        <div className="z-10 relative w-full overflow-hidden aspect-video rounded-2xl border border-primary">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.name}
            fill
            className="object-contain w-full h-full object-top"
          />
        </div>
        {/* glow */}
        {/* <div className="z-[20] pointer-events-none absolute -inset-[8%] inset-x-[7%] inset-y-auto">
          <Image
            src="/glow-image-sm.png"
            alt="InboxDoctor Interface"
            fill
            className="object-contain w-full h-full"
          />
        </div> */}

        <div
          className="z-0 pointer-events-none w-[150%] absolute inset-0"
          style={{
            top: "-525px",
            left: "-142px",
          }}
        >
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
