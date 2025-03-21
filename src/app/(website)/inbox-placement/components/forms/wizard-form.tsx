"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ClipboardCopy,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/providers/theme-provider";
import { MultiStepLoader } from "@/components/multi-step-loader";

export default function EmailWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<"b2b" | "b2c" | null>(null);
  const [verificationCode, setVerificationCode] = useState("kjghdfkajsgdaiwe");
  const [emailsSent, setEmailsSent] = useState(false);
  const [emailSeparator, setEmailSeparator] = useState("comma");
  const [codeCopied, setCodeCopied] = useState(false);
  const [emailsCopied, setEmailsCopied] = useState(false);
  const [emailFrom, setEmailFrom] = useState("");
  const { theme } = useTheme();

  const emails = [
    "test-inbox1@company-m365.com",
    "test-inbox2@company-workspace.com",
    "test-inbox3@company-zoho.com",
    "test-inbox4@company-exchange.com",
    "test-inbox5@company-proton.com",
  ];

  const loadingStates = [
    { text: "Receiving Your Test Email" },
    { text: "Verifying Email Authentication" },
    { text: "Analyzing Delivery Chain" },
    { text: "Scanning Security Settings" },
    { text: "Checking Blacklist Status" },
    { text: "Generating Your Health Report" },
  ];

  const getFormattedEmails = () => {
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

  const copyToClipboard = (text: string, type: "code" | "emails") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } else {
      setEmailsCopied(true);
      setTimeout(() => setEmailsCopied(false), 2000);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <Card className="w-full border-2 border-white/20 rounded-xl bg-background text-white">
        <CardContent className="pt-8">
          <div className="space-y-6">
            {/* Step indicator */}
            {/* <div className="flex justify-between mb-6">
              <div
                className={`flex flex-col items-center w-[90px] ${
                  currentStep >= 1 ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-800"
                  }`}
                >
                  {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs mt-1">Select Type</span>
              </div>
              <div
                className={`flex-1 border-t-2 mt-4 ${
                  currentStep >= 2 ? "border-primary" : "border-gray-700"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center w-[90px]  ${
                  currentStep >= 2 ? "text-primary" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-primary text-white" : "bg-gray-800"
                  }`}
                >
                  {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <span className="text-xs mt-1">Send Email</span>
              </div>
              <div
                className={`flex-1 border-t-2 mt-4 ${
                  currentStep >= 3 ? "border-primary" : "border-gray-700"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center w-[90px] ${
                  currentStep >= 3 ? "text-primary" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? "bg-primary text-white" : "bg-gray-800"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Verify</span>
              </div>
            </div> */}

            {/* Step 1: Select Test Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center">
                  Step 1: Select Test Type
                </h3>

                <div className="space-y-4 pb-4">
                  <Label className="text-base text-center text-gray-400">
                    Provide the email from which you want to send the test
                    email:
                  </Label>
                  <Input
                    className="bg-background/20 text-foreground/80 md:text-base h-auto py-2"
                    value={emailFrom}
                    onChange={(e) => setEmailFrom(e.target.value)}
                    // readOnly
                  />
                </div>

                <p className="text-center text-gray-400">
                  Choose which type of verification test you want to run:
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    variant="outline"
                    className={`h-24 ${
                      selectedType === "b2c"
                        ? "bg-blue-950 border-primary hover:bg-blue-900"
                        : "bg-transparent border hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedType("b2c")}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold">B2C</span>
                      <span className="text-xs text-gray-400 mt-2">
                        Business to Consumer
                      </span>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className={`h-24 ${
                      selectedType === "b2b"
                        ? "bg-blue-950 border-primary hover:bg-blue-900"
                        : "bg-transparent border hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedType("b2b")}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold">B2B</span>
                      <span className="text-xs text-gray-400 mt-2">
                        Business to Business
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Send Email (with code for B2B) */}
            {currentStep === 2 && (
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
                  <div className="relative">
                    <Textarea
                      className="bg-background/20 text-foreground/80 md:text-base max-h-[100px] w-full"
                      value={getFormattedEmails()}
                      rows={6}
                      readOnly
                    />
                    {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(getFormattedEmails(), "emails")
                        }
                        className="absolute top-2 right-2 bg-transparent border-gray-700 hover:bg-gray-800"
                      >
                        {emailsCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <ClipboardCopy className="h-4 w-4" />
                        )}
                      </Button> */}
                  </div>

                  <div className="pt-2 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                    <div className="flex md:items-center space-x-2 w-full">
                      <Checkbox
                        id="emailSent"
                        className="rounded-[4px] border-white/40 mt-1 md:mt-0"
                        checked={emailsSent}
                        onCheckedChange={(checked) =>
                          setEmailsSent(checked as boolean)
                        }
                      />
                      <Label htmlFor="emailSent" className="text-sm text-left">
                        I have sent an email to the above addresses
                      </Label>
                    </div>
                    <div className="flex gap-2 items-center w-full">
                      <Select
                        defaultValue={"comma"}
                        onValueChange={setEmailSeparator}
                      >
                        <SelectTrigger className="w-[180px] text-foreground">
                          <SelectValue placeholder="Select separator" />
                        </SelectTrigger>
                        <SelectContent
                          className={theme === "dark" ? "dark" : ""}
                        >
                          <SelectItem value="comma">Comma</SelectItem>
                          <SelectItem value="semicolon">Semicolon</SelectItem>
                          <SelectItem value="newline">Newline</SelectItem>
                          <SelectItem value="comma-newline">
                            Comma + Newline
                          </SelectItem>
                          <SelectItem value="semicolon-newline">
                            Semicolon + Newline
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant={"outline"}
                        onClick={() =>
                          copyToClipboard(getFormattedEmails(), "emails")
                        }
                        disabled={emailsCopied}
                      >
                        {emailsCopied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {emailsCopied ? "Copied" : "Copy Emails"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verify */}
            {currentStep === 3 && (
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
                      onClick={() => setCurrentStep(1)}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      <span>No results?</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {currentStep !== 3 && (
          <CardFooter className="flex justify-between border-t border-white/20  pt-4">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              className="bg-transparent border-gray-700 hover:bg-gray-800 disabled:opacity-50"
            >
              Back
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={
                (currentStep === 1 && !selectedType && !emailFrom) ||
                (currentStep === 2 && !emailsSent) ||
                currentStep === 3
              }
              // className="text-white"
            >
              {currentStep < 3 ? (
                <>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                <></>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
