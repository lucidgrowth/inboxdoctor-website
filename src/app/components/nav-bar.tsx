"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50  bg-background/10 backdrop-blur-md"
    >
      <Container className="flex items-center justify-between lg:px-20 py-4 bg-transparent">
        <Link
          href="/"
          className="flex items-center space-x-2 relative h-[50px] w-[200px]"
        >
          <Image
            src="/id-logo.png"
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
            // size=""
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full group relative"
          >
            Book a Call
          </Button>
        </Link>
      </Container>
    </motion.nav>
  );
}
