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
import { cn } from "@/lib/utils";
import { EmailHealthResult } from "@/types/report";
import {
  Calendar,
  Database,
  Download,
  Hash,
  Info,
  Mail,
  Usb,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface EmailHealthTestResultsProps {
  testResults: EmailHealthResult;
  isPrinting?: boolean;
}

export const SanitizedHtmlViewer = ({ html }: { html: string }) => {
  const [viewMode, setViewMode] = useState<"rendered" | "source">("source");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && viewMode === "rendered") {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <base target="_blank">
              <style>
                body {
                  margin: 0;
                  padding: 16px;
                  font-family: system-ui, -apple-system, sans-serif;
                  line-height: 1.5;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
                a {
                  color: #2563eb;
                }
                * {
                  max-width: 100%;
                }
              </style>
            </head>
            <body>${html}</body>
          </html>
        `);
        doc.close();

        // Adjust iframe height to content
        iframe.style.height = `${doc.body.scrollHeight + 32}px`;
      }
    }
  }, [html, viewMode]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">HTML Content</h3>
        <div className="flex justify-end bg-muted/50 border rounded-md">
          <Button
            variant={viewMode === "rendered" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("rendered")}
            className="h-6 border-none"
          >
            Rendered
          </Button>
          <Button
            variant={viewMode === "source" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("source")}
            className="h-6 border-none"
          >
            Source
          </Button>
        </div>
      </div>

      {viewMode === "rendered" ? (
        <iframe
          ref={iframeRef}
          className="w-full bg-white rounded-md"
          sandbox="allow-same-origin allow-popups"
        />
      ) : (
        <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
          {html}
        </pre>
      )}
    </div>
  );
};

export default function EmailHealthTestResults({
  testResults,
  isPrinting,
}: EmailHealthTestResultsProps) {
  const handleDownloadRawEmail = () => {
    const blob = new Blob([testResults?.raw], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "raw-email.eml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadEmailContent = () => {
    const blob = new Blob([testResults?.body?.html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-content.html";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="max-w-full space-y-4 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              <span className="break-all">{testResults?.email}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">From:</span>
              </div>
              <span className="break-all">{testResults?.from?.text}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <Usb className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">IP:</span>
              </div>
              <span className="break-all">{testResults?.spf?.clientIp}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">Subject:</span>
              </div>
              <span className="break-all">{testResults?.subject}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">Date:</span>
              </div>
              <span>{new Date(testResults?.date).toLocaleString()}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <Hash className="w-5 h-5 mr-2 shrink-0 text-blue-600" />
                <span className="font-semibold whitespace-nowrap">
                  Message ID:
                </span>
              </div>
              <span className="break-all">
                {testResults?.messageId || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-muted/50 border-b md:flex-row justify-between">
            <div>
              <CardTitle>Email Content</CardTitle>
              <CardDescription>Message body content</CardDescription>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center md:mr-2 text-xs text-muted-foreground">
                <StyledTooltip description="The total size of the email template">
                  <div className="flex text-sm items-center gap-1 bg-muted/40 px-2 py-1 rounded-md">
                    <Database className="w-3 h-3 text-foreground" />
                    <span>
                      {((testResults?.body?.html?.length || 0) / 1024).toFixed(
                        1
                      )}{" "}
                      KB
                    </span>
                  </div>
                </StyledTooltip>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadEmailContent}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              {/* <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" /> */}
            </div>
          </CardHeader>
          <CardContent className="pt-6 text-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Plain Text</h3>
                <div className="bg-secondary p-4 rounded-md whitespace-pre-wrap">
                  {testResults?.body?.text}
                </div>
              </div>
              <div>
                <div className="rounded-md">
                  <SanitizedHtmlViewer html={testResults?.body?.html} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      <Card className="w-full">
        <CardHeader className="bg-muted/50 border-b flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>Raw Email</span>
            <StyledTooltip description="The raw email content is the original email message that was tested. It includes the email headers and body content.">
              <Info className="w-3 h-3 text-muted-foreground" />
            </StyledTooltip>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownloadRawEmail}>
            <Download className="w-4 h-4" />
            Download
          </Button>
        </CardHeader>
        <CardContent className="py-6">
          <pre
            className={cn(
              "rounded-md whitespace-pre-wrap text-sm font-mono   break-words w-full",
              !isPrinting && "max-h-[400px] overflow-y-auto"
            )}
            style={{
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {testResults?.raw}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
