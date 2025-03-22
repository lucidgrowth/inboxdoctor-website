"use client";

import DomainReport from "./domain-report";
import { useGetFreeReport } from "./hook/use-sharedreport";

const FreeDomainReportWrapper = ({ alias }: { alias: string }) => {
  const { data: recordsData, isLoading: isReportLoading } =
    useGetFreeReport(alias);

  return (
    <DomainReport recordsData={recordsData} isReportLoading={isReportLoading} />
  );
};

export default FreeDomainReportWrapper;
