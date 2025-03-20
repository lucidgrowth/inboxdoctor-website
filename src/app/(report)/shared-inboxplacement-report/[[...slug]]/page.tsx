import Container from "@/components/container";
import React from "react";
import InboxPlacementReport from "../../components/inbox-placement-report";

const InboxPlacementReportPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [companyId, testId] = slug;
  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <InboxPlacementReport companyId={companyId} testId={testId} />
    </Container>
  );
};

export default InboxPlacementReportPage;
