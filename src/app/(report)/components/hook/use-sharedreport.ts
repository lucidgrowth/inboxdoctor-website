import { DnsRecordsResponse } from "@/types/report";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QUERY_KEY = "shared-report";
const API_URL = "https://og884csw8ww88c40w0kwk4sw.strideio.com";

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

export const useGetSharedReport = (
  domain: string,
  companyId: string,
  id: string
) => {
  return useQuery({
    queryKey: [QUERY_KEY, { domain, companyId, id }],
    queryFn: () => getSharedReport(domain, companyId, id),
    refetchOnWindowFocus: false,
  });
};
