import Container from "@/components/container";
import React from "react";
import InboxPlacementReport from "../../components/inbox-placement-report";

const InboxPlacementReportPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type: string | undefined }>;
}) => {
  const { slug } = await params;
  const { type } = await searchParams;

  const [companyId, testId] = slug;
  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <InboxPlacementReport
        companyId={companyId}
        testId={testId}
        placementType={type}
      />
    </Container>
  );
};

export default InboxPlacementReportPage;
