"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";

import { MultiStepLoader } from "@/components/multi-step-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/providers/theme-provider";
import { z } from "zod";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const TEST_EMAILS = [
  "test-inbox1@company-m365.com",
  "test-inbox2@company-workspace.com",
  "test-inbox3@company-zoho.com",
  "test-inbox4@company-exchange.com",
  "test-inbox5@company-proton.com",
];

export default function EmailWizard() {
  const [emailFrom, setEmailFrom] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [emailsSent, setEmailsSent] = useState(false);
  const [selectedType, setSelectedType] = useState<"b2b" | "b2c" | null>(null);

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next" && currentStep < 3) {
      if (currentStep === 3) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else if (direction === "prev" && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    try {
      // validations
      const validatedFields = formSchema.safeParse({
        emailFrom,
        selectedType,
        emailsSent,
      });

      if (!validatedFields.success) {
        console.log(validatedFields.error);
        toast.error("Please check your inputs");
        return;
      }

      // api call
    } catch (error) {
      console.log(error);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !selectedType || !emailFrom;
    if (currentStep === 2) return !emailsSent;
    return true;
  };

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
              />
            )}

            {/* Step 3: Loader */}
            {currentStep === 3 && (
              <LoaderTabContent
                selectedType={selectedType}
                setCurrentStep={setCurrentStep}
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
              Next
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
}: {
  selectedType: "b2c" | "b2b" | null;
  emailsSent: boolean;
  setEmailsSent: (emailsSent: boolean) => void;
}) => {
  const [emailSeparator, setEmailSeparator] = useState("comma");
  const { theme } = useTheme();

  const formattedEmails = getFormattedEmails(TEST_EMAILS, emailSeparator);
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
    </div>
  );
};

const LoaderTabContent = ({
  selectedType,
  setCurrentStep,
}: {
  selectedType: "b2c" | "b2b" | null;
  setCurrentStep: (step: number) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Please wait while we check your email
        <span className="ml-2 text-sm font-normal text-blue-400 block pt-2">
          ({selectedType?.toUpperCase()} Test)
        </span>
      </h3>
      <div className="space-y-4 text-center">
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
            className="w-fit bg-primary/10 border-none text-primary"
            onClick={() => setCurrentStep(1)}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
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
  selectedType: "b2c" | "b2b" | null;
  setSelectedType: (selectedType: "b2c" | "b2b" | null) => void;
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
            type: "b2c",
            description: "Business to Consumer",
          },
          {
            type: "b2b",
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
            onClick={() => setSelectedType(item.type as "b2c" | "b2b")}
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
