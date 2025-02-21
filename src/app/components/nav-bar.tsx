"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Inbox } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/10 backdrop-blur-md"
    >
      <Link href="/" className="flex items-center space-x-2 relative h-[45px] w-[200px]">
        <Image
          src="/id-logo.png"
          alt="InboxDoctor Logo"
          fill
          className="w-full h-full object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="#features"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-gray-300 hover:text-white transition-colors"
        >
          How It Works
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

      <Link
        href="/get-started"
        className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
      >
        Book a Call
      </Link>
    </motion.nav>
  );
}
