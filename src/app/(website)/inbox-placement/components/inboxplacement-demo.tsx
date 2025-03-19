"use client";

import Container from "@/components/container";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const FloatingBadge = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-[#292929]">
      <div className="border rounded-full size-5 flex items-center justify-center">
        <Check size={10} className="text-foreground" />
      </div>
      <span className="text-sm text-foreground/70">{text}</span>
    </div>
  );
};

const floatingBadges = [
  {
    text: "Inbox Accuracy",
    position: [282, "auto", "auto", 115],
  },
  {
    text: "Deliverability Insights",
    position: ["auto", 60, 30, "auto"],
  },
  {
    text: "B2B/B2C Targeting",
    position: ["auto", "auto", 62, 31],
  },
  {
    text: "Placement Analysis",
    position: ["auto", "3px", "327px", "auto"],
  },
  {
    text: "Real-Time Results",
    position: ["auto", "151px", "536px", "auto"],
  },
];

const InboxPlacementDemo = () => {
  return (
    <section className="overflow-clip">
      <Container type="div" className="pb-0 overflow-visible">
        <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/hero-bg-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div>

        {/* floating badges */}
        {floatingBadges.map((badge, index) => {
          const [top, right, bottom, left] = badge.position;
          return (
            <div
              key={index}
              style={{
                top,
                right,
                bottom,
                left,
              }}
              className={`absolute hidden xl:block p-px bg-gradient-to-r z-30 from-transparent via-white/50 to-transparent rounded-full`}
            >
              <FloatingBadge text={badge.text} />
            </div>
          );
        })}

        <div className="relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-[763px] w-full mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
            >
              <span className="text-sm text-primary">Demo</span>
            </motion.div>

            <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
              Explore Your Email Placement Dashboard in Action
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl">
              Unlock the complete metrics of your Inbox Placement Test—book a
              call to get started!
            </p>
          </motion.div>

          {/* App Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative !mt-10 max-w-[980px] mx-auto"
          >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[15]" />
              {/* <div className="z-0 w-[62%] absolute -top-[12.5%] lg:-top-[23.5%] bottom-auto left-1/2 -translate-x-1/2">
                <Image
                  src="/glow-image.png"
                  alt="InboxDoctor Interface"
                  width={1400}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div> */}
              <div className="relative opacity-70 rounded-[50%] top-[10%] blur-[150px] bg-primary aspect-square lg:aspect-[1194/378] z-0"></div>
            </div>

            {/* images */}
            <div className="relative z-10">
              {/* <div
                // src="/hero-image-mobile.png"
                // alt="InboxDoctor Interface"
                className="rounded-xl absolute top-1/2 -translate-y-[20%] -left-[100px] bg-background -rotate-6 max-w-[245px] w-[28%] h-[28%] lg:rounded-2xl shadow-2xl border-2 border-white/10 xl:block hidden  z-10 "
              />
              <div
                // src="/hero-image-mobile.png"
                // alt="InboxDoctor Interface"
                className="rounded-xl absolute top-1/2 -translate-y-[40%] -right-[100px] bg-background rotate-6 max-w-[245px] w-[28%] h-[28%] lg:rounded-2xl shadow-2xl border-2 border-white/10 xl:block hidden  z-10 "
              /> */}
              <Image
                src="/inbox-placement/inbox-placement-main-mobile.png"
                alt="InboxDoctor Interface"
                width={767}
                height={767}
                className="rounded-xl lg:rounded-2xl shadow-2xl border-4 border-white/10 w-full z-10 lg:hidden"
              />
              <Image
                src="/inbox-placement/inbox-placement-main.png"
                alt="InboxDoctor Interface"
                width={1400}
                height={600}
                className="rounded-xl lg:rounded-2xl shadow-2xl border-4 border-white/10 w-full z-10 hidden lg:block"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default InboxPlacementDemo;
