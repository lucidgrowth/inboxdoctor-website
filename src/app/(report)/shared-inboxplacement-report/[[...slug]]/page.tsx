import Container from "@/components/container";
import React from "react";
import InboxPlacementReport from "../../components/inbox-placement-report";

type Props = {};

const InboxPlacementReportPage = (props: Props) => {
  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <InboxPlacementReport
        companyId="1234"
        domain="example.com"
        reportId="1234"
      />
    </Container>
  );
};

export default InboxPlacementReportPage;
