import { BlacklistCheck } from "./report";

export interface EmailDetailResponse {
  // Basic email information
  to: string;
  from: {
    value: {
      address: string;
      name: string;
    }[];
    html: string;
    text: string;
  };
  senderIP: string;
  subject: string;
  date: Date;
  messageId: string;
  formattedDeliveryChain: {
    index: number;
    delay: string;
    from: string;
    to: string;
    protocol: string;
  }[];
  relaycheck: {
    openRelay: boolean;
    startTlsSupported: boolean;
    sessionLines: string[];
    errored: boolean;
  };
  // Delivery information
  deliveryStatus: string; // INBOX, SPAM, UNRECEIVED
  category?: string; // PRIMARY, PROMOTION, etc.
  deliveryChain: string[];
  rawContent: string;
  // Authentication results
  authResults: {
    spf: string;
    dkim: string;
    dmarc: string;
  };

  // Content
  plainText?: string;
  htmlContent?: string;

  // Headers and technical details
  headers: Record<string, string | string[]>;

  // Blacklist information
  blacklistReport?: {
    senderIP?: {
      checks: BlacklistCheck[];
    };
    messageIP?: {
      checks: BlacklistCheck[];
    };
    domain?: {
      checks: BlacklistCheck[];
    };
    mxServer?: {
      checks: BlacklistCheck[];
    };
  };

  domainBlacklist?: {
    server: string;
    blacklists: {
      rblName: string;
      listed: boolean;
      description: string;
      response: string;
      aLookuptTimeout: boolean;
    }[];
  }[];

  mxServerBlacklists: {
    server: string;
    blacklists: {
      rblName: string;
      listed: boolean;
      description: string;
      response: string;
      aLookuptTimeout: boolean;
    }[];
  }[];
  smtpBlacklist: {
    server: string;
    blacklists: {
      rblName: string;
      listed: boolean;
      response: string;
      aLookuptTimeout: boolean;
    }[];
  }[];
  // Problems detected
  problems: Array<{
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
  }>;
}

export interface DetailedProviderBreakdownResponse {
  success: boolean;
  message?: string;
  test?: {
    id: string;
    senderEmail: string;
    subject: string;
    sentAt: Date;
    completedAt?: Date;
    isCompleted: boolean;
    testType: string;
  };
  providers: ProviderDetailedResult[];
}

export interface ProviderDetailedResult {
  provider: string;
  displayName: string;
  emailCount: number;
  inboxPercentage: number;
  spamPercentage: number;
  unreceivedPercentage: number;
  authStatus: {
    dkim: boolean;
    spf: boolean;
    dmarc: boolean;
  };
  categoryBreakdown?: {
    primary?: {
      count: number;
      percentage: number;
    };
    promotion?: {
      count: number;
      percentage: number;
    };
    updates?: {
      count: number;
      percentage: number;
    };
    other?: {
      count: number;
      percentage: number;
    };
  };
  emails: EmailDeliveryStatus[];
}

export interface EmailAuthStatus {
  dkim: boolean;
  spf: boolean;
  dmarc: boolean;
}

export interface EmailDeliveryStatus {
  email: string;
  deliveredTo: string; // INBOX, SPAM, UNRECEIVED
  category?: string; // PRIMARY, PROMOTION, etc.
  senderIP: string;
  authStatus: EmailAuthStatus;
}

export interface FormattedTestResultsResponse {
  success: boolean;
  message?: string;
  test?: TestInfo;
  summary?: TestResultSummary;
  providerResults?: ProviderResult[];
}

export interface TestInfo {
  id: string;
  senderEmail: string;
  subject: string;
  sentAt: Date;
  completedAt?: Date;
  isCompleted: boolean;
  testType: string;
  htmlBody: string;
  textBody: string;
  isPublic: boolean;
  publishedAt?: string;
  companyId: string;
}

export interface TestResultSummary {
  inbox: {
    count: number;
    percentage: number;
  };
  spam: {
    count: number;
    percentage: number;
  };
  unreceived: {
    count: number;
    percentage: number;
  };
  total: number;
}

export interface ProviderResult {
  provider: string;
  displayName: string;
  inbox: number;
  spam: number;
  unreceived: number;
  testType: PlacementType;
}

export enum PlacementType {
  B2B = "B2B",
  B2C = "B2C",
}
