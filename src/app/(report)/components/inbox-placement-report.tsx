/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import StyledTooltip from "@/components/styled-tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code,
  Eye,
  Globe,
  Inbox,
  Info,
  Mail,
  MailWarning,
  OctagonAlert,
  Server,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  b2bChartData,
  b2cchartData,
  mockBlocklistRecord,
} from "@/data/mock-blocklist-record";
import { EmailPlacementChart } from "./placement-chart";
import ProviderCollapes, { IProviderDataState } from "./provider-collapes";

enum PlacementType {
  B2B = "B2B",
  B2C = "B2C",
}
const testEmailData = {
  from: "marketing@yourcompany.com",
  subject: "Special Offer: 20% Off Your Next Purchase!",
  ipAddress: "192.168.1.1",
  htmlBody: `
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
  `,
  textBody: `
Special Offer for Our Valued Customers

Dear Customer,

We're excited to offer you an exclusive 20% discount on your next purchase!

Use code SPECIAL20 at checkout.

Shop now at www.yourcompany.com

Thank you for your continued support!

Best regards,
Your Company Team
  `,
};

const providerData: IProviderDataState = {
  b2c: [
    {
      provider: "Gmail",
      stats: { inbox: 80, spam: 0, unreceived: 20 },
      category: ["primary", "promotion", "updates"],
      emails: [
        {
          address: "test-inbox1@gmail.com",
          status: "Inbox",
          category: "primary",
        },
        {
          address: "test-inbox2@gmail.com",
          status: "Inbox",
          category: "primary",
        },
        {
          address: "test-inbox3@gmail.com",
          status: "Inbox",
          category: "promotion",
        },
        {
          address: "test-inbox4@gmail.com",
          status: "Inbox",
          category: "primary",
        },
        {
          address: "test-inbox5@gmail.com",
          status: "Unreceived",
        },
      ],
    },
    {
      provider: "Outlook.com / Hotmail / Live",
      stats: { inbox: 100, spam: 0, unreceived: 0 },
      category: ["focused", "others"],
      emails: [
        {
          address: "test-inbox2@outlook.com",
          status: "Inbox",
          category: "focused",
        },
        {
          address: "test-inbox3@outlook.com",
          status: "Inbox",
          category: "others",
        },
        {
          address: "test-inbox4@outlook.com",
          status: "Inbox",
          category: "focused",
        },
        {
          address: "test-inbox5@outlook.com",
          status: "Inbox",
          category: "focused",
        },
        {
          address: "test-inbox1@hotmail.com",
          status: "Inbox",
          category: "focused",
        },
      ],
    },
    {
      provider: "Yahoo! Mail",
      stats: { inbox: 100, spam: 0, unreceived: 0 },
      category: [],
      emails: [
        {
          address: "test-inbox2@yahoo.com",
          status: "Inbox",
        },
        {
          address: "test-inbox3@yahoo.com",
          status: "Inbox",
        },
        {
          address: "test-inbox4@yahoo.co.uk",
          status: "Inbox",
        },
        {
          address: "test-inbox5@yahoo.ca",
          status: "Inbox",
        },
        {
          address: "test-inbox1@yahoo.com",
          status: "Inbox",
        },
      ],
    },
    {
      provider: "AOL Mail",
      stats: { inbox: 100, spam: 0, unreceived: 0 },
      category: [],
      emails: [
        {
          address: "test-inbox4@aol.com",
          status: "Inbox",
        },
        { address: "test-inbox5@aol.com", status: "Inbox" },
        { address: "test-inbox1@aol.com", status: "Inbox" },
        {
          address: "test-inbox2@aol.com",
          status: "Inbox",
        },
        {
          address: "test-inbox3@aol.com",
          status: "Inbox",
        },
      ],
    },
    {
      provider: "iCloud Mail / Apple Mail",
      stats: { inbox: 100, spam: 0, unreceived: 0 },
      category: ["inbox", "vip"],
      emails: [
        {
          address: "test-inbox5@icloud.com",
          status: "Inbox",
          category: "inbox",
        },
        { address: "test-inbox1@me.com", status: "Inbox", category: "vip" },
        {
          address: "test-inbox2@mac.com",
          status: "Inbox",
          category: "inbox",
        },
        {
          address: "test-inbox3@icloud.com",
          status: "Inbox",
          category: "inbox",
        },
        {
          address: "test-inbox4@icloud.com",
          status: "Inbox",
          category: "inbox",
        },
      ],
    },
    {
      provider: "GMX / mail.com",
      stats: { inbox: 65, spam: 15, unreceived: 20 },
      category: [],
      emails: [
        { address: "test-inbox1@gmx.com", status: "Inbox" },
        { address: "test-inbox2@mail.com", status: "Inbox" },
        { address: "test-inbox3@gmx.com", status: "Spam" },
        { address: "test-inbox4@mail.com", status: "Unreceived" },
        { address: "test-inbox5@gmx.com", status: "Unreceived" },
      ],
    },
    {
      provider: "ProtonMail",
      stats: { inbox: 70, spam: 10, unreceived: 20 },
      category: [],
      emails: [
        { address: "test-inbox1@proton.me", status: "Inbox" },
        { address: "test-inbox2@proton.me", status: "Inbox" },
        { address: "test-inbox3@proton.me", status: "Inbox" },
        { address: "test-inbox4@proton.me", status: "Spam" },
        { address: "test-inbox5@proton.me", status: "Unreceived" },
      ],
    },
  ],
  b2b: [
    {
      provider: "Microsoft 365",
      stats: { inbox: 75, spam: 5, unreceived: 20 },
      category: ["focused", "others"],
      emails: [
        {
          address: "test-inbox1@company-m365.com",
          status: "Inbox",
          category: "focused",
        },
        {
          address: "test-inbox2@company-m365.com",
          status: "Inbox",
          category: "others",
        },
        {
          address: "test-inbox3@company-m365.com",
          status: "Inbox",
          category: "focused",
        },
        {
          address: "test-inbox4@company-m365.com",
          status: "Spam",
        },
        {
          address: "test-inbox5@company-m365.com",
          status: "Unreceived",
        },
      ],
    },
    {
      provider: "Google Workspace",
      stats: { inbox: 72, spam: 8, unreceived: 20 },
      category: ["primary", "promotion", "social", "updates"],
      emails: [
        {
          address: "test-inbox2@company-workspace.com",
          status: "Inbox",
          category: "primary",
        },
        {
          address: "test-inbox3@company-workspace.com",
          status: "Inbox",
          category: "updates",
        },
        {
          address: "test-inbox4@company-workspace.com",
          status: "Spam",
        },
        {
          address: "test-inbox5@company-workspace.com",
          status: "Unreceived",
        },
        {
          address: "test-inbox1@company-workspace.com",
          status: "Unreceived",
        },
      ],
    },
    {
      provider: "Zoho Workmail",
      stats: { inbox: 70, spam: 10, unreceived: 20 },
      category: ["primary", "newsletter"],
      emails: [
        {
          address: "test-inbox3@company-zoho.com",
          status: "Inbox",
          category: "primary",
        },
        {
          address: "test-inbox4@company-zoho.com",
          status: "Inbox",
          category: "newsletter",
        },
        {
          address: "test-inbox5@company-zoho.com",
          status: "Spam",
        },
        {
          address: "test-inbox1@company-zoho.com",
          status: "Unreceived",
        },
        {
          address: "test-inbox2@company-zoho.com",
          status: "Unreceived",
        },
      ],
    },
    {
      provider: "AWS Workmail",
      stats: { inbox: 68, spam: 12, unreceived: 20 },
      category: [],
      emails: [
        { address: "test-inbox4@company-aws.com", status: "Inbox" },
        { address: "test-inbox5@company-aws.com", status: "Inbox" },
        { address: "test-inbox1@company-aws.com", status: "Spam" },
        { address: "test-inbox2@company-aws.com", status: "Unreceived" },
        { address: "test-inbox3@company-aws.com", status: "Unreceived" },
      ],
    },
    {
      provider: "Trend Micro Virus Scanning",
      stats: { inbox: 80, spam: 10, unreceived: 10 },
      category: [],
      emails: [
        { address: "test-inbox5@company-trend.com", status: "Inbox" },
        { address: "test-inbox1@company-trend.com", status: "Inbox" },
        { address: "test-inbox2@company-trend.com", status: "Spam" },
        { address: "test-inbox3@company-trend.com", status: "Unreceived" },
        { address: "test-inbox4@company-trend.com", status: "Unreceived" },
      ],
    },
    {
      provider: "Abusix Guardian Mail",
      stats: { inbox: 85, spam: 5, unreceived: 10 },
      category: [],
      emails: [
        { address: "test-inbox1@company-abusix.com", status: "Inbox" },
        { address: "test-inbox2@company-abusix.com", status: "Inbox" },
        { address: "test-inbox3@company-abusix.com", status: "Spam" },
        { address: "test-inbox4@company-abusix.com", status: "Unreceived" },
        { address: "test-inbox5@company-abusix.com", status: "Unreceived" },
      ],
    },
    {
      provider: "Spamhaus Domain Block List (DBL)",
      stats: { inbox: 90, spam: 5, unreceived: 5 },
      category: [],
      emails: [
        { address: "test-inbox2@company-spamhaus.com", status: "Inbox" },
        { address: "test-inbox3@company-spamhaus.com", status: "Inbox" },
        { address: "test-inbox4@company-spamhaus.com", status: "Spam" },
        { address: "test-inbox5@company-spamhaus.com", status: "Unreceived" },
        { address: "test-inbox1@company-spamhaus.com", status: "Unreceived" },
      ],
    },
  ],
};

const isIPAddress = (server: string) => {
  // Simple regex to check if the server is an IP address
  return /^\d+\.\d+\.\d+\.\d+$/.test(server);
};

const InboxPlacementReport = ({
  domain,
  companyId,
  reportId,
}: {
  domain: string;
  companyId: string;
  reportId: string;
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [type, setType] = useState<PlacementType>(PlacementType.B2C);

  const statsCards = [
    {
      icon: Inbox,
      title: "Inbox",
      value: 20,
      outof: 35,
      percentage: 43.48,
      classNames: {
        stroke: "stroke-green-500",
        icon: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-500",
      },
    },
    {
      icon: OctagonAlert,
      title: "Spam",
      value: 18,
      outof: 35,
      percentage: 39.13,
      classNames: {
        stroke: "stroke-red-500",
        icon: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-500",
      },
    },
    {
      icon: MailWarning,
      title: "Unreceived",
      value: 3,
      outof: 35,
      percentage: 6.52,
      classNames: {
        stroke: "stroke-yellow-500",
        icon: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-500",
      },
    },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Test Results
          </h1>
          <p className="text-muted-foreground">example.com</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            {type && (
              <Badge
                variant="outline"
                className={cn(
                  "bg-blue-100 text-blue-800 border-blue-800 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-500",
                  type === PlacementType.B2C &&
                    "bg-purple-100 text-purple-800 border-purple-800 dark:bg-purple-900/30 dark:text-purple-500 dark:border-purple-500"
                )}
              >
                {type === PlacementType.B2C ? "B2C" : "B2B"}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="bg-green-100 text-green-600 border-green-600 dark:bg-green-900/30 dark:text-green-500 dark:border-green-500"
            >
              Completed
            </Badge>
          </div>
          <p className="text-muted-foreground">March 4, 2025 at 2:10 PM</p>
        </div>
      </div>

      {/* Overall Result */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">
            Overall Result
          </h2>
          <StyledTooltip description="Shows the overall result of the test. This helps identify if the email was delivered to the inbox or spam folder.">
            <Info className="h-4 w-4 text-muted-foreground" />
          </StyledTooltip>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsCards.map((card) => (
            <Card className="relative" key={card.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "border-transparent rounded-lg bg-secondary size-8 flex items-center justify-center shrink-0",
                          card.classNames.icon
                        )}
                      >
                        <card.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">{card.title}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">
                        {card.value}
                        <span className="text-sm text-muted-foreground">
                          /{card.outof}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ProgressCircle
                    percentage={card.percentage}
                    color={card.classNames.stroke}
                    className="size-20"
                    strokeWidth={10}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Placement Chart */}
      {type === PlacementType.B2C ? (
        <EmailPlacementChart chartData={b2cchartData} />
      ) : (
        <EmailPlacementChart chartData={b2bChartData} />
      )}

      {/* Alert */}
      {/* <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="">Deliverability Issues Detected</AlertTitle>
        <AlertDescription className="">
          Your emails are landing in spam folders for some providers. We
          recommend warming up your inbox.
        </AlertDescription>
        <Button variant="outline" size="sm" className="mt-2">
          <span>Warm up your inbox</span>
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Alert> */}

      {/* Test Email Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">
            Test Email Details
          </h2>
          <StyledTooltip description="Shows the details of the test email that was sent. This helps identify if the email was delivered to the inbox or spam folder.">
            <Info className="h-4 w-4 text-muted-foreground" />
          </StyledTooltip>
        </div>
        <Card>
          {/* <CardHeader className="p-4 bg-muted/50 border-b rounded-t-lg">
          <CardTitle>Test Email Details</CardTitle>
        </CardHeader> */}
          <CardContent className="p-4">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">From:</span>
                <span className="text-muted-foreground">
                  {testEmailData.from}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Subject:</span>
                <span className="text-muted-foreground">
                  {testEmailData.subject}
                </span>
              </div>
              <div>
                <div className="font-semibold flex items-center justify-between">
                  <span>Email Body:</span>
                  <div className="flex justify-end space-x-2 mb-2">
                    <Button
                      variant={!showHtml ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowHtml(false)}
                      className="px-2 py-0.5 h-7 text-xs"
                    >
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      variant={!showHtml ? "outline" : "default"}
                      size="sm"
                      onClick={() => setShowHtml(true)}
                      className="px-2 py-0.5 h-7 text-xs"
                    >
                      <Code className="h-3 w-3" />
                      HTML
                    </Button>
                  </div>
                </div>
                <div className="">
                  {showHtml ? (
                    <Textarea
                      value={testEmailData.htmlBody}
                      readOnly
                      className="font-mono text-sm h-64"
                    />
                  ) : (
                    <div className="border rounded-md p-4 h-64 overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: testEmailData.htmlBody,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <Collapsible defaultOpen>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      Domain Blacklists
                      <StyledTooltip description="Domain blacklists check if your domain is listed on spam databases. Being blacklisted can severely impact email deliverability, causing your messages to be blocked or sent to spam folders.">
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </StyledTooltip>
                    </CardTitle>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                  </div>
                  <CardDescription className="self-start">
                    Domain reputation and DNS-based blacklists
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-0">
                  <div className="rounded-lg">
                    {/* IP Addresses Section */}
                    {mockBlocklistRecord?.domainBlacklist?.some((data) =>
                      isIPAddress(data.server)
                    ) && (
                      <div className="mb-4">
                        <div className="py-2 px-4 bg-muted font-medium text-sm">
                          IP Addresses (A Records)
                        </div>
                        <div className="divide-y">
                          {mockBlocklistRecord?.domainBlacklist
                            ?.filter((data) => isIPAddress(data.server))
                            .map((serverData, index) => {
                              // Count listed blacklists for this IP
                              const listedCount = serverData.blacklists.filter(
                                (bl) => bl.listed
                              ).length;

                              return (
                                <Collapsible key={`ip-${serverData.server}`}>
                                  <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                                      <div className="flex items-center gap-2">
                                        {listedCount === 0 ? (
                                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-sm font-medium">
                                          {serverData.server}
                                        </span>
                                      </div>
                                      <Badge
                                        variant={
                                          listedCount === 0
                                            ? "success"
                                            : "destructive"
                                        }
                                      >
                                        {listedCount === 0
                                          ? "Clean"
                                          : `${listedCount} Listed`}
                                      </Badge>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="border-t">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b bg-muted/50">
                                            <th className="py-2 px-4 text-left font-medium">
                                              Blacklist
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Status
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Response
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {serverData.blacklists.map(
                                            (blacklist, idx) => (
                                              <tr key={idx}>
                                                <td className="py-2 px-4">
                                                  <div className="flex items-center gap-2">
                                                    {blacklist.listed ? (
                                                      <XCircle className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    )}
                                                    <span className="text-gray-700">
                                                      {blacklist.rblName}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td className="py-2 px-4 text-gray-700">
                                                  {blacklist.listed
                                                    ? "Listed"
                                                    : "Clean"}
                                                </td>
                                                <td className="py-2 px-4 text-gray-500">
                                                  {blacklist.response ||
                                                    "No response"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Domain Names Section */}
                    {mockBlocklistRecord?.domainBlacklist?.some(
                      (data) => !isIPAddress(data.server)
                    ) && (
                      <div>
                        <div className="py-2 px-4 bg-muted font-medium text-sm">
                          Host Names
                        </div>
                        <div className="divide-y">
                          {mockBlocklistRecord?.domainBlacklist
                            ?.filter((data) => !isIPAddress(data.server))
                            .map((serverData, index) => {
                              // Count listed blacklists for this domain
                              const listedCount = serverData.blacklists.filter(
                                (bl) => bl.listed
                              ).length;

                              return (
                                <Collapsible
                                  key={`domain-${serverData.server}`}
                                >
                                  <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                                      <div className="flex items-center gap-2">
                                        {listedCount === 0 ? (
                                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-sm font-medium">
                                          {serverData.server}
                                        </span>
                                      </div>
                                      <Badge
                                        variant={
                                          listedCount === 0
                                            ? "success"
                                            : "destructive"
                                        }
                                      >
                                        {listedCount === 0
                                          ? "Clean"
                                          : `${listedCount} Listed`}
                                      </Badge>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="border-t">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b bg-muted/50">
                                            <th className="py-2 px-4 text-left font-medium">
                                              Blacklist
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Status
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Response
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {serverData.blacklists.map(
                                            (blacklist, idx) => (
                                              <tr key={idx}>
                                                <td className="py-2 px-4">
                                                  <div className="flex items-center gap-2">
                                                    {blacklist.listed ? (
                                                      <XCircle className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    )}
                                                    <span className="text-gray-700">
                                                      {blacklist.rblName}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td className="py-2 px-4 text-gray-700">
                                                  {blacklist.listed
                                                    ? "Listed"
                                                    : "Clean"}
                                                </td>
                                                <td className="py-2 px-4 text-gray-500">
                                                  {blacklist.response ||
                                                    "No response"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* MX Server Blacklists */}
          <Collapsible defaultOpen>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-500" />
                      MX Server Blacklists
                      <StyledTooltip description="MX Server Blacklists check if your mail server IPs are listed on spam databases. Being blacklisted can severely impact email deliverability, as many receiving servers will reject or filter emails from blacklisted IPs.">
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </StyledTooltip>
                    </CardTitle>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                  </div>
                  <CardDescription className="self-start">
                    Mail server IP reputation checks
                  </CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-0">
                  <div className="rounded-lg">
                    {/* IP Addresses Section */}
                    {mockBlocklistRecord?.mxServerBlacklists?.some((data) =>
                      isIPAddress(data.server)
                    ) && (
                      <div className="mb-4">
                        <div className="py-2 px-4 bg-muted font-medium text-sm">
                          IP Addresses (A Records)
                        </div>
                        <div className="divide-y">
                          {mockBlocklistRecord?.mxServerBlacklists
                            ?.filter((data) => isIPAddress(data.server))
                            .map((serverData, index) => {
                              // Count listed blacklists for this IP
                              const listedCount = serverData.blacklists.filter(
                                (bl) => bl.listed
                              ).length;

                              return (
                                <Collapsible key={`mx-ip-${serverData.server}`}>
                                  <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                                      <div className="flex items-center gap-2">
                                        {listedCount === 0 ? (
                                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-sm font-medium">
                                          {serverData.server}
                                        </span>
                                      </div>
                                      <Badge
                                        variant={
                                          listedCount === 0
                                            ? "success"
                                            : "destructive"
                                        }
                                      >
                                        {listedCount === 0
                                          ? "Clean"
                                          : `${listedCount} Listed`}
                                      </Badge>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="border-t">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b bg-muted/50">
                                            <th className="py-2 px-4 text-left font-medium">
                                              Blacklist
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Status
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Response
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {serverData.blacklists.map(
                                            (blacklist, idx) => (
                                              <tr key={idx}>
                                                <td className="py-2 px-4">
                                                  <div className="flex items-center gap-2">
                                                    {blacklist.listed ? (
                                                      <XCircle className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    )}
                                                    <span className="text-gray-700">
                                                      {blacklist.rblName}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td className="py-2 px-4 text-gray-700">
                                                  {blacklist.listed
                                                    ? "Listed"
                                                    : "Clean"}
                                                </td>
                                                <td className="py-2 px-4 text-gray-500">
                                                  {blacklist.response ||
                                                    "No response"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Domain Names Section */}
                    {mockBlocklistRecord?.mxServerBlacklists?.some(
                      (data) => !isIPAddress(data.server)
                    ) && (
                      <div>
                        <div className="py-2 px-4 bg-muted font-medium text-sm">
                          Host Names
                        </div>
                        <div className="divide-y">
                          {mockBlocklistRecord?.mxServerBlacklists
                            ?.filter((data) => !isIPAddress(data.server))
                            .map((serverData, index) => {
                              // Count listed blacklists for this domain
                              const listedCount = serverData.blacklists.filter(
                                (bl) => bl.listed
                              ).length;

                              return (
                                <Collapsible
                                  key={`mx-domain-${serverData.server}`}
                                >
                                  <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                                      <div className="flex items-center gap-2">
                                        {listedCount === 0 ? (
                                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-sm font-medium">
                                          {serverData.server}
                                        </span>
                                      </div>
                                      <Badge
                                        variant={
                                          listedCount === 0
                                            ? "success"
                                            : "destructive"
                                        }
                                      >
                                        {listedCount === 0
                                          ? "Clean"
                                          : `${listedCount} Listed`}
                                      </Badge>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <div className="border-t">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b bg-muted/50">
                                            <th className="py-2 px-4 text-left font-medium">
                                              Blacklist
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Status
                                            </th>
                                            <th className="py-2 px-4 text-left font-medium">
                                              Response
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {serverData.blacklists.map(
                                            (blacklist, idx) => (
                                              <tr key={idx}>
                                                <td className="py-2 px-4">
                                                  <div className="flex items-center gap-2">
                                                    {blacklist.listed ? (
                                                      <XCircle className="w-4 h-4 text-red-500" />
                                                    ) : (
                                                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    )}
                                                    <span className="text-gray-700">
                                                      {blacklist.rblName}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td className="py-2 px-4 text-gray-700">
                                                  {blacklist.listed
                                                    ? "Listed"
                                                    : "Clean"}
                                                </td>
                                                <td className="py-2 px-4 text-gray-500">
                                                  {blacklist.response ||
                                                    "No response"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* SMTP Server Blacklists */}
          <Collapsible defaultOpen>
            <Card>
              <CollapsibleTrigger className="w-full">
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
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {mockBlocklistRecord?.smtpBlacklist?.map(
                      (serverData, index) => (
                        <Collapsible key={serverData.server}>
                          <CollapsibleTrigger className="w-full">
                            <div className="flex items-center justify-between p-3 hover:bg-muted/50">
                              <div className="flex items-center gap-2">
                                <ChevronDown className="h-4 w-4 text-slate-600" />
                                <span className="font-medium text-sm">
                                  SMTP Server {index + 1}
                                </span>
                                <span className="text-sm text-slate-600">
                                  {serverData.server}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`${
                                  serverData.blacklists.every((b) => !b.listed)
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-red-500 text-white hover:bg-red-600"
                                }`}
                              >
                                {serverData.blacklists.every((b) => !b.listed)
                                  ? "All Clear"
                                  : "Issues Found"}
                              </Badge>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="border-t">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b bg-muted/50">
                                    <th className="py-2 px-4 text-left font-medium">
                                      Blacklist
                                    </th>
                                    <th className="py-2 px-4 text-left font-medium">
                                      Status
                                    </th>
                                    <th className="py-2 px-4 text-left font-medium">
                                      Response
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {serverData.blacklists.map(
                                    (blacklist, idx) => (
                                      <tr key={idx}>
                                        <td className="py-2 px-4">
                                          <div className="flex items-center gap-2">
                                            {blacklist.listed ? (
                                              <XCircle className="w-4 h-4 text-red-500" />
                                            ) : (
                                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            )}
                                            <span className="text-gray-700">
                                              {blacklist.rblName}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="py-2 px-4 text-gray-700">
                                          {blacklist.listed
                                            ? "Listed"
                                            : "Clean"}
                                        </td>
                                        <td className="py-2 px-4 text-gray-500">
                                          {blacklist.response || "No response"}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>

      {/* Placement by Provider Type */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-foreground">
            Placement by Provider Type
          </h2>
          <StyledTooltip description="Shows how your emails are delivered across different email service providers, categorized by B2C (consumer) and B2B (business) providers. This helps identify if deliverability issues are specific to certain provider types.">
            <Info className="h-4 w-4 text-muted-foreground" />
          </StyledTooltip>
        </div>
        <Card className="">
          {/* <CardHeader className="p-4 bg-muted/50 border-b rounded-t-lg">
          <CardTitle>Placement by Provider Type</CardTitle>
        </CardHeader> */}
          <CardContent className="p-4  space-y-3">
            {type === PlacementType.B2C
              ? providerData.b2c.map((item, index) => (
                  <ProviderCollapes
                    key={index}
                    provider={item.provider}
                    stats={item.stats}
                    emails={item.emails}
                    category={item.category}
                  />
                ))
              : providerData.b2b.map((item, index) => (
                  <ProviderCollapes
                    key={index}
                    provider={item.provider}
                    stats={item.stats}
                    emails={item.emails}
                    category={item.category}
                  />
                ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProgressCircle = ({
  percentage,
  color,
  className,
  strokeWidth = 8,
  textClassName,
}: {
  percentage: number;
  color: string;
  size?: number;
  className?: string;
  textClassName?: string;
  strokeWidth?: number;
}) => {
  const circumference = 289; // 2 * π * 46 (radius)
  const strokeDasharray = (percentage / 100) * circumference;

  return (
    <div className={cn("relative", className)}>
      {/* Background Circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-200"
          cx="50"
          cy="50"
          r="46"
          fill="none"
          strokeWidth={strokeWidth}
        />
      </svg>
      {/* Progress Circle */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          className={`transition-all duration-1000 ease-in-out ${color}`}
          cx="50"
          cy="50"
          r="46"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${strokeDasharray} ${circumference}`}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span
          className={cn(
            "text-sm font-bold text-muted-foreground",
            textClassName
          )}
        >
          {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default InboxPlacementReport;
