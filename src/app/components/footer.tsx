"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Facebook,
  Inbox,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="max-w-[400px]">
              <Link
                href="/"
                className="flex items-center space-x-2 relative h-[66px] w-[250px] mb-4"
              >
                <Image
                  src="/id-logo.png"
                  alt="InboxDoctor Logo"
                  fill
                  className="w-full h-full object-contain"
                />
              </Link>
              <p className="text-gray-400 mb-6">
                Revolutionizing email deliverability with AI-powered solutions.
                Ensure your messages reach the right inboxes, every time.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                  <span className="sr-only">Youtube</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#benefits"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/gdpr"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400">
            © {currentYear} InboxDoctor. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
