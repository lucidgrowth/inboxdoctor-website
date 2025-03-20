import {
  DetailedProviderBreakdownResponse,
  EmailDetailResponse,
  FormattedTestResultsResponse,
} from "@/types/inbox-placement.types";
import { DnsRecordsResponse } from "@/types/report";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://og884csw8ww88c40w0kwk4sw.strideio.com";

// ----------------------- email health report -----------------------

const getSharedReport = async (
  domain: string,
  companyId: string,
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/public-result/${domain}/${companyId}/${id}`
  );
  return response.data as unknown as DnsRecordsResponse;
};

// ----------------------- inbox placement report -----------------------

const getSharedInboxPlacementReport = async (companyId: string, id: string) => {
  const response = await axios.get(
    `${API_URL}/public-result/placement/${companyId}/${id}`
  );
  return response.data as unknown as FormattedTestResultsResponse;
};

const getInboxPlacementProviderBreakdownReport = async (
  companyId: string,
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/public-result/placement/provider-breakdown/${companyId}/${id}`
  );
  return response.data as unknown as DetailedProviderBreakdownResponse;
};

const getInboxPlacementEmailDetails = async (
  id: string,
  provider: string,
  email: string
) => {
  const response = await axios.get(
    `${API_URL}/public-result/placement/email-details/${id}/${provider}/${email}`
  );
  return response.data as unknown as {
    success: boolean;
    message?: string;
    emailDetails?: EmailDetailResponse ;
  };
};

// ----------------------- hooks -----------------------

export const useGetSharedReport = (
  domain: string,
  companyId: string,
  id: string
) => {
  return useQuery({
    queryKey: ["shared-report", { domain, companyId, id }],
    queryFn: () => getSharedReport(domain, companyId, id),
    refetchOnWindowFocus: false,
  });
};

// ----------------------- inbox placement report -----------------------

export const useGetSharedInboxPlacementReport = (
  companyId: string,
  id: string
) => {
  return useQuery({
    queryKey: ["shared-inbox-placement-report", { companyId, id }],
    queryFn: () => getSharedInboxPlacementReport(companyId, id),
    refetchOnWindowFocus: false,
  });
};

export const useGetInboxPlacementProviderBreakdownReport = (
  companyId: string,
  id: string
) => {
  return useQuery({
    queryKey: [
      "shared-inbox-placement-provider-breakdown-report",
      { companyId, id },
    ],
    queryFn: () => getInboxPlacementProviderBreakdownReport(companyId, id),
    enabled: !!companyId && !!id,
    refetchOnWindowFocus: false,
  });
};

export const useGetEmailDetailedReport = (
  id: string,
  provider: string,
  email: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["shared-email-detailed-report", { id, provider, email }],
    queryFn: () => getInboxPlacementEmailDetails(id, provider, email),
    enabled: !!id && !!provider && !!email && enabled,
    refetchOnWindowFocus: false,
  });
};
