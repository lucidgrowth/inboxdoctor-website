"use client";

import StyledTooltip from "@/components/styled-tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CircleCheck,
  CircleX,
  Inbox,
  Mail,
  MailWarning,
  OctagonAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

import { mapToColorClasses } from "@/lib/colors";
import {
  Envelope,
  Icon,
  Info as InfoIcon,
  Tag as TagIcon,
  Users as UsersIcon,
} from "@phosphor-icons/react";
import { EmailDetails } from "./email-details";
import { getTooltip } from "./email-health-tooltips";
// import { getTooltip } from "../email-health/email-health-tooltips";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Inbox":
      return <Inbox className="text-green-600 dark:text-green-500" />;
    case "Spam":
      return <OctagonAlert className="text-red-600 dark:text-red-500" />;
    case "Unreceived":
      return <MailWarning className="text-yellow-600 dark:text-yellow-500" />;
    default:
      return null;
  }
};

const getPercentageColor = (status: string, value: number) => {
  switch (status) {
    case "Inbox":
      return "text-green-600";
    case "Spam":
      return "text-red-600";
    case "Unreceived":
      return "text-yellow-600";
    default:
      return "text-muted-foreground";
  }
};

export interface IProviderData {
  provider: string;
  providerKey: string;
  stats: {
    inbox: number;
    spam: number;
    unreceived: number;
  };
  category: string[];
  emails: { address: string; status: string; category?: string }[];
  testId: string;
  forceOpen: boolean;
}
export interface IProviderDataState {
  b2c: IProviderData[];
  b2b: IProviderData[];
}

const iconMap: Record<string, Icon> = {
  primary: Inbox,
  promotion: TagIcon,
  social: UsersIcon,
  updates: InfoIcon,
  focused: Inbox,
  others: Envelope,
  newsletter: TagIcon,
  notification: InfoIcon,
  vip: Envelope,
  inbox: Inbox,
};

const ProviderCollapes = ({
  provider,
  providerKey,
  stats,
  emails,
  category,
  testId,
  forceOpen,
}: IProviderData) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { key: "inbox", label: "Inbox", value: stats.inbox || 0 },
    { key: "spam", label: "Spam", value: stats.spam || 0 },
    { key: "unreceived", label: "Unreceived", value: stats.unreceived || 0 },
  ];

  const categoryBreakdown = useMemo(() => {
    if (!category || category.length === 0) return [];

    const inboxEmails = emails.filter((email) => email.status === "Inbox");
    const totalInboxEmails = inboxEmails.length;
    const totalInboxPercentage = stats.inbox;

    // If no inbox emails, return empty breakdown
    if (totalInboxEmails === 0) return [];

    const breakdown = category.map((cat) => {
      const categoryEmails = inboxEmails.filter(
        (email) => email.category?.toLowerCase() === cat.toLowerCase()
      ).length;

      // Calculate this category's share of the total inbox percentage
      const categoryPercentage =
        (categoryEmails / totalInboxEmails) * totalInboxPercentage;

      return {
        label: cat.toLowerCase(),
        value: categoryPercentage,
        progressBarValue: (categoryEmails / totalInboxEmails) * 100,
      };
    });

    return breakdown;
  }, [emails, category, stats.inbox]);
  return (
    <div
      className={cn(
        "group border rounded-lg transition-colors overflow-hidden bg-background"
      )}
    >
      <button
        className="w-full flex items-center p-4 text-left cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{provider}</h3>
              <p className="text-sm text-muted-foreground">
                Emails: {emails.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center rounded-md overflow-hidden">
                {statuses.map((status) => (
                  <StyledTooltip
                    key={status.key}
                    description={`${status.label} - ${status.value}%`}
                  >
                    <div
                      className={cn(
                        "flex items-center min-w-[60px] px-2 gap-1",
                        mapToColorClasses(status.key, ["bg", "text"])
                      )}
                    >
                      <span className="[&_svg]:size-4">
                        {getStatusIcon(status.label)}
                      </span>
                      <span className="text-sm font-medium">
                        {status.value}%
                      </span>
                    </div>
                  </StyledTooltip>
                ))}
              </div>
              <Separator orientation="vertical" className="h-4 hidden md:block" />
              <div className="items-center gap-2 hidden md:flex ">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500 border-none"
                >
                  DKIM
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500 border-none"
                >
                  SPF
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500 border-none"
                >
                  DMARC
                </Badge>
              </div>
            </div>
          </div>
          <div className="md:hidden flex h-2 rounded-full overflow-hidden mt-2">
            {statuses.map((status) => (
              <div
                key={status.key}
                className={mapToColorClasses(status.key, ["bg_500"])}
                style={{ width: `${status.value}%` }}
              />
            ))}
          </div>
        </div>
        <ChevronRight
          className={`h-5 w-5 text-muted-foreground transition-transform ml-6 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* ESP-specific Category Legend with common statuses */}
      <div className="px-4 pb-3">
        <span className="text-sm text-muted-foreground">
          Inbox Category Legend
        </span>
        <div className="flex items-center gap-4 py-2 flex-wrap">
          {/* Show ESP-specific categories if available */}
          {category && category.length > 0 ? (
            category.map((cat) => {
              const key = cat.toLowerCase();
              const Icon = iconMap[key] || Mail;

              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon
                    weight="duotone"
                    className={cn(
                      "size-4",
                      mapToColorClasses(`category_${key}`, ["text"])
                    )}
                  />

                  <span className="text-sm capitalize font-medium">{key}</span>
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      mapToColorClasses(`category_${key}`, ["bg_500"])
                    )}
                  />
                </div>
              );
            })
          ) : (
            /* Show default Inbox status if no categories */
            <div className="flex items-center gap-2">
              <Inbox className="size-4 text-green-600" />

              <span className="text-sm capitalize font-medium">Inbox</span>
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          )}

          {/* Common statuses - always show Spam and Unreceived */}
          <div className="flex items-center gap-2">
            <OctagonAlert className="size-4 text-red-600" />

            <span className="text-sm capitalize font-medium">Spam</span>
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
          <div className="flex items-center gap-2">
            <MailWarning className="size-4 text-yellow-600" />

            <span className="text-sm capitalize font-medium">Unreceived</span>
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
          </div>
        </div>
      </div>

      {(isOpen || forceOpen) && (
        <ProviderCollapesContent
          categoryBreakdown={categoryBreakdown}
          statuses={statuses}
          emails={emails}
          providerKey={providerKey}
          testId={testId}
        />
      )}
    </div>
  );
};

const ProviderCollapesContent = ({
  categoryBreakdown,
  emails,
  statuses,
  providerKey,
  testId,
}: {
  categoryBreakdown: {
    label: string;
    value: number;
    progressBarValue: number;
  }[];
  statuses: {
    key: string;
    label: string;
    value: number;
  }[];
  emails: { address: string; status: string; category?: string }[];
  providerKey: string;
  testId: string;
}) => {
  return (
    <div className="border-t bg-muted/50">
      <div className="space-y-3">
        {/* Category Breakdown */}
        {categoryBreakdown.length > 0 && (
          <div className="px-4 py-2">
            <span className="text-sm text-muted-foreground">
              Inbox Category Breakdown
            </span>
            <div className="flex h-3 rounded-full overflow-hidden mt-2">
              {categoryBreakdown.map((cat) => (
                <div
                  key={cat.label}
                  className={cn(
                    mapToColorClasses(`category_${cat.label}`, ["bg_500"])
                  )}
                  style={{ width: `${cat.progressBarValue}%` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 py-2 flex-wrap">
              {categoryBreakdown.map((cat) => {
                const Icon = iconMap[cat.label] || Mail;

                if (cat.label === "social") return null;
                return (
                  <div key={cat.label} className="flex items-center gap-2">
                    <Icon
                      weight="duotone"
                      className={cn(
                        "size-4",
                        mapToColorClasses(`category_${cat.label}`, ["text"])
                      )}
                    />
                    <span className="text-sm text-muted-foreground capitalize font-medium">
                      {cat.label}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-slate-100 text-slate-500 dark:bg-white/20 dark:text-white px-2 border-none"
                    >
                      {cat.value.toFixed(1)}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Status Progress Bar (for ESPs without categories) */}
        {(!categoryBreakdown || categoryBreakdown.length === 0) && (
          <div className="px-4 pt-3 pb-2">
            <div className="flex h-3 rounded-full overflow-hidden">
              {statuses.map((status) => (
                <div
                  key={status.key}
                  className={mapToColorClasses(status.key, ["bg_500"])}
                  style={{ width: `${status.value}%` }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4 py-2 flex-wrap">
              {statuses.map((status) => (
                <div key={status.key} className="flex items-center gap-2">
                  <span className="[&_svg]:size-4">
                    {getStatusIcon(status.label)}
                  </span>
                  <span className="text-sm font-medium">{status.label}</span>
                  <Badge
                    variant="outline"
                    className="bg-slate-100 text-slate-500 dark:bg-white/20 dark:text-white px-2 border-none"
                  >
                    {status.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Delivered to</TableHead>
                <TableHead>Sender IP</TableHead>
                <TableHead>
                  <StyledTooltip description={getTooltip("DKIM")}>
                    <span className="underline">DKIM</span>
                  </StyledTooltip>
                </TableHead>
                <TableHead>
                  <StyledTooltip description={getTooltip("SPF")}>
                    <span className="underline">SPF</span>
                  </StyledTooltip>
                </TableHead>
                <TableHead>
                  <StyledTooltip description={getTooltip("DMARC")}>
                    <span className="underline">DMARC</span>
                  </StyledTooltip>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email, index) => (
                <TableRow key={`${email.address}-${index}`}>
                  <TableCell>
                    {email.status === "Unreceived" ? (
                      <span>{email.address}</span>
                    ) : (
                      <EmailDetails
                        email={email.address}
                        providerKey={providerKey}
                        testId={testId}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs font-medium uppercase">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-l-md",
                          !email.category && "rounded-r-md",
                          mapToColorClasses(email.status.toLowerCase(), [
                            "bg",
                            "text",
                          ])
                        )}
                      >
                        {email.status}
                      </span>
                      {(email.category || email.status !== "social") && (
                        <span
                          className={cn(
                            "px-2 py-1 rounded-r-md",
                            mapToColorClasses(`category_${email.category}`, [
                              "bg",
                              "text",
                            ])
                          )}
                        >
                          {email.category}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {email.status.toLowerCase() === "unreceived" ? (
                      <span></span>
                    ) : (
                      <span>123.123.123.123</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {email.status.toLowerCase() === "unreceived" ? (
                      <CircleX className="text-red-500 size-5" />
                    ) : (
                      <CircleCheck className="text-green-500 size-5" />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {email.status.toLowerCase() === "unreceived" ? (
                      <CircleX className="text-red-500 size-5" />
                    ) : (
                      <CircleCheck className="text-green-500 size-5" />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {email.status.toLowerCase() === "unreceived" ? (
                      <CircleX className="text-red-500 size-5" />
                    ) : (
                      <CircleCheck className="text-green-500 size-5" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProviderCollapes;
