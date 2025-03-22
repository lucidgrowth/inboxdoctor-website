import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { Metadata } from "next";
import React from "react";
import PublicNavbar from "./components/report-header";

export const metadata: Metadata = {
  title: "InboxDoctor | Email Domain Report",
  description:
    "Get a comprehensive domain health analysis with InboxDoctor's free report. Check email deliverability, SPF, DKIM, DMARC setup, and identify issues affecting inbox placement.",
  openGraph: {
    title: "InboxDoctor | Email Domain Report",
    description:
      "Get a comprehensive domain health analysis with InboxDoctor's free report. Check email deliverability, SPF, DKIM, DMARC setup, and identify issues affecting inbox placement.",
    siteName: "InboxDoctor",
    url: "https://inboxdoctor.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://inboxdoctor.ai/report-image.png",
        width: 1200,
        height: 630,
        alt: "InboxDoctor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InboxDoctor | Email Domain Report",
    description:
      "Get a comprehensive domain health analysis with InboxDoctor's free report. Check email deliverability, SPF, DKIM, DMARC setup, and identify issues affecting inbox placement.",
    images: ["https://inboxdoctor.ai/report-image.png"],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div id="report-layout" className="bg-background">
        <TooltipProvider>
          <PublicNavbar />
          {children}
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
}
