export interface EmailHealthResult {
  _id: string;
  email: string;
  domain: string;
  domainCreatedAt: Date | null;
  from: {
    text: string;
    email: string;
  };
  subject: string;
  date: string;
  dkim: {
    status: {
      result: string;
      header: {
        i: string;
        s: string;
        a: string;
        b: string;
      };
      aligned: string;
    };
    results: Array<{
      status: {
        result: string;
        header: {
          i: string;
          s: string;
          a: string;
          b: string;
        };
        aligned: string;
      };
    }>;
  };
  spf: {
    domain: string;
    clientIp: string;
    helo: string;
    status: {
      result: string;
      comment: string;
    };
  };
  dmarc: {
    status: {
      result: string;
      comment: string;
    };
    domain: string;
    policy: string;
  };
  arc: {
    status: {
      result: string;
    };
    authResults: string;
    i: number;
  };
  bimi: {
    status: {
      result: string;
      comment: string;
    };
    info: string;
  };
  body: {
    text: string;
    html: string;
  };
  raw: string;
  messageId: string;
  isPublic: boolean;
  publishedAt: string;
  companyId: string;
}

// import { DeliveryError } from "@/routes/_private/postmaster/tabs/delivery-error-tab";
// import { EmailHealthResult } from "./email-health";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PostmasterDomain {
  domain: string;
  isVerified: boolean;
  lastSyncedDate: string;
  dkimSuccessRatio: number;
  dmarcSuccessRatio: number;
  spfSuccessRate: number;
  reputation: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";
  inboundEncryptionRatio: number;
  outboundEncryptionRatio: number;
  spamRate: number;
  gpmStatus: "GPM Connected" | "Not Connected";
  date: string | null;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PostmasterDomainsResponse {
  domains: PostmasterDomain[];
  stats: {
    reputationStats: {
      high: number;
      medium: number;
      low: number;
      bad: number;
      unknown: number;
    };
    spamStats: {
      good: number; // Domains with spam rate < 0.3%
      attention: number; // Domains with spam rate >= 0.3%
      total: number;
    };
    verificationStats: {
      verified: number;
      unverified: number;
      total: number;
    };
  };
  pagination: Pagination;
}

export interface SpamRateResponse {
  statistics: {
    currentSpamRate: number;
    averageSpamRate: number;
    totalReports: number;
    status: "Good standing" | "Needs attention";
  };
  chartData: {
    date: string;
    value: number;
  }[];
  tableData: {
    date: string;
    value: number;
  }[];
}

export interface IpReputationData {
  reputation: string;
  ipCount: string;
  sampleIps: string[];
}

export interface IpReputationResponse {
  statistics: {
    currentReputation: number;
    totalActiveIps: number;
    monitoringPeriod: string;
    status: string;
  };
  chartData: {
    date: string;
    high: number;
    medium: number;
    low: number;
    bad: number;
    ipReputations: IpReputationData[];
  }[];
  ipList: {
    ip: string;
    status: string;
    sampleIps: string[];
  }[];
}

export interface DomainReputationResponse {
  statistics: {
    currentReputation: string;
    status: string;
    monitoringPeriod: string;
    reputationScore: number;
  };
  chartData: {
    date: string;
    reputation: string;
    value: number;
  }[];
  reputationLevels: string[];
}

export interface AuthenticationResponse {
  statistics: {
    dkim: {
      current: number;
      status: string;
    };
    spf: {
      current: number;
      status: string;
    };
    dmarc: {
      current: number;
      status: string;
    };
    monitoringPeriod: string;
  };
  chartData: {
    date: string;
    dkim: number;
    spf: number;
    dmarc: number;
  }[];
}

export interface EncryptionResponse {
  statistics: {
    inbound: {
      current: number;
      status: string;
    };
    outbound: {
      current: number;
      status: string;
    };
    monitoringPeriod: string;
  };
  chartData: {
    date: string;
    inbound: number;
    outbound: number;
  }[];
}

export interface FlaggedIdentifier {
  identifier: string;
  spamRatio: number;
}

export interface FeedbackLoopResponse {
  statistics: {
    currentSpamRate: number;
    identifierCount: number;
    status: string;
    flaggedIdentifiers: FlaggedIdentifier[];
  };
  chartData: {
    date: string;
    spamRate: number;
    identifierCount: number;
  }[];
}

interface DnsRecord {
  type: string;
  status: "valid" | "invalid";
  records: any[];
}

interface RecordSection {
  domain: string;
  records: DnsRecord[];
  timestamp: string;
  overallScore: number;
  mailboxConnected: boolean;
}

export interface DnsCheckResponse {
  dns: RecordSection;
  email: RecordSection;
}

export interface PostmasterDnsRecordsResponse {
  records: {
    domain: string;
    overallScore: number;
    lastChecked: Date;
    status: string;
    records: Record<string, "valid" | "invalid">;
  }[];
  stats: {
    excellent: number; // > 90
    good: number; // 80-90
    average: number; // 70-80
    poor: number; // < 70
    total: number;
  };
  pagination: Pagination;
}

// Add new type for connected accounts
export interface PostmasterAccount {
  id: string;
  createdAt: Date;
  lastSyncedDate: string;
  isActive: boolean;
  email: string;
}

// Update existing interface to include connected accounts info
export interface PostmasterConnectionStatus {
  isConnected: boolean;
  accounts: PostmasterAccount[];
}

// Dns types

// interfaces/dns-records.interface.ts

export interface DnsRecordDetail {
  type: string;
  status: "valid" | "invalid";
  records: Array<{
    type: string;
    status: "valid" | "invalid";
    records: Array<string | { exchange: string; priority: number } | string[]>;
  }>;
  description: string;
}

export interface BasicRecords {
  A: DnsRecordDetail;
  AAAA: DnsRecordDetail;
  CNAME: DnsRecordDetail;
  MX: DnsRecordDetail;
  TXT: DnsRecordDetail;
  PTR: DnsRecordDetail;
}

export interface SecurityRecords {
  DNSSEC: DnsRecordDetail;
  DNSKEY: DnsRecordDetail;
  DS: DnsRecordDetail;
  DANE: DnsRecordDetail;
}

export interface EmailRecords {
  DMARC: DnsRecordDetail;
  SPF: DnsRecordDetail;
  DKIM: DnsRecordDetail;
  BIMI: DnsRecordDetail;
  "MTA-STS": DnsRecordDetail;
}

export interface AuthenticationRecords {
  TLS: DnsRecordDetail;
  StartTLS: DnsRecordDetail;
  X509: DnsRecordDetail;
  RPKI: DnsRecordDetail;
}

export interface StructuredDnsRecords {
  basic: BasicRecords;
  security: SecurityRecords;
  email: EmailRecords;
  authentication: AuthenticationRecords;
}
export interface BlacklistResult {
  rblName: string;
  listed: boolean;
  response: string;
  aLookuptTimeout: boolean;
  host: string;
}
export interface DnsErrorDisplay {
  category: string;
  host: string;
  result: string;
}

export interface BlacklistCheck {
  uriChecked: string;
  ipBlacklistsResults: BlacklistResult[];
  domainBlacklistsResults: BlacklistResult[];
}

export interface BlacklistReport {
  checks: BlacklistCheck[];
}

export interface BlacklistData {
  type: string;
  status: "valid" | "invalid";
  records: BlacklistResult[];
  description: string;
}

export interface BlacklistStructure {
  domain: {
    type: string;
    status: "valid" | "invalid";
    records: BlacklistResult[];
    description: string;
  };
  mx: {
    type: string;
    status: "valid" | "invalid";
    records: BlacklistResult[];
    description: string;
  };
  smtp: {
    type: string;
    status: "valid" | "invalid";
    records: BlacklistResult[];
    description: string;
  };
}

interface HealthCheckResult {
  category: string;
  name: string;
  status: "pass" | "fail" | "warning";
  score: number;
  message?: string;
}

interface HealthCheck {
  score: number;
  totalChecks: number;
  passedChecks: number;
  warnings: number;
  checkResults: HealthCheckResult[];
}

// ------------------------------------

export interface DnsRecordsResponse {
  _id: string;
  companyId: string;
  domain: string;
  records: Record<string, any>[]; // Original records array
  structuredRecords: StructuredDnsRecords; // New structured format
  overallScore: number;
  lastChecked: Date;
  isPublic: boolean;
  publishedAt: string;
  createdAt: Date;
  updatedAt: Date;
  mailboxConnected: boolean;
  blacklist: BlacklistStructure;
  dnsErrors: DnsErrorDisplay[];
  labelIds?: string[];
  outboundPTR: string[];
  emailHealthData: EmailHealthResult;
  healthcheck: HealthCheck; // Add this new property

  mailServerSecurityAssessment?: {
    hasStartTls: boolean;
    hasDane: boolean;
    errors: string[];
    mxServers: Array<{
      server: string;
      starttls: boolean;
      tlsVersions: Array<{
        version: string;
        status: string;
      }>;
      cipherOrder: boolean;
      hashFunction: boolean;
      compression: string;
      secureRenegotiation: boolean;
      clientInitiatedRenegotiation: boolean;
      zeroRtt: boolean;
      affectedCipher: string;
      cipherStatus: string;
      keyExchangeParams: string[];
    }>;
    rpkiDetails: {
      hasValidROA: boolean;
      checkedServer: {
        server: string;
        ipAddresses: string[];
      };
      errors: string[];
      roaExists: boolean;
    };
    certificateDetails: {
      trustChainValid: boolean;
      publicKeyValid: boolean;
      signatureValid: boolean;
      domainMatch: boolean;
    };
  };

  domainReport?: {
    mailServerDnssec: {
      isDnssecSigned: boolean | null;
      isValid: boolean | null;
      domain: string;
      registrar: string;
    };
    redirectResult?: {
      redirect: boolean;
      redirectUrl: string;
      imageUrl: string;
    };
  };

  mailServerReports?: {
    ipv6Ns: {
      hasIPv6Addresses: boolean;
      isIPv6Reachable: boolean;
      nameServers: Array<{
        hostname: string;
        ipv6Address: string;
        ipv4Address: string;
      }>;
      errors: string[];
    };
    ipv4Ns: {
      hasIPv6Addresses: boolean;
      isIPv6Reachable: boolean;
      mailServers: any[];
      errors: string[];
    };
    mailServerDnssec: {
      isDnssecSigned: boolean | null;
      isValid: boolean | null;
      domain: string;
      errors: string[];
      registrar: string;
    };
    blacklistResult: Array<{
      checks: Array<{
        uriChecked: string;
        ipBlacklistsResults: Array<{
          rblName: string;
          listed: boolean;
          response: string;
          aLookuptTimeout: boolean;
        }>;
        domainBlacklistsResults: any[];
      }>;
    }>;
  };

  smtpBlacklist?: Array<{
    server: string;
    blacklists: Array<{
      rblName: string;
      listed: boolean;
      response: string;
      aLookuptTimeout: boolean;
    }>;
  }>;

  domainBlacklist?: Array<{
    server: string;
    blacklists: Array<{
      rblName: string;
      listed: boolean;
      description: string;
      response: string;
      aLookuptTimeout: boolean;
      hostname: string;
    }>;
  }>;
  formattedReceivedChain: Array<{
    index: number;
    delay: string;
    from: string;
    to: string;
    protocol: string;
    timeReceived: string;
  }>;
  relaycheck: {
    openRelay: boolean;
    startTlsSupported: boolean;
    sessionLines: string[];
    errored: boolean;
  };

  mxServerBlacklists?: Array<{
    server: string;
    blacklists: Array<{
      rblName: string;
      listed: boolean;
      response: string;
      aLookuptTimeout: boolean;
    }>;
  }>;
}
