"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { bookingLink } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/email-health",
    label: "Email Health Test",
  },
  {
    href: "/inbox-placement",
    label: "Inbox Placement Test",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  // {
  //   href: "/#faq",
  //   label: "FAQ",
  // },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50  bg-background/10 backdrop-blur-md"
    >
      <Container className="flex items-center justify-between lg:px-20 py-4 bg-transparent relative">
        <Link
          href="/"
          className="flex items-center space-x-2 relative h-[40px] lg:h-[50px] w-[150px] lg:w-[200px]"
        >
          <Image
            src="/id-logo.png"
            alt="InboxDoctor Logo"
            fill
            className="w-full h-full object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {/* <Link
            href="/#benefits"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Benefits
          </Link> */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[64px] px-2 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/10 py-2 md:hidden z-50"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-4">
                <Link
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    // size=""
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full group relative"
                  >
                    Book a Call
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Link
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
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
