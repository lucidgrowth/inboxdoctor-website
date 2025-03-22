"use client";

import Container from "@/components/container";
import { generateRandomAlias } from "@/lib/utils";
import { getEmailHealthAlias } from "@/services";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { Check, Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import EmailHealthForm from "./form/email-health-form";

const EmailHealthHero = () => {
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

        <div className="relative z-20 mx-auto pt-32 pb-20 flex flex-col text-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm w-fit mb-5"
          >
            <Mail className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm text-primary">Email Health Test</span>
          </motion.div>

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
              <span>Keep Your Domain in Top Shape</span>
              <br />
              Check{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                Email Health
              </span>{" "}
              Now!
              {/* <span className="text-white">with AI-Powered Intelligence</span> */}
            </motion.h1>
            {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
              Take the <span className="text-primary">domain health test</span>
            </h2> */}

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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EmailHealthForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default EmailHealthHero;
