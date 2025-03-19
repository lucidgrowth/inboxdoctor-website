"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

type Props = {};

const B2BForm = (props: Props) => {
  const [emails, setEmails] = useState("");

  return (
    <div>
      <div className="p-4 flex flex-col gap-4 items-start">
        <span className="text-lg text-foreground/80">
          Copy & send a message to these email addresses:
        </span>

        <Textarea
          className="bg-background/20"
          placeholder="Email"
          rows={10}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />
      </div>

      <div className="p-4 flex justify-end">
        <Button className="text-white h-12 px-10 text-base">Send</Button>
      </div>
    </div>
  );
};

export default B2BForm;
