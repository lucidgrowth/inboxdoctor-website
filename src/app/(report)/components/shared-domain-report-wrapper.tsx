"use client";

import React from "react";
import DomainReport from "./domain-report";
import { useGetSharedReport } from "./hook/use-sharedreport";

const SharedDomainReportWrapper = ({
  domain,
  companyId,
  reportId,
}: {
  domain: string;
  companyId: string;
  reportId: string;
}) => {
  const { data: recordsData, isLoading: isDnsCheckLoading } =
    useGetSharedReport(domain, companyId, reportId);

  return (
    <DomainReport
      recordsData={recordsData}
      isReportLoading={isDnsCheckLoading}
    />
  );
};

export default SharedDomainReportWrapper;
