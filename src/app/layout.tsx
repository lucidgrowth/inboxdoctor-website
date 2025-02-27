import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const aspekta = localFont({
  src: "./fonts/Aspekta-600.ttf",
  weight: "600",
  style: "semibold",
  variable: "--font-aspekta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inboxdoctor.ai"),
  alternates: {
    canonical: "/",
  },
  title: "InboxDoctor – Best Email Warm-Up & Deliverability Tool",
  description:
    "Land in inboxes, not spam folders. Boost open rates and sender reputation with ease.",
  authors: {
    name: "InboxDoctor",
    url: "https://inboxdoctor.ai",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: {
      sizes: "48x48",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  },
  openGraph: {
    title: "InboxDoctor – Best Email Warm-Up & Deliverability Tool",
    description:
      "Land in inboxes, not spam folders. Boost open rates and sender reputation with ease.",
    siteName: "InboxDoctor",
    url: "https://inboxdoctor.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://inboxdoctor.ai/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "InboxDoctor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InboxDoctor – Best Email Warm-Up & Deliverability Tool",
    description:
      "Land in inboxes, not spam folders. Boost open rates and sender reputation with ease.",
    images: ["https://inboxdoctor.ai/opengraph-image.png"],
  },
  keywords: [
    "Inbox placement",
    "email deliverability",
    "domain warmup",
    "IP warmup",
    "email marketing strategies",
    "sender reputation",
    "warmup process",
    "email authentication",
    "spam filters",
    "engagement metrics",
    "bounce rate",
    "blacklist monitoring",
    "email client preferences",
    "sender score",
    "email list hygiene",
    "drip campaigns",
    "email engagement",
    "SMTP configuration",
    "marketing automation",
    "domain reputation management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="9993CBC4BC27866C85C4AB5FD1326CA3" />
      </head>
      <body className={`${inter.variable} ${aspekta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
