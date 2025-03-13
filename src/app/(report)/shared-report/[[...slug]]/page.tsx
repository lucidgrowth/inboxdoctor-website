import React from "react";
import DomainReport from "../../components/domain-report";
import Container from "@/components/container";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const ReportPage = async (props: Props) => {
  const params = await props.params;

  const [domain, companyId, reportId] = params.slug;

  console.log({ domain, companyId, reportId });
  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <DomainReport domain={domain} companyId={companyId} reportId={reportId} />
    </Container>
  );
};

export default ReportPage;
