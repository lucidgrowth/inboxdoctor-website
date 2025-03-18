"use client";

import Container from "@/components/container";
import { MultiStepLoader } from "@/components/multi-step-loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const loadingStates = [
  { text: "Receiving Your Test Email" },
  { text: "Verifying Email Authentication" },
  { text: "Analyzing Delivery Chain" },
  { text: "Scanning Security Settings" },
  { text: "Checking Blacklist Status" },
  { text: "Generating Your Health Report" },
];

const EmailHealthHero = () => {
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const [sendEmail, setSendEmail] = useState(false);
  return (
    <section className="overflow-clip">
      <Container type="div" className="py-0 overflow-visible">
        <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div>

        <div className="relative z-20 mx-auto pt-32 pb-20">
          <div className="text-center mb-10 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              Is Your Email Domain Properly Secured?
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
              Take the <span className="text-primary">domain health test</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center">
                <div className="mr-2 bg-primary/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white">
                  Instant SPF, DKIM & DMARC check
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 bg-primary/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white">100% secure & free</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 bg-primary/20 p-1 rounded-full">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white">Created by security experts</span>
              </div>
            </div>
          </div>

          {!sendEmail ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10">
              {/* <div className="absolute inset-0 pointer-events-none top-[20%]">
    <div className="relative rounded-[50%] blur-[150px] bg-primary aspect-square lg:aspect-[1194/378] z-0"></div>
  </div> */}

              <div className="hiw-card relative z-10">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Enter your domain to check
                </h3>

                <div className="flex items-center mb-6 relative">
                  <Input
                    placeholder="yourdomain.com"
                    className="flex-1 bg-secondary border-primary text-white pr-10"
                  />

                  <Button
                    variant="ghost"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground"
                  >
                    <Copy />
                  </Button>
                </div>

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

                <p className="text-sm text-[#C0C6D0]">
                  We&apos;ll scan your domain&apos;s DNS records to verify
                  proper email authentication setup. No emails will be sent or
                  received during this process.
                </p>
              </div>

              <div className="hiw-card relative z-10">
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary/20 p-1 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Comprehensive SPF, DKIM & DMARC analysis
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary/20 p-1 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Security vulnerabilities assessment
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary/20 p-1 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-white">
                      Actionable recommendations to fix issues
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/80 text-white py-4 h-auto text-lg shadow-lg hover:shadow-xl mt-4"
                  disabled={!isChecked}
                  onClick={() => setSendEmail(true)}
                >
                  <span>Check Result</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="hiw-card relative flex flex-col gap-4 justify-center items-center z-10">
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

              <Button variant={"outline"}>
                <ArrowLeft className="ml-2 h-5 w-5" />
                <span>
                  No results? Make sure you sent the email to the given address!
                </span>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default EmailHealthHero;
