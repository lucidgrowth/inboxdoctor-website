import Container from "@/components/container";
import FreeDomainReportWrapper from "../../components/free-domain-report-wrapper";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const EmailHealthReportPage = async (props: Props) => {
  const params = await props.params;
  const alias = params.slug;

  return (
    <Container className="py-10 md:px-6 lg:px-6">
      <FreeDomainReportWrapper alias={alias} />
    </Container>
  );
};

export default EmailHealthReportPage;
