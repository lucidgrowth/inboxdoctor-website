import {
  getInboxPlacementEmailDetails,
  getInboxPlacementProviderBreakdownReport,
  getSharedInboxPlacementReport,
  getSharedReport,
} from "@/services";
import { PlacementType } from "@/types/inbox-placement.types";
import { useQuery } from "@tanstack/react-query";

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
  id: string,
  placementType: PlacementType
) => {
  return useQuery({
    queryKey: [
      "shared-inbox-placement-report",
      { companyId, id, placementType },
    ],
    queryFn: () => getSharedInboxPlacementReport(companyId, id, placementType),
    refetchOnWindowFocus: false,
  });
};

export const useGetInboxPlacementProviderBreakdownReport = (
  companyId: string,
  id: string,
  placementType: PlacementType
) => {
  return useQuery({
    queryKey: [
      "shared-inbox-placement-provider-breakdown-report",
      { companyId, id },
    ],
    queryFn: () =>
      getInboxPlacementProviderBreakdownReport(companyId, id, placementType),
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
