"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Inbox } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/10 backdrop-blur-md"
    >
      <Link
        href="/"
        className="flex items-center space-x-2 relative h-[45px] w-[200px]"
      >
        <Image
          src="/id-logo-full-blue.png"
          alt="InboxDoctor Logo"
          fill
          className="w-full h-full object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="#benefits"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Benefits
        </Link>
        <Link
          href="#features"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Features
        </Link>
        <Link
          href="#testimonials"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Testimonials
        </Link>
        <Link
          href="#pricing"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="#faq"
          className="text-gray-300 hover:text-white transition-colors"
        >
          FAQ
        </Link>
      </div>

      <Link href="/get-started">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-lg rounded-full group relative"
        >
          Book a Call
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          {/* Button Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-blue-600/20 blur-lg rounded-full" />
        </Button>
      </Link>
    </motion.nav>
  );
}
