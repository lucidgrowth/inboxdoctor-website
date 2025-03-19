"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiStepLoader } from "@/components/multi-step-loader";

const loadingStates = [
  { text: "Receiving Your Test Email" },
  { text: "Identifying Your Audience Type" },
  { text: "Distributing to Email Providers" },
  { text: "Analyzing Email Routing" },
  { text: "Evaluating Placement Results" },
  { text: "Checking Spam Triggers" },
  { text: "Assessing Sender Reputation" },
  { text: "Generating Your Placement Report" },
];

const B2CForm = () => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emails, setEmails] = useState(
    "test-inbox1@gmail.com, test-inbox2@outlook.com, test-inbox3@yahoo.com, test-inbox4@aol.com, test-inbox5@icloud.com"
  );
  const [separator, setSeparator] = useState(",");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmails = () => {
    navigator.clipboard.writeText(emails);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleSeparatorChange = (value: string) => {
    setSeparator(value);
    // Split by current separator and join with new separator
    const emailList = emails.split(separator);
    setEmails(emailList.join(value));
  };

  if (isSent) {
    return <Loader setSendEmail={setIsSent} />;
  }

  return (
    <div className="p-8 space-y-4">
      <div className=" flex flex-col gap-4 items-center">
        <span className="text-xl text-foreground">
          Copy & send a message to these email addresses:
        </span>

        <Textarea
          className="bg-background/20 text-foreground/80 md:text-xl"
          rows={10}
          value={emails}
          readOnly
        />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="flex gap-2 items-center">
          <Select defaultValue={","} onValueChange={handleSeparatorChange}>
            <SelectTrigger className="w-[180px] text-foreground">
              <SelectValue placeholder="Select separator" />
            </SelectTrigger>
            <SelectContent className={theme === "dark" ? "dark" : ""}>
              <SelectItem value=",">Comma</SelectItem>
              <SelectItem value=";">Semicolon</SelectItem>
              <SelectItem value="\n">Newline</SelectItem>
              <SelectItem value=",\n">Comma + Newline</SelectItem>
              <SelectItem value=";\n">Semicolon + Newline</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            onClick={handleCopyEmails}
            disabled={isCopied}
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {isCopied ? "Copied" : "Copy Emails"}
          </Button>
        </div>
        <div className="flex gap-4 items-center flex-col md:flex-row">
          <div className="flex gap-2 items-center">
            <Checkbox
              className="rounded-[4px] border-white/40"
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
            />
            <span className="text-sm text-foreground text-left">
              I have sent an email to the above addresses.
            </span>
          </div>
          <Button
            className="text-white h-12 px-10 text-base w-full md:w-fit"
            disabled={!isChecked}
            onClick={() => setIsSent(true)}
          >
            View Result
          </Button>
        </div>
      </div>
    </div>
  );
};

const Loader = ({
  setSendEmail,
}: {
  setSendEmail: (value: boolean) => void;
}) => {
  return (
    <div className="p-8 space-y-4">
      <h3 className="text-2xl font-semibold text-white mb-6">
        Please wait while we analyze your email
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
          onClick={() => setSendEmail(false)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>No results?</span>
        </Button>
      </div>
    </div>
  );
};

export default B2CForm;
