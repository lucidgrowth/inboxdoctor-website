/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import StyledTooltip from "@/components/styled-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowUpRight,
  Code,
  Eye,
  Inbox,
  Info,
  MailWarning,
  OctagonAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlacementType } from "@/types/inbox-placement.types";
import {
  useGetInboxPlacementProviderBreakdownReport,
  useGetSharedInboxPlacementReport,
} from "./hook/use-sharedreport";
import { EmailPlacementChart } from "./placement-chart";
import ProviderCollapes from "./provider-collapes";
import PrintContentButton from "./print-content-button";
import Link from "next/link";

const InboxPlacementReport = ({
  companyId,
  testId,
}: {
  companyId: string;
  testId: string;
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

  const {
    data: inboxPlacementReport,
    isLoading: isLoadingInboxPlacementReport,
    isSuccess: isSuccessInboxPlacementReport,
  } = useGetSharedInboxPlacementReport(companyId, testId);

  const { data: providerBreakdown, isLoading: isLoadingProviderBreakdown } =
    useGetInboxPlacementProviderBreakdownReport(companyId, testId);

  const statsCards = useMemo(() => {
    if (!inboxPlacementReport?.summary) {
      // Return default cards or empty array if data isn't available yet
      return [];
    }

    return [
      {
        icon: Inbox,
        title: "Inbox",
        value: inboxPlacementReport.summary.inbox.count,
        outof: inboxPlacementReport.summary.total,
        percentage: inboxPlacementReport.summary.inbox.percentage,
        classNames: {
          stroke: "stroke-green-500 dark:stroke-green-500",
          icon: "text-green-600 bg-green-100 dark:text-green-600 dark:bg-green-900/30",
        },
      },
      {
        icon: OctagonAlert,
        title: "Spam",
        value: inboxPlacementReport.summary.spam.count,
        outof: inboxPlacementReport.summary.total,
        percentage: inboxPlacementReport.summary.spam.percentage,
        classNames: {
          stroke: "stroke-red-500 dark:stroke-red-500",
          icon: "text-red-600 bg-red-100 dark:text-red-600 dark:bg-red-900/30",
        },
      },
      {
        icon: MailWarning,
        title: "Unreceived",
        value: inboxPlacementReport.summary.unreceived.count,
        outof: inboxPlacementReport.summary.total,
        percentage: inboxPlacementReport.summary.unreceived.percentage,
        classNames: {
          stroke: "stroke-yellow-500 dark:stroke-yellow-500",
          icon: "text-yellow-600 bg-yellow-100 dark:text-yellow-600 dark:bg-yellow-900/30",
        },
      },
    ];
  }, [inboxPlacementReport]);

  const b2cchartData = useMemo(() => {
    if (
      !inboxPlacementReport?.providerResults ||
      !inboxPlacementReport.providerResults.length
    ) {
      // Return default data if no provider results available
      return [];
    }

    return inboxPlacementReport.providerResults.map((provider) => {
      const total = provider.inbox + provider.spam + provider.unreceived;
      return {
        month: provider.displayName,
        Inbox: total > 0 ? Math.round((provider.inbox / total) * 100) : 0,
        Spam: total > 0 ? Math.round((provider.spam / total) * 100) : 0,
        Unreceived:
          total > 0 ? Math.round((provider.unreceived / total) * 100) : 0,
        Total: total,
      };
    });
  }, [inboxPlacementReport?.providerResults]);

  // B2B Chart Data with useMemo
  const b2bChartData = useMemo(() => {
    if (
      !inboxPlacementReport?.providerResults ||
      !inboxPlacementReport.providerResults.length
    ) {
      // Return default data if no provider results available
      return [];
    }

    return inboxPlacementReport.providerResults.map((provider) => {
      const total = provider.inbox + provider.spam + provider.unreceived;
      return {
        month: provider.displayName,
        Inbox: total > 0 ? Math.round((provider.inbox / total) * 100) : 0,
        Spam: total > 0 ? Math.round((provider.spam / total) * 100) : 0,
        Unreceived:
          total > 0 ? Math.round((provider.unreceived / total) * 100) : 0,
        Total: total,
      };
    });
  }, [inboxPlacementReport?.providerResults]);

  const type = inboxPlacementReport?.test?.testType;

  return (
    <div className="space-y-6 w-full" id="inbox-placement-report">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Inbox Placement Report
          </h1>
          <p className="text-muted-foreground text-center md:text-left">
            {inboxPlacementReport?.test?.senderEmail || "Not available"}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex flex-col md:flex-row items-center gap-2">
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
              {inboxPlacementReport?.test?.isCompleted && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-600 border-green-600 dark:bg-green-900/30 dark:text-green-500 dark:border-green-500"
                >
                  Completed
                </Badge>
              )}
            </div>

            {isSuccessInboxPlacementReport && inboxPlacementReport?.success && (
              <PrintContentButton
                id="inbox-placement-report"
                type="inbox-placement"
                filename={inboxPlacementReport?.test?.senderEmail || ""}
                preRunCallback={() => {
                  setIsPrinting(true);
                }}
                postRunCallback={() => {
                  setIsPrinting(false);
                }}
              />
            )}
          </div>
          <p className="text-muted-foreground">
            Completed on:{" "}
            {inboxPlacementReport?.test?.completedAt
              ? new Date(
                  inboxPlacementReport?.test?.completedAt
                ).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "Not available"}
          </p>
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

      {(inboxPlacementReport?.summary?.spam?.count || 0) > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="">Deliverability Issues Detected</AlertTitle>
          <AlertDescription className="">
            Your emails are landing in spam folders for some providers. We
            recommend warming up your inbox.
          </AlertDescription>
          <Link href="/#pricing">
            <Button variant="outline" size="sm" className="mt-2">
              <span>Warm up your inbox</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Alert>
      )}

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
                  {inboxPlacementReport?.test?.senderEmail || "Not available"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Subject:</span>
                <span className="text-muted-foreground">
                  {inboxPlacementReport?.test?.subject || "Not available"}
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
                      value={inboxPlacementReport?.test?.htmlBody}
                      readOnly
                      className="font-mono text-sm h-64"
                    />
                  ) : (
                    <div
                      className={cn(
                        "border rounded-md p-4 h-64 overflow-y-auto text-black",
                        isPrinting && "h-auto overflow-y-visible"
                      )}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: inboxPlacementReport?.test?.htmlBody || "",
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
          <CardContent className="p-4 space-y-3">
            {providerBreakdown?.providers &&
              providerBreakdown.providers.length > 0 &&
              providerBreakdown.providers.map((provider, index) => {
                // Transform the provider data to match what ProviderCollapes expects
                const transformedProvider = {
                  provider: provider.displayName,
                  providerKey: provider.provider,
                  stats: {
                    inbox: Math.round(provider.inboxPercentage),
                    spam: Math.round(provider.spamPercentage),
                    unreceived: Math.round(provider.unreceivedPercentage),
                  },
                  // Extract categories from categoryBreakdown if it exists
                  category: provider.categoryBreakdown
                    ? Object.keys(provider.categoryBreakdown || {}).filter(
                        (key) =>
                          key !== "other" &&
                          (provider.categoryBreakdown?.[
                            key as keyof typeof provider.categoryBreakdown
                          ]?.count || 0) > 0
                      )
                    : [],
                  // Transform emails to the format expected by ProviderCollapes
                  emails: provider.emails.map((email) => ({
                    address: email.email,
                    status: mapDeliveryStatus(email.deliveredTo),
                    category: email.category?.toLowerCase() || undefined,
                    authStatus: email.authStatus,
                    senderIp: email.senderIP,
                  })),
                };

                return (
                  <ProviderCollapes
                    key={index}
                    provider={transformedProvider.provider}
                    providerKey={transformedProvider.providerKey}
                    stats={transformedProvider.stats}
                    emails={transformedProvider.emails}
                    category={transformedProvider.category}
                    testId={testId}
                    forceOpen={isPrinting}
                  />
                );
              })}
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
          className="stroke-gray-200 dark:stroke-gray-600/40"
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

function mapDeliveryStatus(deliveredTo: string | undefined): string {
  if (!deliveredTo) return "Unreceived";

  switch (deliveredTo.toLowerCase()) {
    case "inbox":
      return "Inbox";
    case "spam":
      return "Spam";
    default:
      return "Unreceived";
  }
}

export default InboxPlacementReport;
