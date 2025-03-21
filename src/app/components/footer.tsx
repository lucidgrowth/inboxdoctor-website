"use client";

import { motion } from "motion/react";
import Link from "next/link";

import Container from "@/components/container";
import Image from "next/image";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

const legalPages = [
  {
    title: "Terms and Conditions",
    href: "/legal/terms-and-conditions",
  },
  {
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
  {
    title: "Anti-Spam Policy",
    href: "/legal/anti-spam-policy",
  },
  {
    title: "Cookie Policy",
    href: "/legal/cookie-policy",
  },
  {
    title: "Google API Discloser",
    href: "/legal/google-api-discloser",
  },
  {
    title: "Subprocessors",
    href: "/legal/subprocessors",
  },
  {
    title: "Accessibility Statement",
    href: "/legal/accessibility-statement",
  },
  {
    title: "Fulfillment Policy",
    href: "/legal/fulfillment-policy",
  },
  {
    title: "EULA",
    href: "/legal/eula",
  },
];

const quickLinks = [
  {
    title: "Benefits",
    href: "/#benefits",
  },
  {
    title: "Email Health Test",
    href: "/email-health",
  },
  {
    title: "Inbox Placement Test",
    href: "/inbox-placement",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Pricing",
    href: "/#pricing",
  },
  {
    title: "Testimonials",
    href: "/#testimonials",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
];

export const socialsLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1B3tM8eryg/?mibextid=wwXIfr",
    icon: FacebookLogo,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/inbox_doctor?igsh=cnlxYWk2b2ZvdDFk",
    icon: InstagramLogo,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/inboxdoctor/",
    icon: LinkedinLogo,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/channel/UCZFJb3dWSr-MSjdLJXHkjcQ",
    icon: YoutubeLogo,
  },
  { label: "X", href: "https://x.com/Inbox_Doctor", icon: XLogo },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/10">
      <Container type="div" className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
                Land in inboxes, not spam folders. Boost open rates and sender
                reputation with ease.
              </p>
              {/* <div className="flex space-x-4">
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
              </div> */}
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
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Socials</h3>
            <ul className="space-y-2">
              {socialsLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
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
      </Container>
    </footer>
  );
}
