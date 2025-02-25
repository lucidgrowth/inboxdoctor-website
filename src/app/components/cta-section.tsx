"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/container";
import { bookingLink } from "@/lib/constants";
import Link from "next/link";

export default function CTASection() {
  return (
    <Container className="py-32 pb-10 px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Card Container */}
        <div className="relative rounded-3xl bg-background overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/cta-section-grid.png"
              alt="grid background"
              fill
              className="object-cover"
            />
          </div>

          {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[15]" /> */}

          {/* Gradient Overlays */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" /> */}

          {/* Corner Glows */}
          {/* <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" /> */}

          {/* Grid Background
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          /> */}

          {/* Content */}
          <div className="relative px-8 py-20 md:px-20  text-center z-20">
            {/* Background gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-500/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

            {/* Logo Icon with enhanced styling */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <Image
                  src="/id-logo-sq.png"
                  alt="InboxDoctor Logo"
                  width={80}
                  height={80}
                />
              </div>
            </div>

            {/* Heading with gradient text */}
            <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-8">
              Ready to Transform
              <br />
              Your Email Deliverability?
            </h2>

            {/* Description with improved contrast */}
            <p className="text-xl text-gray-300/90 max-w-2xl mx-auto mb-12">
              Join thousands of professionals who have already optimized their
              email campaigns with InboxDoctor.
            </p>

            {/* CTA Button */}
            <Link href={bookingLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full group relative"
              >
                Book a Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                {/* Button Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-blue-600/20 blur-lg rounded-full" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
