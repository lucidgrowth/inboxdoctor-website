"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { MultiStepLoader } from "@/components/multi-step-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { freeCompanyId } from "@/lib/constants";
import { useTheme } from "@/providers/theme-provider";
import { PlacementType } from "@/types/inbox-placement.types";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import {
  useGetPlacementAccounts,
  usePlacementReportStatus,
  usePlacementSubmit,
} from "../use-inboxplacement";

const formSchema = z.object({
  emailFrom: z.string().email(),
  selectedType: z.enum(["b2c", "b2b"]),
  emailsSent: z.boolean(),
});

const LOADING_STATES = [
  { text: "Receiving Your Test Email" },
  { text: "Verifying Email Authentication" },
  { text: "Analyzing Delivery Chain" },
  { text: "Scanning Security Settings" },
  { text: "Checking Blacklist Status" },
  { text: "Generating Your Health Report" },
];

const getFormattedEmails = (emails: string[], emailSeparator: string) => {
  if (emailSeparator === "comma") {
    return emails.join(", ");
  } else if (emailSeparator === "semicolon") {
    return emails.join("; ");
  } else if (emailSeparator === "newline") {
    return emails.join("\n");
  } else if (emailSeparator === "comma-newline") {
    return emails.join(", \n");
  } else if (emailSeparator === "semicolon-newline") {
    return emails.join("; \n");
  }
  return emails.join(", ");
};

export default function EmailWizard() {
  const [emailFrom, setEmailFrom] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailsSent, setEmailsSent] = useState(false);
  const [selectedType, setSelectedType] = useState<PlacementType | null>(null);

  const [isReportReady, setIsReportReady] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const currentReportTestId = searchParams.get("testId");

  const { mutateAsync: placementSubmit } = usePlacementSubmit();

  const { data: placementReportStatus } = usePlacementReportStatus({
    testId: currentReportTestId as string,
    enabled: currentStep === 3 && !!currentReportTestId && !isReportReady,
  });

  const { data: placementAccounts, isLoading: isPlacementAccountsLoading } =
    useGetPlacementAccounts({
      type: selectedType as PlacementType,
      enabled: currentStep === 2,
    });

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next" && currentStep < 3) {
      const attempts = localStorage.getItem("attempts");
      if (Number(attempts) >= 10) {
        toast.error("You have reached the maximum number of free tests");
        return;
      }

      setCurrentStep(currentStep + 1);

      if (currentStep === 2) {
        handleSubmit();
      }
    } else if (direction === "prev" && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const reportType = selectedType?.toLowerCase();
      const validatedFields = formSchema.safeParse({
        emailFrom,
        selectedType: reportType,
        emailsSent,
      });

      if (!validatedFields.success) {
        console.log(validatedFields.error);
        toast.error("Please check your inputs");
        return;
      }

      if (!placementAccounts) {
        toast.error("No placement accounts found");
        return;
      }

      const response = await placementSubmit({
        senderEmail: emailFrom,
        recipientType: reportType as string,
        testEmails: placementAccounts?.map((account) => account.email) || [],
      }); // api call

      if (response.success) {
        const url = new URL(window.location.href);
        url.searchParams.set("testId", response.testId);

        router.replace(url.toString(), { scroll: false });

        const attempts = localStorage.getItem("attempts");
        localStorage.setItem("attempts", (Number(attempts) + 1).toString());
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !selectedType || !emailFrom;
    if (currentStep === 2) return !emailsSent;
    return true;
  };

  useEffect(() => {
    if (placementReportStatus?.status) {
      setIsReportReady(true);
      // router.replace("/inbox-placement", { scroll: false });
    }
  }, [placementReportStatus?.status]);

  useEffect(() => {
    if (currentReportTestId) {
      setCurrentStep(3);
    }
  }, [currentReportTestId]);

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <Card className="w-full hiw-card !p-0 text-white">
        <CardContent className="pt-8 md:pt-10 md:px-14">
          <div className="space-y-6">
            {/* Step 1: Select Test Type */}
            {currentStep === 1 && (
              <SelectionTabContent
                emailFrom={emailFrom}
                setEmailFrom={setEmailFrom}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            )}

            {/* Step 2: Send Email (with code for B2B) */}
            {currentStep === 2 && (
              <EmailsListContent
                selectedType={selectedType}
                emailsSent={emailsSent}
                setEmailsSent={setEmailsSent}
                isLoading={isPlacementAccountsLoading}
                placementAccounts={placementAccounts}
              />
            )}

            {/* Step 3: Loader */}
            {currentStep === 3 && (
              <LoaderTabContent
                selectedType={selectedType}
                setCurrentStep={setCurrentStep}
                isReportReady={isReportReady}
                currentReportTestId={currentReportTestId}
                handleTryAnotherTest={() => {
                  router.replace("/inbox-placement", { scroll: false });
                  setCurrentStep(1);
                  setSelectedType(null);
                  setEmailFrom("");
                  setEmailsSent(false);
                  setIsReportReady(false);
                }}
                handleViewReport={() => {
                  router.replace(
                    `/shared-inboxplacement-report/${freeCompanyId}/${currentReportTestId}?type=${selectedType}`
                  );
                  setCurrentStep(1);
                  setCurrentStep(1);
                  setSelectedType(null);
                  setEmailFrom("");
                  setEmailsSent(false);
                  setIsReportReady(false);
                }}
              />
            )}
          </div>
        </CardContent>

        {/* footer */}
        {currentStep !== 3 && (
          <CardFooter className="flex justify-between border-t border-white/10 pt-6 md:px-14">
            <Button
              variant="outline"
              onClick={() => handleNavigation("prev")}
              disabled={currentStep === 1}
              className="bg-transparent border-gray-700 hover:bg-gray-800 disabled:opacity-50"
            >
              Back
            </Button>
            <Button
              onClick={() => handleNavigation("next")}
              disabled={isNextDisabled()}
            >
              {currentStep === 2 ? "Submit" : "Next"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

const EmailsListContent = ({
  selectedType,
  emailsSent,
  setEmailsSent,
  isLoading,
  placementAccounts,
}: {
  selectedType: PlacementType | null;
  emailsSent: boolean;
  setEmailsSent: (emailsSent: boolean) => void;
  isLoading: boolean;
  placementAccounts: { email: string; provider: string }[] | undefined;
}) => {
  const [emailSeparator, setEmailSeparator] = useState("comma");
  const { theme } = useTheme();

  const formattedEmails = useMemo(() => {
    if (!placementAccounts) return "";

    return getFormattedEmails(
      placementAccounts?.map((account) => account.email) || [],
      emailSeparator
    );
  }, [placementAccounts, emailSeparator]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium text-center">
          Step 2: Send an email to these addresses:
        </h3>
        <span className="ml-2 text-sm font-normal text-blue-400">
          ({selectedType?.toUpperCase()} Test)
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
          <span className="text-sm text-gray-400">
            Fetching email accounts...
          </span>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            className="bg-background/20 text-foreground/80 md:text-base max-h-[150px] w-full"
            value={formattedEmails}
            rows={6}
            readOnly
          />

          <div className="pt-2 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <div className="flex md:items-center space-x-2 w-full">
              <Checkbox
                id="emailSent"
                className="rounded-[4px] border-white/40 mt-1 md:mt-0"
                checked={emailsSent}
                onCheckedChange={(checked) => setEmailsSent(checked as boolean)}
              />
              <Label htmlFor="emailSent" className="text-sm text-left">
                I have sent an email to the above addresses
              </Label>
            </div>
            <div className="flex gap-2 items-center md:w-fit w-full">
              <Select defaultValue={"comma"} onValueChange={setEmailSeparator}>
                <SelectTrigger className="w-[180px] text-foreground">
                  <SelectValue placeholder="Select separator" />
                </SelectTrigger>
                <SelectContent className={theme === "dark" ? "dark" : ""}>
                  <SelectItem value="comma">Comma</SelectItem>
                  <SelectItem value="semicolon">Semicolon</SelectItem>
                  <SelectItem value="newline">Newline</SelectItem>
                  <SelectItem value="comma-newline">Comma + Newline</SelectItem>
                  <SelectItem value="semicolon-newline">
                    Semicolon + Newline
                  </SelectItem>
                </SelectContent>
              </Select>
              <CopyButton text={formattedEmails} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoaderTabContent = ({
  selectedType,
  setCurrentStep,
  currentReportTestId,
  isReportReady,
  handleTryAnotherTest,
  handleViewReport,
}: {
  selectedType: PlacementType | null;
  setCurrentStep: (step: number) => void;
  currentReportTestId: string | null;
  isReportReady: boolean;
  handleTryAnotherTest: () => void;
  handleViewReport: () => void;
}) => {
  if (isReportReady) {
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
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Please wait while we check your email
        <span className="ml-2 text-sm font-normal text-blue-400 block pt-2">
          ({selectedType?.toUpperCase()} Test)
        </span>
      </h3>
      <div className="space-y-4 md:space-y-6 text-center">
        {/* animation */}
        <div className="relative">
          <MultiStepLoader
            loadingStates={LOADING_STATES}
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
            size={"lg"}
            className="w-fit bg-primary/10 border-none text-primary"
            onClick={() => setCurrentStep(1)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>No results?</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const SelectionTabContent = ({
  emailFrom,
  setEmailFrom,
  selectedType,
  setSelectedType,
}: {
  emailFrom: string;
  setEmailFrom: (emailFrom: string) => void;
  selectedType: PlacementType | null;
  setSelectedType: (selectedType: PlacementType | null) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">
        Step 1: Select Test Type
      </h3>

      <div className="space-y-4 pb-4">
        <Label className="text-base text-center text-gray-400">
          Provide the email from which you want to send the test email:
        </Label>
        <Input
          className="bg-background/20 border-primary text-foreground/80 md:text-base h-auto py-2"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          placeholder="Enter your email..."
        />
      </div>

      <p className="text-center text-gray-400">
        Choose which type of verification test you want to run:
      </p>

      <div className="grid grid-cols-2 gap-4 pt-4">
        {[
          {
            type: PlacementType.B2C,
            description: "Business to Consumer",
          },
          {
            type: PlacementType.B2B,
            description: "Business to Business",
          },
        ].map((item) => (
          <Button
            key={item.type}
            variant="outline"
            className={`h-24 ${
              selectedType === item.type
                ? "bg-blue-950 border-primary hover:bg-blue-900"
                : "bg-transparent border hover:bg-gray-800"
            }`}
            onClick={() => setSelectedType(item.type as PlacementType)}
          >
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">
                {item.type.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400 mt-2">
                {item.description}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [emailsCopied, setEmailsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    setEmailsCopied(true);
    setTimeout(() => setEmailsCopied(false), 2000);
  };

  return (
    <Button
      variant={"outline"}
      onClick={() => copyToClipboard(text)}
      disabled={emailsCopied}
    >
      {emailsCopied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {emailsCopied ? "Copied" : "Copy Emails"}
    </Button>
  );
};
