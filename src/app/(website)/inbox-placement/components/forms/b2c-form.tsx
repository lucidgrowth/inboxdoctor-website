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
import { Check, Copy } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {};

const B2CForm = (props: Props) => {
  const { theme } = useTheme();
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

  return (
    <div className="p-8 space-y-4">
      <div className=" flex flex-col gap-4 items-center">
        <span className="text-xl text-foreground">
          Copy & send a message to these email addresses:
        </span>

        <Textarea
          className="bg-background/20 text-foreground/80 text-xl"
          rows={10}
          value={emails}
          readOnly
        />
      </div>

      <div className="flex justify-between">
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
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Checkbox className="rounded-[4px] border-white/40" />
            <span className="text-sm text-foreground">
              I have sent an email to the above addresses.
            </span>
          </div>
          <Button className="text-white h-12 px-10 text-base">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default B2CForm;
