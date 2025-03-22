import { MultiStepLoader } from "@/components/multi-step-loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { generateRandomAlias } from "@/lib/utils";
import { getEmailHealthAlias, getFreeEmailHealthStatus } from "@/services";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const loadingStates = [
  { text: "Receiving Your Test Email" },
  { text: "Verifying Email Authentication" },
  { text: "Analyzing Delivery Chain" },
  { text: "Scanning Security Settings" },
  { text: "Checking Blacklist Status" },
  { text: "Generating Your Health Report" },
];

const points = [
  "Comprehensive SPF, DKIM & DMARC analysis",
  "Security vulnerabilities assessment",
  "Actionable recommendations to fix issues",
];

// const mockeReportStatusCheck = (): Promise<{
//   status: boolean;
//   message: string;
// }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ status: true, message: "Email health report generated" });
//     }, 3000);
//   });
// };

// const mockeAliasCheck = (
//   alias: string
// ): Promise<{
//   alias: string;
// }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ alias: `${alias}@test.com` });
//     }, 3000);
//   });
// };

const EmailHealthForm = () => {
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const [showLoader, setShowLoader] = useState(false);
  const [alias, setAlias] = useState<string | null>(null);
  const [isReportReady, setIsReportReady] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const aliasFromUrl = searchParams.get("alias");

  const generatedAlias = useMemo(() => generateRandomAlias(), []);

  const { mutateAsync: getAlias, isPending: isAliasLoading } = useMutation({
    mutationFn: () => getEmailHealthAlias(generatedAlias),
  });

  const { data: reportStatus, isLoading: isReportStatusLoading } = useQuery({
    queryKey: ["report-status", alias],
    queryFn: () => getFreeEmailHealthStatus(alias ?? ""),
    enabled: showLoader && !!alias,
    refetchInterval: 30000, // 30 seconds
  });

  const handleSubmit = () => {
    if (!alias) {
      toast.error("No alias found.");
      return;
    }
    router.replace(`/email-health?alias=${encodeURIComponent(alias)}`, {
      scroll: false,
    });
    setShowLoader(true);
  };

  useEffect(() => {
    const fetchAlias = async () => {
      try {
        const response = await getAlias();
        setAlias(response.alias);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlias();
  }, [generatedAlias]);

  useEffect(() => {
    if (reportStatus?.status) {
      setIsReportReady(true);
    }
    if (aliasFromUrl) {
      setShowLoader(true);
    }
  }, [reportStatus, aliasFromUrl]);

  if (isReportReady) {
    return (
      <RenderReportReady
        handleViewReport={() => {
          setIsReportReady(false);
          setIsChecked(false);
          setAlias(null);
          setShowLoader(false);
          router.replace(`/email-health-report/${alias}`, { scroll: false });
        }}
        handleTryAnotherTest={() => {
          setIsReportReady(false);
          setIsChecked(false);
          setAlias(null);
          setShowLoader(false);
          router.replace("/email-health", { scroll: false });
        }}
      />
    );
  }

  if (showLoader) {
    return <EmailHealthLoader setShowLoader={setShowLoader} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10 w-full">
      {/* <div className="absolute inset-0 pointer-events-none top-[20%]">
<div className="relative rounded-[50%] blur-[150px] bg-primary aspect-square lg:aspect-[1194/378] z-0"></div>
</div> */}

      <div className="hiw-card relative z-10">
        <h3 className="text-xl font-semibold text-white mb-6">
          Enter your domain to check
        </h3>

        {isAliasLoading ? (
          <div className="flex items-center justify-center h-full border border-white/20 rounded-md px-4 py-2 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span className="text-sm text-white">Generating alias...</span>
          </div>
        ) : (
          <div className="flex items-center mb-6 relative">
            <Input
              placeholder="Generated alias"
              value={alias ?? ""}
              readOnly
              className="flex-1 bg-secondary border-primary text-white pr-10"
            />

            <Button
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground"
            >
              <Copy />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            className="rounded-[4px] border-white/40"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked)}
          />
          <span className="text-sm text-[#C0C6D0]">
            I have sent the email to the email address.
          </span>
        </div>

        <p className="text-sm text-[#C0C6D0] text-left">
          We&apos;ll scan your domain&apos;s DNS records to verify proper email
          authentication setup. No emails will be sent or received during this
          process.
        </p>
      </div>

      <div className="hiw-card relative z-10">
        <PointList />
        <Button
          className="w-full bg-primary hover:bg-primary/80 text-white py-4 h-auto text-lg shadow-lg hover:shadow-xl mt-4"
          disabled={!isChecked || !alias}
          onClick={handleSubmit}
        >
          <span>Check Result</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

const RenderReportReady = ({
  handleViewReport,
  handleTryAnotherTest,
}: {
  handleViewReport: () => void;
  handleTryAnotherTest: () => void;
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">
        Your report is ready! 🚀
      </h3>

      <div className="flex flex-col justify-center items-center gap-5">
        <p className="text-sm text-[#C0C6D0] text-center">
          Your latest report has been generated. Click below to review the
          insights and take action!
        </p>

        <Button
          className="flex items-center gap-2 w-fit h-auto py-4 px-6 text-base"
          onClick={handleViewReport}
        >
          <span>View Report</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button
          variant={"outline"}
          className="w-fit h-auto py-4 px-6 text-base bg-primary/10 border-none text-primary"
          onClick={handleTryAnotherTest}
        >
          <span>Try another test</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

const EmailHealthLoader = ({
  setShowLoader,
}: {
  setShowLoader: (show: boolean) => void;
}) => {
  return (
    <div className="hiw-card relative flex flex-col gap-4 justify-center items-center z-10 w-full">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Please wait while we check your email domain
      </h3>

      {/* animation */}
      <div className="relative">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={true}
          duration={4000}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-sm text-[#C0C6D0] text-left">
          Make sure you sent the email to the given address!
        </p>

        <Button
          variant={"outline"}
          className="w-fit bg-primary/10 border-none text-primary"
          onClick={() => setShowLoader(false)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>No results?</span>
        </Button>
      </div>
    </div>
  );
};

const PointList = () => {
  return (
    <div className="space-y-4 mb-8">
      {points.map((point, index) => (
        <div key={`point-${index}`} className="flex items-start text-left">
          <div className="mr-3 mt-1 bg-primary/20 p-1 rounded-full">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <span className="text-white">{point}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailHealthForm;
