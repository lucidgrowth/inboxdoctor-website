/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import StyledTooltip from "@/components/styled-tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  Globe,
  Hash,
  Info,
  Mail,
  Server,
  Sidebar,
  Terminal,
  Usb,
  User,
  X,
  XCircle,
} from "lucide-react";
import { RawEmailCard, SanitizedHtmlViewer } from "./email-health-results";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { useGetEmailDetailedReport } from "./hook/use-sharedreport";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import BlackList, { BlackListTable } from "./blacklist";
import MoreInfoButton from "./more-info-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CustomCollapse,
  CustomCollapseContent,
  CustomCollapseTrigger,
} from "@/components/custom-collapse";

const mockEmailDetails = {
  email: "test@example.com",
  from: "John Doe <john.doe@example.com>",
  to: "Jane Smith <jane.smith@example.com>",
  subject: "Test Email",
  date: "2021-01-01 12:00:00",
  messageId: "1234567890",
  ip: "123.45.67.89",
  body: {
    text: "This is a test email.",
    html: "<p>This is a test email.</p>",
  },
  raw: `From: marketing@yourcompany.com
  To: recipient@example.com
  Subject: Special Offer: 20% Off Your Next Purchase!
  MIME-Version: 1.0
  Content-Type: multipart/alternative; boundary="boundary123"
  
  --boundary123
  Content-Type: text/plain; charset="UTF-8"
  
  Special Offer for Our Valued Customers
  
  Dear Customer,
  
  We're excited to offer you an exclusive 20% discount on your next purchase!
  
  Use code SPECIAL20 at checkout.
  
  Shop now at www.yourcompany.com
  
  Thank you for your continued support!
  
  Best regards,
  Your Company Team
  
  --boundary123
  Content-Type: text/html; charset="UTF-8"
  
  <html>
    <body>
      <h1>Special Offer for Our Valued Customers</h1>
      <p>Dear Customer,</p>
      <p>We're excited to offer you an exclusive 20% discount on your next purchase!</p>
      <p>Use code <strong>SPECIAL20</strong> at checkout.</p>
      <p>Shop now at <a href="https://www.yourcompany.com">www.yourcompany.com</a></p>
      <p>Thank you for your continued support!</p>
      <p>Best regards,<br>Your Company Team</p>
    </body>
  </html>
  
  --boundary123--
  `,
  formattedReceivedChain: [
    {
      index: 0,
      delay: "",
      from: "a11-70.smtp-out.amazonses.com",
      to: "health.inboxdoctor.ai",
      protocol: "ESMTPS",
      timeReceived: "03/06/2025, 05:34 AM UTC",
    },
  ],
  relaycheck: {
    openRelay: false,
    startTlsSupported: true,
    sessionLines: [
      "S: inbound-smtp.us-east-1.amazonaws.com ESMTP Amazon SES oczoDZDXU1LYFHqwYFpw ",
      "C: EHLO smtpcheck.inboxdoctor.ai",
      "S: inbound-smtp.us-east-1.amazonaws.com  250 8BITMIME  250 STARTTLS  250 Ok ",
      "C: MAIL FROM: <smtpcheck.inboxdoctor.ai>",
      "S: Ok ",
      "C: RCPT TO: <testrcv@inboxdoctor.ai>",
      "S: 5.1.1 Requested action not taken: mailbox unavailable ",
    ],
    errored: false,
  },
};

const isIPAddress = (server: string) => {
  // Simple regex to check if the server is an IP address
  return /^\d+\.\d+\.\d+\.\d+$/.test(server);
};

export function EmailDetails({
  email,
  providerKey,
  testId,
}: {
  email: string;
  providerKey: string;
  testId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetEmailDetailedReport(
    testId,
    providerKey,
    email,
    isOpen
  );
  const { theme } = useTheme();

  const handleDownloadEmailContent = (e: any) => {
    e.stopPropagation();
    const blob = new Blob([mockEmailDetails?.body?.html], {
      type: "text/html",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-content.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const emailDetails = data?.emailDetails;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-center gap-2">
        <span className="text-sm hover:underline">{email}</span>
        <Sidebar className="size-4" />
      </SheetTrigger>
      <SheetContent
        className={cn(
          "max-w-full w-full sm:max-w-4xl p-0",
          theme === "dark" && "dark"
        )}
      >
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-40">
          <X className="h-4 w-4 text-foreground" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <ScrollArea className="h-[calc(100vh-32px)] p-6">
          <SheetHeader className="space-y-2 mb-3">
            <SheetTitle>Email Details</SheetTitle>
            {/* <SheetDescription>View the details of the email.</SheetDescription> */}
          </SheetHeader>
          <div className="space-y-4">
            {/* Email Details Card */}
            {/* <Card>
              <Collapsible className="w-full" defaultOpen>
                <CollapsibleTrigger asChild>
                  <CardHeader className="hover:bg-muted/50 transition-colors p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle>Email Details</CardTitle>
                        <CardDescription>
                          General information about the tested email
                        </CardDescription>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="">
                  <CardContent className="p-4 space-y-4 text-sm border-t">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">To:</span>
                      <span className="ml-2 break-all">{emailDetails?.to}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">From:</span>
                      <span className="ml-2 break-all">{emailDetails?.from?.text}</span>
                    </div>
                    <div className="flex items-center">
                      <Usb className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">IP:</span>
                      <span className="ml-2 break-all">{emailDetails?.senderIP}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">Subject:</span>
                      <span className="ml-2 break-all">{emailDetails?.subject}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">Date:</span>
                      <span className="ml-2">
                        {emailDetails?.date
                          ? new Date(emailDetails?.date).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Hash className="w-5 h-5 mr-2 shrink-0 text-blue-600" />
                      <span className="font-semibold whitespace-nowrap">
                        Message ID:
                      </span>
                      <span className="ml-2 break-all">
                        {emailDetails?.messageId || "N/A"}
                      </span>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card> */}

            <Card>
              <CardHeader className="bg-muted/50 border-b">
                <CardTitle>Email Details</CardTitle>
                <CardDescription>
                  General information about the tested email
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-sm">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">To:</span>
                  </div>
                  <span className="break-all">{emailDetails?.to}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">From:</span>
                  </div>
                  <span className="break-all">{emailDetails?.from?.text}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <Usb className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">IP:</span>
                  </div>
                  <span className="break-all">{emailDetails?.senderIP}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">Subject:</span>
                  </div>
                  <span className="break-all">{emailDetails?.subject}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">Date:</span>
                  </div>
                  <span>
                    {emailDetails?.date
                      ? new Date(emailDetails?.date).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center">
                    <Hash className="w-5 h-5 mr-2 shrink-0 text-blue-600" />
                    <span className="font-semibold whitespace-nowrap">
                      Message ID:
                    </span>
                  </div>
                  <span className="break-all">
                    {emailDetails?.messageId || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* email content card */}
            <Card>
              <Collapsible className="w-full" defaultOpen>
                <CollapsibleTrigger asChild>
                  <CardHeader className="hover:bg-muted/50 transition-colors p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle>Email Content</CardTitle>
                        <CardDescription>Message body content</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadEmailContent}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="">
                  <CardContent className="p-4 text-sm border-t">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Plain Text</h3>
                        <div className="bg-gray-50 dark:bg-muted/50  p-4 rounded-md whitespace-pre-wrap">
                          {emailDetails?.plainText || ""}
                        </div>
                      </div>
                      <div>
                        <div className="rounded-md">
                          <SanitizedHtmlViewer
                            html={emailDetails?.htmlContent || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Raw Email */}
            <RawEmailCard raw={emailDetails?.rawContent || ""} />

            {/* Blacklist Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-foreground">
                  Blacklist Status
                </h2>
                <StyledTooltip description="Shows the status of your emails on various blacklists. This helps identify if your emails are being blocked by any email providers.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </StyledTooltip>
              </div>

              <div className="grid gap-3">
                {/* Domain Blacklists */}
                <BlackList
                  type="domainBlacklist"
                  data={emailDetails?.domainBlacklist}
                />

                {/* MX Server Blacklists */}
                <BlackList
                  type="mxServerBlacklist"
                  data={emailDetails?.mxServerBlacklists}
                />

                {/* SMTP Server Blacklists - Already at the bottom */}
                <CustomCollapse defaultOpen>
                  <Card>
                    <CustomCollapseTrigger className="w-full">
                      <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4 text-orange-500" />
                            SMTP Server Blacklists
                            <StyledTooltip description="SMTP Server Blacklists check if your email sending servers are listed on spam databases. Being blacklisted can prevent your emails from being delivered, as receiving mail servers often reject messages from blacklisted SMTP servers.">
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </StyledTooltip>
                          </CardTitle>
                          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </div>

                        <CardDescription className="self-start">
                          Email sending behavior and authentication
                        </CardDescription>
                      </CardHeader>
                    </CustomCollapseTrigger>
                    <CustomCollapseContent>
                      <CardContent className="p-0">
                        <div className="space-y-2">
                          {emailDetails?.smtpBlacklist?.map(
                            (serverData, index) => (
                              <CustomCollapse
                                key={serverData.server}
                                className="w-full"
                              >
                                <CustomCollapseTrigger className="w-full">
                                  <div className="flex items-center justify-between p-3 hover:bg-muted/50">
                                    <div className="flex items-center gap-2">
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                      <span className="font-medium text-sm">
                                        SMTP Server {index + 1}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {serverData.server}
                                      </span>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={`${
                                        serverData.blacklists.every(
                                          (b) => !b.listed
                                        )
                                          ? "bg-green-500 text-white hover:bg-green-600"
                                          : "bg-red-500 text-white hover:bg-red-600"
                                      }`}
                                    >
                                      {serverData.blacklists.every(
                                        (b) => !b.listed
                                      )
                                        ? "All Clear"
                                        : "Issues Found"}
                                    </Badge>
                                  </div>
                                </CustomCollapseTrigger>
                                <CustomCollapseContent className="w-full">
                                  <BlackListTable
                                    blacklists={serverData.blacklists}
                                  />
                                </CustomCollapseContent>
                              </CustomCollapse>
                            )
                          )}
                        </div>
                      </CardContent>
                    </CustomCollapseContent>
                  </Card>
                </CustomCollapse>
              </div>
            </div>

            {/* Email Delivery Chain */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Email Delivery Chain
              </h2>
              <div className="grid gap-4">
                <CustomCollapse defaultOpen>
                  <Card>
                    <CustomCollapseTrigger className="w-full">
                      <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span>Receiving Chain</span>
                            <StyledTooltip description="The receiving chain shows the step-by-step routing and processing time of your email across SMTP servers.">
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </StyledTooltip>
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <MoreInfoButton slug="Email-Delivery-Chain" />
                            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                          </div>
                        </div>
                        <CardDescription className="self-start text-left">
                          Step-by-step routing and processing time of your email
                          across SMTP servers
                        </CardDescription>
                      </CardHeader>
                    </CustomCollapseTrigger>
                    <CustomCollapseContent className="overflow-x-auto">
                      <CardContent className="p-0 overflow-x-auto border-t">
                        <Table className="w-full overflow-x-auto">
                          <TableHeader>
                            <TableRow className="border-b bg-muted/50">
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                #
                              </TableHead>
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                Delay
                              </TableHead>
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                From
                              </TableHead>
                              <TableHead className="py-2 px-4 text-center w-8 hidden md:table-cell"></TableHead>
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                To
                              </TableHead>
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                Protocol
                              </TableHead>
                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                Time received
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {emailDetails?.formattedDeliveryChain?.map(
                              (hop: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell className="py-2 px-4">
                                    <span className="hidden lg:block">
                                      {index}
                                    </span>
                                    {/* Mobile */}
                                    <div className="lg:hidden">
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                          Step:
                                        </span>
                                        {index}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                          Delay:
                                        </span>
                                        <span className="text-green-600">
                                          {hop?.delay || ""}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground ">
                                          From:
                                        </span>
                                        <span className="font-mono">
                                          {hop?.from || ""}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                          To:
                                        </span>
                                        <span className="font-mono">
                                          {hop?.to || ""}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                          Protocol:
                                        </span>
                                        {hop?.protocol || ""}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                          Time received:
                                        </span>
                                        {hop?.timeReceived || ""}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="py-2 px-4 text-green-600 hidden lg:table-cell">
                                    {hop?.delay || ""}
                                  </TableCell>
                                  <TableCell className="py-2 px-4 font-mono hidden lg:table-cell">
                                    {hop?.from || ""}
                                  </TableCell>
                                  <TableCell className="py-2 px-4 text-center hidden lg:table-cell">
                                    <ArrowRight className="w-4 h-4 text-muted-foreground inline" />
                                  </TableCell>
                                  <TableCell className="py-2 px-4 font-mono hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                      {hop?.to || ""}
                                    </div>
                                  </TableCell>
                                  <TableCell className="py-2 px-4 hidden lg:table-cell">
                                    {hop?.protocol || ""}
                                  </TableCell>
                                  <TableCell className="py-2 px-4 text-muted-foreground hidden lg:table-cell">
                                    {hop?.timeReceived || ""}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </CustomCollapseContent>
                  </Card>
                </CustomCollapse>
              </div>
            </div>

            {/* Open relay check */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Open relay check
              </h2>
              <div className="grid gap-4">
                <Collapsible defaultOpen>
                  <Card>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-teal-500" />
                            Session Transcript
                            <StyledTooltip description="The session transcript shows the detailed SMTP communication logs between your mail server and the receiving server.">
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </StyledTooltip>
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <MoreInfoButton slug="open-relay" />
                            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                          </div>
                        </div>
                        <CardDescription className="self-start">
                          Detailed SMTP communication logs
                        </CardDescription>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="font-mono text-sm bg-slate-950 text-slate-50 rounded-lg overflow-hidden">
                            {/* Terminal Header */}
                            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-xs text-slate-400">
                                  SMTP Session
                                </span>
                              </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-4 space-y-1 break-all">
                              {emailDetails?.relaycheck?.sessionLines.map(
                                (line: any, index: number) => {
                                  const [prefix, ...rest] = line.split(": ");
                                  const content = rest.join(": ");

                                  return (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3 group"
                                    >
                                      <div
                                        className={`
                                      min-w-[24px] text-center rounded px-1
                                      ${
                                        prefix === "S"
                                          ? "bg-emerald-500/10 text-emerald-400"
                                          : "bg-blue-500/10 text-blue-400"
                                      }
                                    `}
                                      >
                                        {prefix}
                                      </div>
                                      <div className="flex-1">
                                        <span
                                          className={`
                                        font-mono
                                        ${
                                          prefix === "S"
                                            ? "text-slate-200"
                                            : "text-slate-300"
                                        }
                                      `}
                                        >
                                          {content}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          {/* Test Results Section */}
                          <div className="border rounded-lg">
                            <div className="p-4 border-b bg-muted/50 flex items-center gap-2">
                              <h3 className="font-medium">Test Results</h3>
                              <StyledTooltip description="These results show whether your mail server is configured as an open relay (which allows anyone to send emails through your server) and if it supports STARTTLS encryption for secure email transmission.">
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </StyledTooltip>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`
                                  p-2 rounded-full
                                  ${
                                    emailDetails?.relaycheck?.openRelay
                                      ? "bg-red-100 text-red-600 dark:bg-red-900/20"
                                      : "bg-green-100 text-green-600 dark:bg-green-900/20"
                                  }
                                `}
                                >
                                  {emailDetails?.relaycheck?.openRelay ? (
                                    <XCircle className="w-5 h-5" />
                                  ) : (
                                    <CheckCircle2 className="w-5 h-5" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {emailDetails?.relaycheck?.openRelay
                                      ? "Open Relay Detected"
                                      : "No Open Relay Detected"}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {emailDetails?.relaycheck?.openRelay
                                      ? "Your mail server may be vulnerable to unauthorized relay attempts."
                                      : "Your mail server is properly configured and does not allow unauthorized relay attempts."}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`
                                    w-2 h-2 rounded-full
                                    ${
                                      emailDetails?.relaycheck
                                        ?.startTlsSupported
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }
                                  `}
                                  ></div>
                                  <span className="text-sm">
                                    STARTTLS:{" "}
                                    {emailDetails?.relaycheck?.startTlsSupported
                                      ? "Enabled"
                                      : "Not enabled"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`
                                    w-2 h-2 rounded-full
                                    ${
                                      emailDetails?.relaycheck?.errored
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }
                                  `}
                                  ></div>
                                  <span className="text-sm">
                                    Test Status:{" "}
                                    {emailDetails?.relaycheck?.errored
                                      ? "Test encountered errors"
                                      : "Test completed successfully"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
