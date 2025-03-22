import {
  DetailedProviderBreakdownResponse,
  EmailDetailResponse,
  FormattedTestResultsResponse,
  PlacementType,
} from "@/types/inbox-placement.types";
import { DnsRecordsResponse } from "@/types/report";
import axios from "axios";

const API_URL = "https://og884csw8ww88c40w0kwk4sw.strideio.com";
// const API_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

// ----------------------- email health report -----------------------

export const getSharedReport = async (
  domain: string,
  companyId: string,
  id: string
) => {
  const response = await axiosInstance.get(
    `/public-result/${domain}/${companyId}/${id}`
  );
  return response.data as unknown as DnsRecordsResponse;
};

// ----------------------- inbox placement report -----------------------

export const getSharedInboxPlacementReport = async (
  companyId: string,
  id: string,
  placementType: PlacementType
) => {
  const response = await axiosInstance.get(
    `/public-result/placement/${companyId}/${id}`,
    {
      params: {
        type: placementType,
      },
    }
  );
  return response.data as unknown as FormattedTestResultsResponse;
};

export const getInboxPlacementProviderBreakdownReport = async (
  companyId: string,
  id: string,
  placementType: PlacementType
) => {
  const response = await axiosInstance.get(
    `/public-result/placement/provider-breakdown/${companyId}/${id}`,
    {
      params: {
        type: placementType,
      },
    }
  );
  return response.data as unknown as DetailedProviderBreakdownResponse;
};

export const getInboxPlacementEmailDetails = async (
  id: string,
  provider: string,
  email: string
) => {
  const response = await axiosInstance.get(
    `/public-result/placement/email-details/${id}/${provider}/${email}`
  );
  return response.data as unknown as {
    success: boolean;
    message?: string;
    emailDetails?: EmailDetailResponse;
  };
};

// ----------------------- placement free report test -----------------------

export const getGetPlacementAccounts = async ({
  type,
}: {
  type: PlacementType.B2B | PlacementType.B2C;
}) => {
  const response = await axiosInstance.get(
    "/public-result/placement-accounts",
    {
      params: {
        type: type?.toLowerCase(),
      },
    }
  );
  return response.data as unknown as Array<{
    email: string;
    provider: string;
  }>;
};

export const getPlacementSubmit = async ({
  senderEmail,
  recipientType,
  testEmails,
}: {
  senderEmail: string;
  recipientType: string;
  testEmails: string[];
}) => {
  const response = await axiosInstance.post("/public-result/test-sender", {
    senderEmail,
    recipientType,
    testEmails,
  });
  return response.data as unknown as {
    success: boolean;
    testId: string;
    message: string;
  };
};

export const getPlacementReportStatus = async ({
  testId,
}: {
  testId: string;
}) => {
  const response = await axiosInstance.get(
    `/public-result/placement/report-status/${testId}`
  );
  return response.data as unknown as {
    status: boolean;
  };
};

// ----------------------- email health report -----------------------

export const getEmailHealthAlias = async (alias: string) => {
  const response = await axiosInstance.post(`/public-result/alias`, {
    alias,
  });
  return response.data as unknown as {
    alias: string;
  };
};

export const getFreeEmailHealthResults = async (alias: string) => {
  const response = await axiosInstance.get(`/public-result/results/${alias}`);
  return response.data as unknown as DnsRecordsResponse;
};

export const getFreeEmailHealthStatus = async (alias: string) => {
  const response = await axiosInstance.get(
    `/public-result/email-health/report-status/${alias}`
  );
  return response.data as unknown as {
    status: boolean;
  };
};
