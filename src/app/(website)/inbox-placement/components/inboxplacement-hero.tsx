"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { Check, Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import B2CForm from "./forms/b2c-form";
import B2BForm from "./forms/b2b-form";

const loadingStates = [
  { text: "Receiving Your Test Email" },
  { text: "Verifying Email Authentication" },
  { text: "Analyzing Delivery Chain" },
  { text: "Scanning Security Settings" },
  { text: "Checking Blacklist Status" },
  { text: "Generating Your Health Report" },
];

const points = [
  "Checks delivery across major providers",
  "100% secure & free",
  "Created by deliverability experts",
];

const InboxPlacementHero = () => {
  const [currentTab, setCurrentTab] = useState<"b2c" | "b2b">("b2c");
  return (
    <section className="overflow-clip">
      <Container type="div" className="py-0 overflow-visible">
        {/* grid background */}
        <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div>

        <div className="relative z-20 mx-auto pt-32 pb-20 flex flex-col text-center items-center">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm w-fit mb-5"
          >
            <Mail className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm text-primary">Inbox Placement Test</span>
          </motion.div>

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10 relative z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold font-aspekta tracking-tight text-white"
            >
              <span>Ensure Your Emails Reach the</span> <br />{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                Inbox Test Placement
              </span>{" "}
              Now!
            </motion.h1>
            {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
              Take the <span className="text-primary">domain health test</span>
            </h2> */}

            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {points.map((point, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2 bg-primary/20 p-1 rounded-full">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* content */}

          <div className="flex flex-col items-center justify-center w-full mt-7">
            {/* tab list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-4">
              <div
                onClick={() => setCurrentTab("b2c")}
                className={cn(
                  "flex  items-center justify-center py-4 rounded-lg border-[#292929] border bg-background text-white/50",
                  currentTab === "b2c" &&
                    "bg-[#0d053a] text-white border-primary"
                )}
              >
                B2C
              </div>
              <div
                onClick={() => setCurrentTab("b2b")}
                className={cn(
                  "flex  items-center justify-center py-4 rounded-lg border-[#292929] border bg-background text-white/50",
                  currentTab === "b2b" &&
                    "bg-[#0d053a] text-white border-primary"
                )}
              >
                B2B
              </div>
            </div>

            {/* tab content */}
            <div className="w-full">
              {currentTab === "b2c" && <B2CContent />}
              {currentTab === "b2b" && <B2BContent />}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const B2CContent = () => {
  return (
    <div className="border-2 border-white/20 rounded-xl bg-background">
      <B2CForm />
    </div>
  );
};

const B2BContent = () => {
  return (
    <div className="border-2 border-white/20 rounded-xl bg-background">
      <B2BForm />
    </div>
  );
};

export default InboxPlacementHero;
