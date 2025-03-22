import Container from "@/components/container";
import SharedDomainReportWrapper from "../../components/shared-domain-report-wrapper";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

const ReportPage = async (props: Props) => {
  const params = await props.params;

  const [domain, companyId, reportId] = params.slug;

  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <SharedDomainReportWrapper
        domain={domain}
        companyId={companyId}
        reportId={reportId}
      />
    </Container>
  );
};

export default ReportPage;
