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
import {
  CheckCircle2,
  ChevronDown,
  Globe,
  Info,
  Mail,
  XCircle,
} from "lucide-react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import StyledTooltip from "@/components/styled-tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const blackListType = {
  domainBlacklist: {
    title: "Domain Blacklists",
    description: "Domain reputation and DNS-based blacklists",
    tooltip:
      "Domain blacklists check if your domain is listed on spam databases. Being blacklisted can severely impact email deliverability, causing your messages to be blocked or sent to spam folders.",
    icon: <Globe className="w-4 h-4 text-blue-500" />,
  },
  mxServerBlacklist: {
    title: "MX Server Blacklists",
    description: "Mail server IP reputation checks",
    tooltip:
      "MX Server Blacklists check if your mail server IPs are listed on spam databases. Being blacklisted can severely impact email deliverability, as many receiving servers will reject or filter emails from blacklisted IPs.",
    icon: <Globe className="w-4 h-4 text-blue-500" />,
  },
};

const isIPAddress = (server: string) => {
  // Simple regex to check if the server is an IP address
  return /^\d+\.\d+\.\d+\.\d+$/.test(server);
};

type BlackListData = {
  rblName: string;
  listed: boolean;
  description?: string;
  response: string;
  aLookuptTimeout?: boolean;
  hostname?: string;
};

type BlackListProps = {
  type: keyof typeof blackListType;
  data?: {
    server: string;
    blacklists: Array<BlackListData>;
  }[];
};

const BlackList = (props: BlackListProps) => {
  const currentBlacklist =
    blackListType[props.type as keyof typeof blackListType];
  return (
    <Collapsible defaultOpen>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {currentBlacklist.icon}
                {currentBlacklist.title}
                <StyledTooltip description={currentBlacklist.tooltip}>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </StyledTooltip>
              </CardTitle>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
            </div>
            <CardDescription className="self-start">
              {currentBlacklist.description}
            </CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-0">
            <div className="rounded-lg">
              {/* IP Addresses Section */}
              {props.data?.some((data) => isIPAddress(data.server)) && (
                <div className="mb-4">
                  <div className="py-2 px-4 bg-muted font-medium text-sm">
                    IP Addresses (A Records)
                  </div>
                  <div className="divide-y">
                    {props.data
                      ?.filter((data) => isIPAddress(data.server))
                      .map((serverData, index) => {
                        // Count listed blacklists for this IP
                        const listedCount = serverData.blacklists.filter(
                          (bl) => bl.listed
                        ).length;

                        // Sort blacklists to show listed entries first
                        serverData.blacklists.sort((a, b) => {
                          // Listed entries come first
                          if (a.listed && !b.listed) return -1;
                          if (!a.listed && b.listed) return 1;

                          // Then entries with responses
                          if (a.response && !b.response) return -1;
                          if (!a.response && b.response) return 1;

                          // Otherwise maintain original order
                          return 0;
                        });

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
                              <BlackListTable
                                blacklists={serverData.blacklists}
                              />
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Domain Names Section */}
              {props.data?.some((data) => !isIPAddress(data.server)) && (
                <div>
                  <div className="py-2 px-4 bg-muted font-medium text-sm">
                    Host Names
                  </div>
                  <div className="divide-y">
                    {props.data
                      ?.filter((data) => !isIPAddress(data.server))
                      .map((serverData, index) => {
                        // Count listed blacklists for this domain
                        const listedCount = serverData.blacklists.filter(
                          (bl) => bl.listed
                        ).length;

                        // Sort blacklists to show listed entries first
                        serverData.blacklists.sort((a, b) => {
                            // Listed entries come first
                            if (a.listed && !b.listed) return -1;
                            if (!a.listed && b.listed) return 1;

                            // Then entries with responses
                            if (a.response && !b.response) return -1;
                            if (!a.response && b.response) return 1;

                            // Otherwise maintain original order
                            return 0;
                          });

                        return (
                          <Collapsible key={`domain-${serverData.server}`}>
                            <CollapsibleTrigger className="w-full">
                              <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                                <div className="flex items-center gap-2">
                                  {listedCount === 0 ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
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
                              <BlackListTable
                                blacklists={serverData.blacklists}
                              />
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
  );
};

export const BlackListTable = ({
  blacklists,
}: {
  blacklists: Pick<BlackListData, "rblName" | "listed" | "response">[];
}) => {
  return (
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
        {blacklists?.map((blacklist, idx) => (
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

              <div className="md:hidden space-y-2">
                <div className="flex gap-2">
                  <span className=" text-muted-foreground min-w-[80px]">
                    Blacklist:
                  </span>
                  <span className="text-wrap break-all">
                    {blacklist.rblName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className=" text-muted-foreground min-w-[80px]">
                    Status:
                  </span>
                  {blacklist.listed ? "Listed" : "Clean"}
                </div>
                <div className="flex items-center gap-2">
                  <span className=" text-muted-foreground min-w-[80px]">
                    Response:
                  </span>
                  <span className="text-wrap break-all">
                    {blacklist.response || "No response"}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell">
              {blacklist.listed ? "Listed" : "Clean"}
            </TableCell>
            <TableCell className="py-2 px-4 text-muted-foreground hidden md:table-cell text-wrap break-words">
              {blacklist.response || "No response"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BlackList;
