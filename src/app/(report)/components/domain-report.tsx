/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CalendarPlus,
  CalendarX,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronDownIcon,
  ChevronUp,
  ChevronUpIcon,
  Clock,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  Info,
  Loader2,
  Mail,
  RefreshCw,
  Shield,
  Terminal,
  XCircle,
} from "lucide-react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailHealthTestResults from "./email-health-results";
import StyledTooltip from "@/components/styled-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetSharedReport } from "./hook/use-sharedreport";
import { cn } from "@/lib/utils";
import { getTooltip } from "./email-health-tooltips";
import { EmailHealthResult } from "@/types/report";
import { StructuredDnsRecords } from "@/types/report";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PrintContentButton from "./print-content-button";

type MxRecord = { exchange: string; priority: number };
type DnsRecordValue = string | string[] | MxRecord;

interface DmarcRecord {
  type: string;
  status: "valid" | "invalid";
  value: string;
  description: string;
}

const DomainReport = ({
  domain,
  companyId,
  reportId,
}: {
  domain: string;
  companyId: string;
  reportId: string;
}) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const { data: recordsData, isLoading: isDnsCheckLoading } =
    useGetSharedReport(domain, companyId, reportId);

  const [isExpanded, setIsExpanded] = useState(true);

  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const getSecurityStatus = (records: any[]) => {
    const validRecords =
      records?.filter((record) => record.status === "valid").length || 0;
    const totalRecords = records?.length || 0;
    const percentage = (validRecords / totalRecords) * 100;

    if (percentage >= 75) {
      return {
        status: "Excellent",
        color: "green",
        message: "Most records are valid",
      };
    } else if (percentage >= 50) {
      return {
        status: "Good",
        color: "yellow",
        message: "Some records need attention",
      };
    }
    return { status: "Poor", color: "red", message: "Many invalid records" };
  };

  const RecordDisplay = ({ record }: { record: any }) => {
    const renderSubRecords = () => {
      switch (record.type) {
        case "DNSSEC":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-3">
                <div className="pb-2 border-b">
                  <div className="font-medium mb-1">Domain DNSSEC</div>
                  <div className="space-y-1 pl-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          recordsData?.domainReport?.mailServerDnssec?.isValid
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="font-mono">
                        Domain:{" "}
                        <span className="text-wrap">
                          {recordsData?.domainReport?.mailServerDnssec
                            ?.domain || record.record?.domain}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          recordsData?.domainReport?.mailServerDnssec
                            ?.isDnssecSigned
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="font-mono">
                        Domain Registrar:
                        <span className={`ml-2`}>
                          {
                            recordsData?.domainReport?.mailServerDnssec
                              ?.registrar
                          }
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          recordsData?.domainReport?.mailServerDnssec
                            ?.isDnssecSigned
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      <span className="font-mono">
                        DNSSEC Signed:
                        <span
                          className={`ml-2 ${
                            recordsData?.domainReport?.mailServerDnssec
                              ?.isDnssecSigned
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {recordsData?.domainReport?.mailServerDnssec
                            ?.isDnssecSigned
                            ? "Yes"
                            : "No"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pb-2">
                  <div className="font-medium mb-1">Mail Server DNSSEC</div>
                  <div className="space-y-1 pl-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          (recordsData as any)?.mailServerReports[0]
                            ?.mailServerDnssec?.isValid
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="font-mono tex-wrap">
                        Mail Server:{" "}
                        {
                          (recordsData as any)?.mailServerReports[0]
                            ?.mailServerDnssec?.domain
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          (recordsData as any)?.mailServerReports[0]
                            ?.mailServerDnssec?.isDnssecSigned
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="font-mono">
                        DNSSEC Signed:
                        <span
                          className={`ml-2 ${
                            (recordsData as any)?.mailServerReports[0]
                              ?.mailServerDnssec?.isDnssecSigned
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(recordsData as any)?.mailServerReports[0]
                            ?.mailServerDnssec?.isDnssecSigned
                            ? "Yes"
                            : "No"}
                        </span>
                      </span>
                    </div>
                    {(recordsData as any)?.mailServerReports[0]
                      ?.mailServerDnssec?.registrar && (
                      <div className="flex items-center gap-2">
                        <span className="font-mono">
                          Registrar:{" "}
                          {
                            (recordsData as any)?.mailServerReports[0]
                              ?.mailServerDnssec?.registrar
                          }
                        </span>
                      </div>
                    )}
                    {(recordsData as any)?.mailServerReports[0]
                      ?.mailServerDnssec?.errors &&
                      (recordsData as any)?.mailServerReports[0]
                        ?.mailServerDnssec?.errors?.length > 0 && (
                        <div className="mt-2">
                          <div className="font-medium text-red-600">
                            Errors:
                          </div>
                          <ul className="list-disc pl-5 text-red-600">
                            {(
                              recordsData as any
                            )?.mailServerReports[0]?.mailServerDnssec?.errors?.map(
                              (error: string, idx: number) => (
                                <li key={idx}>{error}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );

        case "DMARC":
          return (
            <>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {record.record?.record?.status?.comment ||
                    "DMARC status not available"}
                </p>

                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        record?.result ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="font-medium">DMARC Policy</span>
                  </div>

                  <div className="space-y-2">
                    {record.record?.record?.rr &&
                      record.record.record.rr
                        .split(";")
                        .map((policy: string, idx: number) => {
                          const [key, value] = policy.trim().split("=");
                          if (!key || !value) return null;
                          return (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="font-mono text-muted-foreground">
                                {key}=
                              </span>
                              <span className="font-mono text-muted-foreground">
                                {value}
                              </span>
                            </div>
                          );
                        })}
                  </div>

                  {record.record?.record?.alignment && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Alignment</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            SPF:
                          </span>
                          <span className="text-sm">
                            {record.record.record.alignment.spf?.result}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (Mode:{" "}
                            {record.record.record.alignment.spf.strict
                              ? "strict"
                              : "relaxed"}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            DKIM:
                          </span>
                          <span className="text-sm">
                            {record.record.record.alignment.dkim?.result}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (Mode:{" "}
                            {record.record.record.alignment.dkim.strict
                              ? "strict"
                              : "relaxed"}
                            )
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          );

        case "DKIM":
          return (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {record.record?.record?.[0]?.status?.result === "pass"
                  ? `DKIM Signature verified: ${record.record.record[0].status?.result} (${record.record.record[0].signingDomain})`
                  : "DKIM verification failed"}
              </p>

              {record.record?.record?.map((dkimRecord: any, index: number) => (
                <div key={index} className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dkimRecord.status?.result === "pass"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="font-medium">Signature {index + 1}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-muted-foreground">Domain:</span>
                      <span className="font-mono text-muted-foreground">
                        {dkimRecord.signingDomain}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-muted-foreground">
                        Selector:
                      </span>
                      <span className="font-mono text-muted-foreground">
                        {dkimRecord.selector}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-muted-foreground">
                        Algorithm:
                      </span>
                      <span className="font-mono text-muted-foreground">
                        {dkimRecord.algo}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-muted-foreground">Result:</span>
                      <span className="font-mono text-muted-foreground">
                        {dkimRecord.status?.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );

        case "SPF":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Domain: {record.record?.record?.domain}</div>
                <div>Client IP: {record.record?.record?.["client-ip"]}</div>
                <div>HELO: {record.record?.record?.helo}</div>
                <div>
                  Envelope From: {record.record?.record?.["envelope-from"]}
                </div>
                <div>Record: {record.record?.record?.rr}</div>
                <div>Result: {record.record?.record?.status?.result}</div>
                <div>Comment: {record.record?.record?.status?.comment}</div>
              </div>
            </div>
          );

        case "TLS":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-3">
                {Array.isArray(record.record?.record) ? (
                  record.record.record.map(
                    (tlsGroup: any, groupIdx: number) => (
                      <div
                        key={groupIdx}
                        className="pb-2 border-b last:border-0"
                      >
                        <div className="font-medium mb-1">
                          Connection {groupIdx + 1}
                        </div>
                        <div className="space-y-1 pl-2">
                          {Array.isArray(tlsGroup) &&
                            tlsGroup.map((tls: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    tls.status === "good"
                                      ? "bg-green-500"
                                      : tls.status === "sufficient"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                />
                                <span className="font-mono">
                                  {tls.version}:{" "}
                                  <span
                                    className={`${
                                      tls.status === "good"
                                        ? "text-green-600"
                                        : tls.status === "sufficient"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {tls.status}
                                  </span>
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div>No TLS records found</div>
                )}
              </div>
            </div>
          );

        case "SSL":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  Trust Chain:{" "}
                  {record.record?.record?.trustChainValid ? "Valid" : "Invalid"}
                </div>
                <div>
                  Public Key:{" "}
                  {record.record?.record?.publicKeyValid ? "Valid" : "Invalid"}
                </div>
                <div>
                  Signature:{" "}
                  {record.record?.record?.signatureValid ? "Valid" : "Invalid"}
                </div>
                <div>
                  Domain Match:{" "}
                  {record.record?.record?.domainMatch ? "Valid" : "Invalid"}
                </div>
              </div>
            </div>
          );

        case "MX":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {(
                  record.record?.record || (record.record?.records as string[])
                ).map((mx: any, idx: number) => (
                  <div key={idx}>{mx}</div>
                ))}
              </div>
            </div>
          );

        case "STARTTLS":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-2">
                {(record.record?.records || record.record?.record)?.map(
                  (item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item[1] ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span>
                        {item[0]}: {item[1] ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  )
                )}
                {!record.record?.records?.length &&
                  !record.record?.record?.length && (
                    <div>No STARTTLS records found</div>
                  )}
              </div>
            </div>
          );

        case "ARC":
          return (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                {record.record && (
                  <>
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            record.record.DKIM ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">DKIM</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {record.record.DKIM ? "Valid" : "Invalid"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            record.record.SPF ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">SPF</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {record.record.SPF ? "Valid" : "Invalid"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            record.record.DMARC ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">DMARC</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {record.record.DMARC ? "Valid" : "Invalid"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );

        case "DNSKEY":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground space-y-3">
                {(record.record?.record || record.record?.records)?.map(
                  (dnskey: any, idx: number) => (
                    <div key={idx} className="border-b last:border-0">
                      <div className="font-medium mb-1">Record {idx + 1}</div>
                      <div className="space-y-1">
                        <div>Name: {dnskey.name}</div>
                        <div>
                          Type: {dnskey.type === 48 ? "DNSKEY" : "RRSIG"}
                        </div>
                        <div>TTL: {dnskey.TTL}</div>
                        <div className="break-all">
                          <span className="font-medium">Data:</span>{" "}
                          {dnskey.type === 48 ? (
                            <>
                              {dnskey.data
                                .split(" ")
                                .map((part: string, i: number) => (
                                  <span
                                    key={i}
                                    className={i <= 2 ? "text-blue-600" : ""}
                                  >
                                    {part}{" "}
                                  </span>
                                ))}
                            </>
                          ) : (
                            dnskey.data
                          )}
                        </div>
                        {dnskey.type === 48 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {parseInt(dnskey.data.split(" ")[0]) === 257
                              ? "Key Signing Key (KSK)"
                              : "Zone Signing Key (ZSK)"}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );

        case "RPKI":
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              {(record.record?.records || record.record?.record)?.map(
                (rpki: any, idx: number) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          rpki.hasValidROA ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="font-medium">
                        ROA Status: {rpki.hasValidROA ? "Valid" : "Invalid"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="font-medium">
                        Server: {rpki.checkedServer.server}
                      </div>
                      <div className="space-y-3">
                        {rpki.checkedServer.ipAddresses.map(
                          (ip: any, ipIdx: number) => (
                            <div
                              key={ipIdx}
                              className="bg-secondary p-3 rounded border"
                            >
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div>
                                  <span className="font-medium">Address:</span>{" "}
                                  {ip.address}
                                </div>
                                <div>
                                  <span className="font-medium">
                                    BGP Prefix:
                                  </span>{" "}
                                  {ip.bgpPrefix}
                                </div>
                                <div>
                                  <span className="font-medium">ASN:</span>{" "}
                                  {ip.asn}
                                </div>
                                <div>
                                  <span className="font-medium">Status:</span>{" "}
                                  <span
                                    className={`
                                    ${
                                      ip.validationState === "valid"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  `}
                                  >
                                    {ip.validationState
                                      .replace(/_/g, " ")
                                      .toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {rpki.errors.length > 0 && (
                      <div className="mt-2">
                        <div className="font-medium text-red-600">Errors:</div>
                        <ul className="list-disc list-inside text-sm text-red-600">
                          {rpki.errors.map(
                            (error: string, errorIdx: number) => (
                              <li key={errorIdx}>{error}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          );

        case "WHOIS":
          return (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {record?.result
                  ? "WHOIS record found and verified"
                  : "WHOIS verification failed"}
              </p>

              <div className="bg-secondary rounded-lg p-4">
                {/* Domain Information */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                    Domain Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Domain Name:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Domain Name"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Registry ID:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Registry Domain ID"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Created:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Created Date"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Updated:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Updated Date"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Expires:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Expiry Date"]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Registrar Information */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                    Registrar Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Registrar:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Registrar"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        IANA ID:
                      </span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Registrar IANA ID"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">URL:</span>
                      <span className="text-muted-foreground">
                        {getWhoisData(record)?.["Registrar URL"]}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Abuse Email:
                      </span>
                      <span className="text-muted-foreground">
                        {
                          getWhoisData(record)?.[
                            "Registrar Abuse Contact Email"
                          ]
                        }
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-muted-foreground">
                        Abuse Phone:
                      </span>
                      <span className="text-muted-foreground">
                        {
                          getWhoisData(record)?.[
                            "Registrar Abuse Contact Phone"
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Domain Status */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                    Domain Status
                  </h3>
                  <div className="space-y-2">
                    {getWhoisData(record)?.["Domain Status"]?.map(
                      (status: string, idx: number) => {
                        const statusParts = status.split(" ");
                        const statusType = statusParts[0];
                        const statusUrl = statusParts[1] || "";
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-sm font-medium">
                              {statusType}
                            </span>
                            {statusUrl && (
                              <span className="text-xs text-muted-foreground">
                                {statusUrl}
                              </span>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Name Servers */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                    Name Servers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getWhoisData(record)?.["Name Server"]?.map(
                      (ns: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-secondary p-2 rounded border text-sm"
                        >
                          {ns}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* DNSSEC Information */}
                {getWhoisData(record)?.["DNSSEC"] && (
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                      DNSSEC
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-muted-foreground">
                          Status:
                        </span>
                        <span className="text-muted-foreground">
                          {getWhoisData(record)?.["DNSSEC"]}
                        </span>
                      </div>
                      {getWhoisData(record)?.["DNSSEC DS Data"] && (
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-muted-foreground">
                            DS Data:
                          </span>
                          <span className="text-muted-foreground font-mono text-xs break-all">
                            {getWhoisData(record)?.["DNSSEC DS Data"]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                {getWhoisData(record)?.text && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground border-b pb-1">
                      Additional Information
                    </h3>
                    <div
                      className={cn(
                        "space-y-1 text-xs text-muted-foreground bg-secondary p-3 rounded border",
                        !isPrinting && "max-h-[400px] overflow-y-auto"
                      )}
                    >
                      {getWhoisData(record)?.text.map(
                        (line: string, idx: number) => (
                          <p key={idx}>{line}</p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        case "PTR": {
          // Use the actual record instead of sample data

          return (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {record?.result
                  ? "PTR records properly configured"
                  : "PTR record configuration issues detected"}
              </p>

              {/* PTR Record */}
              <div className="bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      record?.record?.result ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="font-medium">Inbound PTR Record</span>
                </div>

                <div className="space-y-3">
                  {record.record ? (
                    <div className="bg-secondary p-3 rounded border">
                      <div className=" text-sm">
                        <div className="flex  items-start gap-2 w-full">
                          <span className="font-medium text-muted-foreground w-[5rem]">
                            IP Address:
                          </span>
                          <span className="text-muted-foreground font-mono w-full">
                            {typeof (
                              record.record.record || record.record.records
                            ) === "string"
                              ? record.record.record || record.record.records
                              : Array.isArray(
                                  record.record.record || record.record.records
                                ) &&
                                (record.record.record || record.record.records)
                                  .length > 0
                              ? (
                                  record.record.record || record.record.records
                                ).map((item: string) => item)
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-muted-foreground">
                            Status:
                          </span>
                          <span
                            className={`${
                              record.record?.result
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {record.record?.result ? "Valid" : "Invalid"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No PTR records found
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      record?.record?.result ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="font-medium">Outbound PTR Record</span>
                </div>

                <div className="space-y-3">
                  {recordsData?.outboundPTR ? (
                    <div className="bg-secondary p-3 rounded border">
                      <div className=" text-sm">
                        <div className="flex  items-start gap-2 w-full">
                          <span className="font-medium text-muted-foreground w-[5rem]">
                            IP Address:
                          </span>
                          <span className="text-muted-foreground font-mono w-full">
                            {typeof recordsData?.outboundPTR === "string"
                              ? recordsData?.outboundPTR
                              : Array.isArray(recordsData?.outboundPTR) &&
                                recordsData.outboundPTR.length > 0
                              ? recordsData.outboundPTR
                                  .map((item: string) => item)
                                  .join(", ")
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-muted-foreground">
                            Status:
                          </span>
                          <span
                            className={`${
                              record.record?.result
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {record.record?.result ? "Valid" : "Invalid"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No PTR records found
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
        case "BIMI": {
          const bimiData = record.record?.record || record.record?.records;
          let logoUrl = "";

          // Extract logo URL using improved logic
          if (bimiData) {
            // Handle array case (which is what you have)
            if (Array.isArray(bimiData)) {
              for (const item of bimiData) {
                if (typeof item === "string") {
                  // Match l= parameter with proper regex for URL
                  const match = item.match(/l=([^;]+)/i);
                  if (match && match[1]) {
                    logoUrl = match[1].trim();
                    break;
                  }
                }
              }
            }
            // Handle object case
            else if (typeof bimiData === "object" && bimiData !== null) {
              logoUrl = bimiData.l || bimiData.logo || "";
            }
            // Handle string case
            else if (typeof bimiData === "string") {
              const match = bimiData.match(/l=([^;]+)/i);
              if (match && match[1]) {
                logoUrl = match[1].trim();
              }
            }
          }

          console.log("Extracted logo URL:", logoUrl); // Add this for debugging

          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {/* Display BIMI record data */}
                {!bimiData ? (
                  `No ${record.type} records found`
                ) : (
                  <div>
                    <pre className="whitespace-pre-wrap">
                      {typeof bimiData === "object" && !Array.isArray(bimiData)
                        ? JSON.stringify(bimiData, null, 2)
                        : Array.isArray(bimiData)
                        ? bimiData.join("\n")
                        : bimiData.toString()}
                    </pre>

                    {/* Debug info to see what was extracted */}
                    <div className="mt-2 text-xs text-muted-foreground">
                      Detected logo URL: {logoUrl || "None detected"}
                    </div>

                    {/* Warning for non-PEM logo */}
                    {logoUrl && !logoUrl.toLowerCase().endsWith(".pem") && (
                      <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-600 rounded text-yellow-600">
                        <p>
                          Certificate is missing. Consider purchasing a VMC
                          certificate for stronger brand validation and
                          protection.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        }
        default:
          return (
            <div className="mt-4 bg-secondary p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">
                {(() => {
                  const recordData =
                    record.record?.record || record.record?.records;

                  if (!recordData) {
                    return `No ${record.type} records found`;
                  }

                  if (Array.isArray(recordData)) {
                    return recordData.join(", ");
                  }

                  return typeof recordData === "object"
                    ? JSON.stringify(recordData, null, 2)
                    : recordData.toString();
                })()}
              </div>
            </div>
          );
      }
    };

    return <div className="">{renderSubRecords()}</div>;
  };

  const getRecordDescription = (record: any) => {
    switch (record.type) {
      case "DMARC":
        return `p=${record.record?.record?.policy || "none"} (${
          record.record?.record?.pct || 100
        }%)`;
      case "SPF":
        return record.record?.record?.rr || "No SPF record";
      case "DKIM": {
        const dkim = record.record?.record?.[0];
        return dkim
          ? `${dkim.selector}@${dkim.signingDomain}`
          : "No DKIM record";
      }
      default:
        return record.description || record.type;
    }
  };

  // Get all records from structured format
  const getStructuredRecords = (structuredRecords: StructuredDnsRecords) => {
    if (!structuredRecords) return [];

    return Object.entries(structuredRecords).map(([key, record]) => ({
      ...record,
      type: record.type || key,
      description: record.description || key,
    }));
  };

  const getRecordStatusDNSSEC = () => {
    // Check both mailServerReports.mailServerDnssec and domainReport.mailServerDnssec.dnssec

    return (recordsData as any)?.mailServerReports[0]?.mailServerDnssec
      ?.isDnssecSigned && recordsData?.domainReport?.mailServerDnssec?.isValid
      ? "valid"
      : "invalid";
  };

  const getRecordRecordDNSSEC = () => {
    // Return registrar information if available
    return {
      mailserver: (recordsData as any)?.mailServerReports[0]?.mailServerDnssec
        ?.domain,
      domain: recordsData?.domainReport?.mailServerDnssec?.registrar,
    };
  };

  const getRecordResultDNSSEC = () => {
    // Return more detailed result information
    const mailServerDnssec = (recordsData as any)?.mailServerReports[0]
      ?.mailServerDnssec;
    const domainDnssec = recordsData?.domainReport?.mailServerDnssec;

    if (!mailServerDnssec && !domainDnssec) return "No DNSSEC data available";

    if (mailServerDnssec?.errors && mailServerDnssec.errors.length > 0) {
      return false;
    }

    const isDnssecSigned =
      mailServerDnssec?.isDnssecSigned && domainDnssec?.isDnssecSigned;
    return isDnssecSigned ? true : false;
  };

  const records = recordsData?.structuredRecords
    ? getStructuredRecords(
        recordsData.structuredRecords as StructuredDnsRecords
      )
    : [];

  // First sorting (alphabetical)
  const alphabeticalRecords = [...records].sort((a, b) =>
    a.type.localeCompare(b.type)
  );

  // Transform and sort by priority
  const transformedRecords = Object.values(
    recordsData?.structuredRecords || {}
  ).map((record: any) => {
    if (record.type === "DNSSEC") {
      return {
        type: record.type,
        status: getRecordStatusDNSSEC(),
        description: getRecordDescription(record),
        record: getRecordRecordDNSSEC(),
        result: getRecordResultDNSSEC(),
      };
    }
    return {
      type: record.type,
      status: record?.result ? "valid" : "invalid",
      description: getRecordDescription(record),
      record: record.record,
    };
  });

  // Sort records by priority
  const sortedRecords = transformedRecords.sort((a, b) => {
    const priorityOrder = ["DMARC", "DKIM", "SPF", "MX", "ARC"];
    const aIndex = priorityOrder.indexOf(a.type);
    const bIndex = priorityOrder.indexOf(b.type);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return a.type.localeCompare(b.type);
  });

  const combineRecords = sortedRecords;

  const expandAll = () => {
    const newState: Record<number, boolean> = {};
    combineRecords.forEach((_, index) => {
      newState[index] = true;
    });
    setOpenSections(newState);
    setIsAllExpanded(true);
  };

  const collapseAll = () => {
    const newState: Record<number, boolean> = {};
    combineRecords.forEach((_, index) => {
      newState[index] = false;
    });
    setOpenSections(newState);
    setIsAllExpanded(false);
  };

  // Helper function to get the first available WHOIS record key
  const getWhoisKey = (whoisData: any) => {
    if (!whoisData) return null;
    // Get the first key from the WHOIS data object
    return Object.keys(whoisData)[0] || null;
  };

  // Helper function to get WHOIS data regardless of registrar key
  const getWhoisData = (record: any) => {
    if (!record?.record?.record) return null;
    const whoisKey = getWhoisKey(record.record.record);
    return whoisKey ? record.record.record[whoisKey] : null;
  };

  // Updated PTR record sample with valid records
  const ptrRecordSample = {
    type: "PTR",
    status: "valid",
    result: true, // Set to true to show "properly configured" message
    record: {
      inbound: {
        status: "valid",
        records: [
          {
            ip: "203.0.113.15",
            hostname: "mail.example.com",
            ttl: 3600,
            valid: true,
          },
          {
            ip: "203.0.113.16",
            hostname: "mail2.example.com",
            ttl: 3600,
            valid: true,
          },
          {
            ip: "203.0.113.17",
            hostname: "mail3.example.com",
            ttl: 3600,
            valid: true,
          },
        ],
      },
      outbound: {
        status: "valid",
        records: [
          {
            domain: "15.113.0.203.in-addr.arpa",
            pointsTo: "mail.example.com",
            ttl: 3600,
            valid: true,
          },
          {
            domain: "16.113.0.203.in-addr.arpa",
            pointsTo: "mail2.example.com",
            ttl: 3600,
            valid: true,
          },
          {
            domain: "17.113.0.203.in-addr.arpa",
            pointsTo: "mail3.example.com",
            ttl: 3600,
            valid: true,
          },
        ],
      },
      // No issues or recommendations needed since all records are valid
    },
  };
  // Add this function at the top of your DnsScoreDetails component or outside as a utility
  const isIPAddress = (server: string) => {
    // Simple regex to check if the server is an IP address
    return /^\d+\.\d+\.\d+\.\d+$/.test(server);
  };

  // This could go in your existing data processing code
  const processedBlacklistData = recordsData?.domainBlacklist?.map(
    (server, index) => {
      // Determine if this is an A record by checking if the server is an IP address
      const isIpAddress = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(server.server);
      return {
        ...server,
        isARecord: isIpAddress,
      };
    }
  );

  // Then use processedBlacklistData instead of recordsData?.domainBlacklist

  return (
    <>
      <div id="shared-report-print" className="w-full">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-4">
          <div>
            <h1 className="page-heading">Email Domain Health Report</h1>
          </div>
          {recordsData && (
            <div className="flex items-center gap-2">
              {recordsData.isPublic && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">
                    Published at
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(recordsData.publishedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              )}

              <PrintContentButton
                id="shared-report-print"
                preRunCallback={() => {
                  expandAll();
                  setIsPrinting(true);
                }}
                postRunCallback={() => {
                  setIsPrinting(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 my-4">
          <span className="font-medium">Domain Name</span>
          <span className="text-muted-foreground">{recordsData?.domain}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Score Card */}
          <Card
            className={cn("bg-gradient-to-br", {
              "from-red-900/20 to-transparent":
                (recordsData?.healthcheck?.score || 0) < 50,
              "from-yellow-900/20 to-transparent":
                (recordsData?.healthcheck?.score || 0) >= 50 &&
                (recordsData?.healthcheck?.score || 0) < 75,
              "from-blue-900/20 to-transparent":
                (recordsData?.healthcheck?.score || 0) >= 75,
            })}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                Overall Score
                <StyledTooltip description="The overall score evaluates your email health by combining results from all performed checks, DNS records verification, and blacklist status checks.">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </StyledTooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="relative w-32 h-32">
                        {/* Background Circle */}
                        <svg
                          className="absolute w-full h-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            className="stroke-gray-200"
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            strokeWidth="8"
                          />
                        </svg>
                        {/* Progress Circle */}
                        <svg
                          className="absolute w-full h-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            className={cn(
                              "transition-all duration-1000 ease-in-out",
                              {
                                "stroke-red-500":
                                  (recordsData?.healthcheck?.score || 0) < 50,
                                "stroke-yellow-500":
                                  (recordsData?.healthcheck?.score || 0) >=
                                    50 &&
                                  (recordsData?.healthcheck?.score || 0) < 75,
                                "stroke-blue-500":
                                  (recordsData?.healthcheck?.score || 0) >= 75,
                              }
                            )}
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${
                              ((recordsData?.healthcheck?.score || 0) / 100) *
                              289
                            } 289`}
                          />
                        </svg>
                        {/* Score Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">
                            {recordsData?.healthcheck?.score || 0}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            of 100
                          </span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p>Score: {recordsData?.healthcheck?.score || 0}/100</p>
                        <p>
                          Percentage:{" "}
                          {(
                            ((recordsData?.healthcheck?.score || 0) / 100) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="w-full pt-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total Checks
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">
                          {recordsData?.healthcheck?.totalChecks || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Passed Checks
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">
                          {recordsData?.healthcheck?.passedChecks || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Check</span>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">
                          {recordsData?.lastChecked
                            ? new Date(
                                recordsData.lastChecked
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Never"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status Card */}
          <Card
            className={cn("bg-gradient-to-br", {
              "bg-red-900/20":
                (recordsData?.healthcheck?.passedChecks || 0) <
                (recordsData?.healthcheck?.totalChecks || 0) * 0.5,
              "bg-yellow-900/20":
                (recordsData?.healthcheck?.passedChecks || 0) >=
                (recordsData?.healthcheck?.totalChecks || 0) * 0.5,
              "bg-green-900/20":
                (recordsData?.healthcheck?.passedChecks || 0) >=
                (recordsData?.healthcheck?.totalChecks || 0) * 0.75,
            })}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Security Score
                </h3>
                <StyledTooltip description="The security score is a percentage of the checks that passed.">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </StyledTooltip>
              </div>
              <div className="mt-2">
                <div
                  className={cn("flex items-center justify-between gap-2", {
                    "text-green-500":
                      (recordsData?.healthcheck?.passedChecks || 0) >=
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.75,
                    "text-yellow-500":
                      (recordsData?.healthcheck?.passedChecks || 0) >=
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.5,
                    "text-red-500":
                      (recordsData?.healthcheck?.passedChecks || 0) <
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.5,
                  })}
                >
                  <span className={cn("text-2xl font-semibold mb-2")}>
                    {(
                      ((recordsData?.healthcheck?.passedChecks || 0) /
                        (recordsData?.healthcheck?.totalChecks || 1)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>

                  <Shield className={cn("h-6 w-6")} />
                </div>
                <Progress
                  className="h-5 bg-neutral-100"
                  indicatorClassName={cn({
                    "bg-green-500":
                      (recordsData?.healthcheck?.passedChecks || 0) >=
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.75,
                    "bg-yellow-500":
                      (recordsData?.healthcheck?.passedChecks || 0) >=
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.5,
                    "bg-red-500":
                      (recordsData?.healthcheck?.passedChecks || 0) <
                      (recordsData?.healthcheck?.totalChecks || 1) * 0.5,
                  })}
                  value={
                    ((recordsData?.healthcheck?.passedChecks || 0) /
                      (recordsData?.healthcheck?.totalChecks || 1)) *
                    100
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Status Summary Card */}
          <Card className="bg-orange-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Records Status
                </h3>
                <StyledTooltip description="The records status is a summary of the status of the DNS records of your domain.">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </StyledTooltip>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-transparent to-red-200/30 p-2 pr-3 rounded-md">
                  {/* <div className="h-2 w-2 rounded-full bg-red-500" /> */}
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-foreground">Failed</span>
                  </div>
                  <span className="text-xl font-semibold text-red-500">
                    {recordsData?.healthcheck?.checkResults?.filter(
                      (r) => r.status === "fail"
                    ).length || 0}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-transparent to-yellow-200/30 p-2 pr-3 rounded-md">
                    {/* <div className="h-2 w-2 rounded-full bg-yellow-400" /> */}
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-foreground">Warnings</span>
                    </div>
                    <span className="text-xl font-semibold text-yellow-500">
                      {recordsData?.healthcheck?.warnings || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-transparent to-green-200/30 p-2 pr-3 rounded-md">
                  {/* <div className="h-2 w-2 rounded-full bg-green-500" /> */}
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground">Passed</span>
                  </div>
                  <span className="text-xl font-semibold text-green-500">
                    {recordsData?.healthcheck?.passedChecks || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <EmailHealthTestResults
          testResults={recordsData?.emailHealthData as EmailHealthResult}
          isPrinting={isPrinting}
        />

        <Card className="mt-5 mb-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 [&[data-state=open]>svg]:rotate-180">
              <div className="  flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  {recordsData?.healthcheck?.checkResults?.filter(
                    (item) =>
                      item.status === "warning" || item.status === "fail"
                  ).length || 0}{" "}
                  <span className="flex items-center gap-1">
                    Problems
                    <StyledTooltip description="The DNS errors are the errors that were found in the DNS records of your domain.">
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </StyledTooltip>
                  </span>
                </h3>
              </div>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Separator />
              <div className="">
                <div className="rounded-lg overflow-hidden">
                  <Table className="w-full text-sm">
                    <TableHeader>
                      <TableRow className="border-b bg-muted/50">
                        <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                          Name
                        </TableHead>
                        <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                          Message
                        </TableHead>
                        <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recordsData?.healthcheck?.checkResults
                        ?.filter(
                          (item) =>
                            item.status === "warning" || item.status === "fail"
                        )
                        .map((error, index) => (
                          <TableRow
                            key={index}
                            className={`border-b last:border-0 ${
                              index % 2 === 0 ? "bg-secondary" : "bg-muted/50"
                            }`}
                          >
                            <TableCell className="py-3 px-4">
                              <div className="items-center gap-2 hidden md:flex">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    error.status === "warning"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                />
                                <span className="font-medium">
                                  {error.category}
                                </span>
                              </div>

                              <div className="md:hidden">
                                <div className="flex items-center gap-2">
                                  <span className=" text-gray-500">
                                    Category:
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <div
                                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                                        error.status === "warning"
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}
                                    />
                                    {error.category}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className=" text-gray-500">Name:</span>
                                  {error.name}
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className=" text-gray-500">
                                    Status:
                                  </span>
                                  {error.status}
                                </div>
                                <div className="flex gap-2">
                                  <span className=" text-gray-500">
                                    Message:
                                  </span>
                                  {error.message || "--"}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3 px-4 hidden md:table-cell">
                              {error.name}
                            </TableCell>
                            <TableCell className="py-3 px-4 hidden md:table-cell">
                              {error.message || "--"}
                            </TableCell>
                            <TableCell className="py-3 px-4 hidden md:table-cell">
                              <div className="flex ">
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-medium uppercase ${
                                    error.status === "warning"
                                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                      : "bg-red-100 text-red-800 border border-red-300"
                                  }`}
                                >
                                  {error.status}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Email Delivery Chain</h2>
          <div className="grid gap-4">
            <Collapsible defaultOpen>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span>Receiving Chain</span>
                        <StyledTooltip description="The receiving chain shows the step-by-step routing and processing time of your email across SMTP servers.">
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </StyledTooltip>
                      </CardTitle>
                      <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                    </div>
                    <CardDescription className="self-start text-left">
                      Step-by-step routing and processing time of your email
                      across SMTP servers
                    </CardDescription>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-x-auto">
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
                        {recordsData?.formattedReceivedChain?.map(
                          (hop: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="py-2 px-4">
                                <span className="hidden md:block">{index}</span>
                                {/* Mobile */}
                                <div className="md:hidden">
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500">
                                      Step:
                                    </span>
                                    {index}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500">
                                      Delay:
                                    </span>
                                    <span className="text-green-600">
                                      {hop?.delay || ""}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500 ">
                                      From:
                                    </span>
                                    <span className="font-mono">
                                      {hop?.from || ""}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500">To:</span>
                                    <span className="font-mono">
                                      {hop?.to || ""}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500">
                                      Protocol:
                                    </span>
                                    {hop?.protocol || ""}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className=" text-gray-500">
                                      Time received:
                                    </span>
                                    {hop?.timeReceived || ""}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="py-2 px-4 text-green-600 hidden md:table-cell">
                                {hop?.delay || ""}
                              </TableCell>
                              <TableCell className="py-2 px-4 font-mono hidden md:table-cell">
                                {hop?.from || ""}
                              </TableCell>
                              <TableCell className="py-2 px-4 text-center hidden md:table-cell">
                                <ArrowRight className="w-4 h-4 text-muted-foreground inline" />
                              </TableCell>
                              <TableCell className="py-2 px-4 font-mono hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  {hop?.to || ""}
                                </div>
                              </TableCell>
                              <TableCell className="py-2 px-4 hidden md:table-cell">
                                {hop?.protocol || ""}
                              </TableCell>
                              <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                {hop?.timeReceived || ""}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Email Health Results</h2>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (!isAllExpanded) {
                  expandAll();
                } else {
                  collapseAll();
                }
              }}
              className="text-xs"
            >
              {!isAllExpanded ? (
                <>
                  <ChevronDownIcon className="h-4 w-4 mr-1" />
                  Expand All
                </>
              ) : (
                <>
                  <ChevronUpIcon className="h-4 w-4 mr-1" />
                  Collapse All
                </>
              )}
            </Button>
          </div>
        </div>

        <div className=" mb-6">
          <div className="space-y-3">
            {isDnsCheckLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {combineRecords.map(
                  (record: any, index: number) => (
                    console.log(record, "record"),
                    (
                      <Collapsible
                        key={index}
                        open={openSections[index]}
                        onOpenChange={(isOpen) => {
                          setOpenSections((prev) => {
                            const newState = { ...prev, [index]: isOpen };
                            const allExpanded = combineRecords.every(
                              (_, i) => newState[i] === true
                            );
                            setIsAllExpanded(allExpanded);
                            return newState;
                          });
                        }}
                      >
                        <Card className="overflow-hidden shadow-none">
                          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 [&[data-state=open]>svg]:rotate-180">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  record.status === "valid" ||
                                  record.description === "PTR"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{record.type}</h3>
                                  <StyledTooltip
                                    description={getTooltip(record.type)}
                                  >
                                    <Info className="w-3 h-3 text-muted-foreground" />
                                  </StyledTooltip>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {record.description ||
                                    (record.status === "valid"
                                      ? "Record found"
                                      : "No record found")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`${
                                  record?.result ||
                                  record.type === "PTR" ||
                                  record.status === "valid"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {record.type === "PTR" ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : record?.result ||
                                  record.status === "valid" ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <XCircle className="w-4 h-4" />
                                )}
                              </span>
                              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <Separator />
                            <CardContent className="p-3 text-sm">
                              <RecordDisplay record={record} />
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    )
                  )
                )}
              </div>
            )}
          </div>
        </div>
        {/* Add Domain Age Card here */}
        <div className="mb-6">
          <Card>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-muted/50 transition-colors pr-4 [&[data-state=open]>svg]:rotate-180">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      Domain Age
                    </CardTitle>
                  </div>
                  <CardDescription className="self-start">
                    {(() => {
                      const whoisRecord = records.find(
                        (r) => r.type === "WHOIS"
                      );
                      const whoisData = getWhoisData(whoisRecord);
                      const createdDate = whoisData?.["Created Date"];

                      return createdDate
                        ? `Domain created on ${new Date(
                            createdDate
                          ).toLocaleDateString()}`
                        : "Domain creation date unavailable";
                    })()}
                  </CardDescription>
                </CardHeader>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Separator />
                <CardContent className="py-4">
                  {(() => {
                    // Find the WHOIS record in our records array
                    const whoisRecord = records.find((r) => r.type === "WHOIS");
                    const whoisData = getWhoisData(whoisRecord);

                    const redirectRecord = recordsData?.domainReport;

                    if (!whoisData) {
                      return (
                        <div className="py-4 text-center text-muted-foreground">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>WHOIS data not available for this domain</p>
                        </div>
                      );
                    }

                    // Calculate domain age
                    const createdDate = new Date(whoisData["Created Date"]);
                    const now = new Date();
                    const ageInYears = (
                      (now.getTime() - createdDate.getTime()) /
                      (1000 * 60 * 60 * 24 * 365.25)
                    ).toFixed(1);

                    // Calculate expiry time
                    const expiryDate = new Date(whoisData["Expiry Date"]);
                    const daysLeft = Math.ceil(
                      (expiryDate.getTime() - now.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div className="space-y-6">
                        {/* Domain Age */}
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-foreground border-b pb-1">
                            Domain Age
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-secondary p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">Age</span>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-2xl font-bold text-foreground">
                                  {(() => {
                                    // Calculate age in different units
                                    const ageInDays = Math.ceil(
                                      (now.getTime() - createdDate.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    );
                                    const ageInMonths = Math.floor(
                                      ageInDays / 30.44
                                    ); // Average days in a month
                                    const ageInYears = (
                                      (now.getTime() - createdDate.getTime()) /
                                      (1000 * 60 * 60 * 24 * 365.25)
                                    ).toFixed(1);

                                    // Display in appropriate units based on age
                                    if (ageInDays < 30) {
                                      return (
                                        <>
                                          {ageInDays}{" "}
                                          <span className="text-sm font-normal">
                                            days
                                          </span>
                                        </>
                                      );
                                    } else if (ageInMonths < 12) {
                                      return (
                                        <>
                                          {ageInMonths}{" "}
                                          <span className="text-sm font-normal">
                                            months
                                          </span>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <>
                                          {ageInYears}{" "}
                                          <span className="text-sm font-normal">
                                            years
                                          </span>
                                        </>
                                      );
                                    }
                                  })()}
                                </p>

                                {/* Age Classification Tag */}
                                {(() => {
                                  const ageInDays = Math.ceil(
                                    (now.getTime() - createdDate.getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  );

                                  if (ageInDays < 30) {
                                    return (
                                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300">
                                        New Domain
                                      </Badge>
                                    );
                                  } else if (
                                    ageInDays >= 30 &&
                                    ageInDays <= 90
                                  ) {
                                    return (
                                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
                                        Recent Domain
                                      </Badge>
                                    );
                                  } else {
                                    return (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">
                                        Established Domain
                                      </Badge>
                                    );
                                  }
                                })()}
                              </div>

                              {/* Domain Age Meter */}
                              <div className="mt-4">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                  {(() => {
                                    const ageInDays = Math.ceil(
                                      (now.getTime() - createdDate.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    );

                                    // Cap at 365 days (1 year) for the progress bar
                                    const percentage = Math.min(
                                      (ageInDays / 365) * 100,
                                      100
                                    );

                                    let bgColor = "bg-red-500";
                                    if (ageInDays >= 90)
                                      bgColor = "bg-green-500";
                                    else if (ageInDays >= 30)
                                      bgColor = "bg-yellow-500";

                                    return (
                                      <div
                                        className={`h-full ${bgColor} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    );
                                  })()}
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                  <span>0 days</span>
                                  <span>30 days</span>
                                  <span>90 days</span>
                                  {/* <span>1 year</span> */}
                                </div>
                              </div>

                              {/* Classification Info */}
                              <div className="mt-4 text-xs text-muted-foreground">
                                {(() => {
                                  const ageInDays = Math.ceil(
                                    (now.getTime() - createdDate.getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  );

                                  if (ageInDays < 30) {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>New domains</strong> (less
                                          than 30 days) may have lower
                                          deliverability as they haven&apos;t
                                          established reputation with email
                                          providers.
                                        </span>
                                      </div>
                                    );
                                  } else if (
                                    ageInDays >= 30 &&
                                    ageInDays <= 90
                                  ) {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Recent domains</strong> (30-90
                                          days) have started building reputation
                                          but may still face some deliverability
                                          challenges.
                                        </span>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Established domains</strong>{" "}
                                          (over 90 days) typically have better
                                          deliverability and are less likely to
                                          be flagged as suspicious.
                                        </span>
                                      </div>
                                    );
                                  }
                                })()}
                              </div>
                            </div>

                            <div className="bg-secondary p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">Expires In</span>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-2xl font-bold text-foreground">
                                  {daysLeft}{" "}
                                  <span className="text-sm font-normal">
                                    days
                                  </span>
                                </p>

                                {/* Expiry Classification Tag */}
                                {(() => {
                                  if (daysLeft < 30) {
                                    return (
                                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300">
                                        Critical
                                      </Badge>
                                    );
                                  } else if (daysLeft >= 30 && daysLeft <= 90) {
                                    return (
                                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
                                        Warning
                                      </Badge>
                                    );
                                  } else {
                                    return (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">
                                        Good
                                      </Badge>
                                    );
                                  }
                                })()}
                              </div>

                              {/* Domain Expiry Meter */}
                              <div className="mt-4">
                                <div className="h-2 w-full bg-red-500 rounded-full overflow-hidden">
                                  {(() => {
                                    // Calculate percentage based on 95 days max
                                    const percentage = Math.min(
                                      (daysLeft / 95) * 100,
                                      100
                                    );

                                    return (
                                      <div
                                        className="h-full bg-green-500 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    );
                                  })()}
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                  <span>0 days</span>
                                  <span>30 days</span>
                                  <span>90 days</span>
                                  {/* <span>1 year</span> */}
                                </div>
                              </div>

                              {/* Classification Info */}
                              <div className="mt-4 text-xs text-muted-foreground">
                                {(() => {
                                  if (daysLeft < 30) {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Critical:</strong> Your domain
                                          expires soon. Renew immediately to
                                          avoid service interruption and loss of
                                          domain control.
                                        </span>
                                      </div>
                                    );
                                  } else if (daysLeft >= 30 && daysLeft <= 90) {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Warning:</strong> Your domain
                                          will expire within 90 days. Consider
                                          renewing soon to ensure continued
                                          operation.
                                        </span>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Good:</strong> Your domain is
                                          not due for renewal soon. You have
                                          plenty of time before expiration.
                                        </span>
                                      </div>
                                    );
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Domain Timeline */}
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-foreground border-b pb-1">
                            Domain Timeline
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="bg-green-100 p-1 rounded-full mt-0.5">
                                <CalendarPlus className="w-3.5 h-3.5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">Created</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(
                                    whoisData["Created Date"]
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Last Updated</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(
                                    whoisData["Updated Date"]
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <div className="bg-red-100 p-1 rounded-full mt-0.5">
                                <CalendarX className="w-3.5 h-3.5 text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium">Expires</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(
                                    whoisData["Expiry Date"]
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Domain Meta Information */}
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-foreground border-b pb-1">
                            Registry Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-foreground">
                                Domain Name:
                              </span>
                              <span className="text-muted-foreground">
                                {whoisData["Domain Name"]}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-foreground">
                                Registry ID:
                              </span>
                              <span className="text-muted-foreground">
                                {whoisData["Registry Domain ID"]}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-foreground">
                                Registrar:
                              </span>
                              <span className="text-muted-foreground">
                                {whoisData["Registrar"]}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-foreground">
                                IANA ID:
                              </span>
                              <span className="text-muted-foreground">
                                {whoisData["Registrar IANA ID"]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Domain Redirection */}
        <div className="mb-6">
          <Card className="w-full">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-muted/50 transition-colors pr-4 [&[data-state=open]>svg]:rotate-180">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      Domain Redirection
                    </CardTitle>
                  </div>

                  <CardDescription className="flex items-center space-x-3">
                    {recordsData?.domainReport?.redirectResult?.redirect ? (
                      <span className="text-sm font-medium text-green-600">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-red-600">
                        No
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">
                      Domain Redirection Screenshot
                    </h3>
                    <div className="bg-secondary rounded-lg border p-4">
                      {recordsData?.domainReport?.redirectResult?.imageUrl ? (
                        <img
                          src={
                            recordsData?.domainReport?.redirectResult?.imageUrl
                          }
                          alt="Domain Redirection Screenshot"
                          className="w-screen max-h-15 rounded-md"
                        />
                      ) : (
                        <div className="bg-secondary border rounded-md text-sm text-muted-foreground flex items-center gap-2">
                          <ImageIcon className="size-4" />
                          No redirection screenshot available
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">
                      Domain redirection Url
                    </h3>
                    {recordsData?.domainReport?.redirectResult?.redirect &&
                    recordsData?.domainReport?.redirectResult?.redirectUrl ? (
                      <div className="flex items-center">
                        <div className="flex-1 p-2.5 bg-secondary border rounded-l-md text-sm text-blue-600">
                          {
                            recordsData?.domainReport?.redirectResult
                              ?.redirectUrl
                          }
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-l-none border-l-0 h-[40px]"
                          onClick={() =>
                            window.open(
                              recordsData?.domainReport?.redirectResult
                                ?.redirectUrl || "",
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Visit URL</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-secondary border rounded-md text-sm text-muted-foreground">
                        No redirection URL configured
                      </div>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Blacklists */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Blacklists</h2>
          <div className="grid gap-4">
            {/* Domain Blacklists Section */}
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
                      {recordsData?.domainBlacklist?.some((data) =>
                        isIPAddress(data.server)
                      ) && (
                        <div className="mb-4">
                          <div className="py-2 px-4 bg-muted font-medium text-sm">
                            IP Addresses (A Records)
                          </div>
                          <div className="divide-y">
                            {recordsData?.domainBlacklist
                              ?.filter((data) => isIPAddress(data.server))
                              .map((serverData, index) => {
                                // Count listed blacklists for this IP
                                const listedCount =
                                  serverData.blacklists.filter(
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
                                        <Table className="w-full text-sm">
                                          <TableHeader>
                                            <TableRow className="border-b bg-muted/50">
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Blacklist
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Status
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Response
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody className="divide-y">
                                            {serverData.blacklists.map(
                                              (blacklist, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell className="py-2 px-4">
                                                    <div className="items-center gap-2 hidden md:flex">
                                                      {blacklist.listed ? (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                      ) : (
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                      )}
                                                      <span className="text-muted-foreground">
                                                        {blacklist.rblName}
                                                      </span>
                                                    </div>

                                                    <div className="md:hidden">
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Blacklist:
                                                        </span>
                                                        {blacklist.rblName}
                                                      </div>

                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Status:
                                                        </span>
                                                        {blacklist.listed
                                                          ? "Listed"
                                                          : "Clean"}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Response:
                                                        </span>
                                                        {blacklist.response ||
                                                          "No response"}
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.listed
                                                      ? "Listed"
                                                      : "Clean"}
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.response ||
                                                      "No response"}
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Domain Names Section */}
                      {recordsData?.domainBlacklist?.some(
                        (data) => !isIPAddress(data.server)
                      ) && (
                        <div>
                          <div className="py-2 px-4 bg-muted font-medium text-sm">
                            Host Names
                          </div>
                          <div className="divide-y">
                            {recordsData?.domainBlacklist
                              ?.filter((data) => !isIPAddress(data.server))
                              .map((serverData, index) => {
                                // Count listed blacklists for this domain
                                const listedCount =
                                  serverData.blacklists.filter(
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
                                        <Table className="w-full text-sm">
                                          <TableHeader>
                                            <TableRow className="border-b bg-muted/50">
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Blacklist
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Status
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Response
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody className="divide-y">
                                            {serverData.blacklists.map(
                                              (blacklist, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell className="py-2 px-4">
                                                    <div className="items-center gap-2 hidden md:flex">
                                                      {blacklist.listed ? (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                      ) : (
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                      )}
                                                      <span className="text-muted-foreground">
                                                        {blacklist.rblName}
                                                      </span>
                                                    </div>

                                                    <div className="md:hidden">
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Blacklist:
                                                        </span>
                                                        {blacklist.rblName}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Status:
                                                        </span>
                                                        {blacklist.listed
                                                          ? "Listed"
                                                          : "Clean"}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Response:
                                                        </span>
                                                        {blacklist.response ||
                                                          "No response"}
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.listed
                                                      ? "Listed"
                                                      : "Clean"}
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.response ||
                                                      "No response"}
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )}
                                          </TableBody>
                                        </Table>
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
                        <Globe className="w-4 h-4 text-blue-500" />
                        MX Server Blacklists
                        <StyledTooltip description="Mail server IP reputation checks verify if your mail servers are listed on spam databases. Being blacklisted can impact email deliverability.">
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
                      {recordsData?.mxServerBlacklists?.some((data) =>
                        isIPAddress(data.server)
                      ) && (
                        <div className="mb-4">
                          <div className="py-2 px-4 bg-muted font-medium text-sm">
                            IP Addresses (A Records)
                          </div>
                          <div className="divide-y">
                            {recordsData?.mxServerBlacklists
                              ?.filter((data) => isIPAddress(data.server))
                              .map((serverData, index) => {
                                // Count listed blacklists for this IP
                                const listedCount =
                                  serverData.blacklists.filter(
                                    (bl) => bl.listed
                                  ).length;

                                return (
                                  <Collapsible
                                    key={`mx-ip-${serverData.server}`}
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
                                        <Table className="w-full text-sm">
                                          <TableHeader>
                                            <TableRow className="border-b bg-muted/50">
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Blacklist
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Status
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Response
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody className="divide-y">
                                            {serverData.blacklists.map(
                                              (blacklist, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell className="py-2 px-4">
                                                    <div className="items-center gap-2 hidden md:flex">
                                                      {blacklist.listed ? (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                      ) : (
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                      )}
                                                      <span className="text-muted-foreground break-all">
                                                        {blacklist.rblName}
                                                      </span>
                                                    </div>

                                                    <div className="md:hidden">
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Blacklist:
                                                        </span>
                                                        {blacklist.rblName}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Status:
                                                        </span>
                                                        {blacklist.listed
                                                          ? "Listed"
                                                          : "Clean"}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Response:
                                                        </span>
                                                        {blacklist.response ||
                                                          "No response"}
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.listed
                                                      ? "Listed"
                                                      : "Clean"}
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.response ||
                                                      "No response"}
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Domain Names Section */}
                      {recordsData?.mxServerBlacklists?.some(
                        (data) => !isIPAddress(data.server)
                      ) && (
                        <div>
                          <div className="py-2 px-4 bg-muted font-medium text-sm">
                            Host Names
                          </div>
                          <div className="divide-y">
                            {recordsData?.mxServerBlacklists
                              ?.filter((data) => !isIPAddress(data.server))
                              .map((serverData, index) => {
                                // Count listed blacklists for this domain
                                const listedCount =
                                  serverData.blacklists.filter(
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
                                        <Table className="w-full text-sm">
                                          <TableHeader>
                                            <TableRow className="border-b bg-muted/50">
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Blacklist
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Status
                                              </TableHead>
                                              <TableHead className="py-2 px-4 text-left font-medium hidden md:table-cell">
                                                Response
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody className="divide-y">
                                            {serverData.blacklists.map(
                                              (blacklist, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell className="py-2 px-4">
                                                    <div className="items-center gap-2 hidden md:flex">
                                                      {blacklist.listed ? (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                      ) : (
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                      )}
                                                      <span className="text-muted-foreground">
                                                        {blacklist.rblName}
                                                      </span>
                                                    </div>

                                                    <div className="md:hidden">
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Blacklist:
                                                        </span>
                                                        {blacklist.rblName}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Status:
                                                        </span>
                                                        {blacklist.listed
                                                          ? "Listed"
                                                          : "Clean"}
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                        <span className=" text-muted-foreground">
                                                          Response:
                                                        </span>
                                                        {blacklist.response ||
                                                          "No response"}
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.listed
                                                      ? "Listed"
                                                      : "Clean"}
                                                  </TableCell>
                                                  <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
                                                    {blacklist.response ||
                                                      "No response"}
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )}
                                          </TableBody>
                                        </Table>
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

            {/* SMTP Server Blacklists - Already at the bottom */}
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
                      {recordsData?.smtpBlacklist?.map((serverData, index) => (
                        <Collapsible key={serverData.server} className="w-full">
                          <CollapsibleTrigger className="w-full">
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
                          <CollapsibleContent className="w-full">
                            <div className="min-w-full">
                              <Table className="w-full text-sm">
                                <TableHeader>
                                  <TableRow className="border-b bg-muted/50">
                                    <TableHead className="py-2 px-4 text-left font-medium whitespace-nowrap hidden md:table-cell">
                                      Blacklist
                                    </TableHead>
                                    <TableHead className="py-2 px-4 text-left font-medium whitespace-nowrap hidden md:table-cell">
                                      Status
                                    </TableHead>
                                    <TableHead className="py-2 px-4 text-left font-medium whitespace-nowrap hidden md:table-cell">
                                      Response
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y">
                                  {serverData.blacklists.map(
                                    (blacklist, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell className="py-2 px-4 whitespace-nowrap">
                                          <div className="items-center gap-2 hidden md:flex">
                                            {blacklist.listed ? (
                                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                            ) : (
                                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            )}
                                            <span className="text-muted-foreground break-all">
                                              {blacklist.rblName}
                                            </span>
                                          </div>

                                          <div className="md:hidden">
                                            <div className="flex items-center gap-2">
                                              <span className=" text-muted-foreground">
                                                Blacklist:
                                              </span>
                                              {blacklist.rblName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className=" text-muted-foreground">
                                                Status:
                                              </span>
                                              {blacklist.listed
                                                ? "Listed"
                                                : "Clean"}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className=" text-muted-foreground">
                                                Response:
                                              </span>
                                              {blacklist.response ||
                                                "No response"}
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell className="py-2 px-4 text-muted-foreground whitespace-nowrap hidden md:table-cell">
                                          {blacklist.listed
                                            ? "Listed"
                                            : "Clean"}
                                        </TableCell>
                                        <TableCell className="py-2 px-4 text-muted-foreground whitespace-nowrap hidden md:table-cell">
                                          {blacklist.response || "No response"}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>

        {/* Open relay check */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Open relay check</h2>
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
                      <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
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
                          {recordsData?.relaycheck?.sessionLines.map(
                            (line, index) => {
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
                                    recordsData?.relaycheck?.openRelay
                                      ? "bg-red-100 text-red-600 dark:bg-red-900/20"
                                      : "bg-green-100 text-green-600 dark:bg-green-900/20"
                                  }
                                `}
                            >
                              {recordsData?.relaycheck?.openRelay ? (
                                <XCircle className="w-5 h-5" />
                              ) : (
                                <CheckCircle2 className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {recordsData?.relaycheck?.openRelay
                                  ? "Open Relay Detected"
                                  : "No Open Relay Detected"}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {recordsData?.relaycheck?.openRelay
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
                                      recordsData?.relaycheck?.startTlsSupported
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }
                                  `}
                              ></div>
                              <span className="text-sm">
                                STARTTLS:{" "}
                                {recordsData?.relaycheck?.startTlsSupported
                                  ? "Enabled"
                                  : "Not enabled"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`
                                    w-2 h-2 rounded-full
                                    ${
                                      recordsData?.relaycheck?.errored
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }
                                  `}
                              ></div>
                              <span className="text-sm">
                                Test Status:{" "}
                                {recordsData?.relaycheck?.errored
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
    </>
  );
};

export default DomainReport;
