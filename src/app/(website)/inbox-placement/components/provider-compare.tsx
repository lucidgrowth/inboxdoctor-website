"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { b2b, b2c } from "./providers-list";
import Image from "next/image";

const data = {
  aspect: {
    title: "Features",
    content: [
      "Target Environment",
      "Filtering Mechanisms",
      "Blocklist Concerns",
      "Security Scrutiny",
      "Testing Requirements",
      "Testing Scope",
      "Verification Process",
      "Timing Considerations",
      "Primary Success Metric",
      "Security Focus",
      "Authentication Importance",
      "Delivery Tracking",
      "Providers",
    ],
  },
  b2b: {
    title: "B2B inbox placement",
    content: [
      "Corporate email systems",
      "Strict corporate filtering policies, security gateways",
      "Domain-level blocklists used by businesses",
      "Stricter spam filters and content scanning systems",
      "Seed accounts within actual corporate environments",
      "Multiple company domain types and security configurations",
      "Both external gateway and internal filtering results",
      "Often requires testing during business hours",
      "Deliverability to the primary inbox",
      "Avoiding security blocks and false-positive detection",
      "SPF, DKIM, DMARC pass rates",
      "Delivery speed and security scanning delays",
      "Providers",
    ],
  },
  b2c: {
    title: "B2C inbox placement",
    content: [
      "Consumer email providers",
      "Algorithmic filtering based on user engagement",
      "Personal spam filter preferences",
      "Folder categorization (Promotions, Updates, etc.)",
      "Consumer seed accounts across major providers",
      "Personal account configurations and engagement levels",
      "Folder placement rather than pure accept/reject outcomes",
      "Can be performed reliably at any time of day",
      "Inbox vs. promotions vs. spam folder placement rates",
      "Engagement metrics impact on future deliverability",
      "Image loading and click tracking preservation",
      "Mobile app delivery confirmation",
      "Providers",
    ],
  },
};
const ProviderCompare = () => {
  return (
    <Container>
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
            <span className="text-sm text-primary">Compare</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Differences Between B2B & B2C Inbox Placement
          </h2>
          {/* <p className="text-gray-400 text-lg lg:text-xl">{data.description}</p> */}
        </motion.div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
        <FeatureList
          title={data.aspect?.title}
          content={data.aspect?.content}
          variant="feature"
        />
        <FeatureList
          title={data.b2b?.title}
          content={data.b2b?.content}
          variant="b2b"
        />
        <FeatureList
          title={data.b2c?.title}
          content={data.b2c?.content}
          variant="b2c"
        />
      </div>
    </Container>
  );
};

const FeatureList = ({
  title,
  content,
  variant = "feature",
}: {
  title: string;
  content: string[];
  variant: "b2b" | "b2c" | "feature";
}) => {
  return (
    <div
      className={cn(
        "border rounded-xl grid grid-cols-1 grid-rows-[min-content_1fr]",
        variant === "b2b" && "bg-blue-900/20 text-blue-800 border-blue-900",
        variant === "b2c" &&
          "bg-purple-900/20 text-purple-800 border-purple-900"
      )}
    >
      <div
        className={cn(
          "px-6 py-4 flex items-center border-b gap-2",
          variant === "b2b" && "border-b-blue-900",
          variant === "b2c" && "border-b-purple-900"
        )}
      >
        <h3 className="text-xl font-bold text-foreground capitalize">
          {title}
        </h3>
      </div>
      <ul
        className={cn(
          "divide-y grid auto-rows-[1fr] row-span-2",
          variant === "b2b" && "divide-blue-900",
          variant === "b2c" && "divide-purple-900"
        )}
      >
        {content.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-4 p-5",
              variant === "feature"
                ? "text-base font-medium text-foreground"
                : "text-sm text-foreground/80"
            )}
          >
            {/* {variant !== "feature" && renderIcon(item, variant)} */}
            {variant == "b2b" && item === "Providers" && (
              <div className="flex items-center gap-3 flex-wrap">
                {b2b.map((provider) => (
                  <Image
                    src={provider.image}
                    alt={provider.title}
                    width={20}
                    height={20}
                    key={provider.title}
                  />
                ))}
              </div>
            )}
            {variant == "b2c" && item === "Providers" && (
              <div className="flex items-center gap-3 flex-wrap">
                {b2c.map((provider) => (
                  <Image
                    src={provider.image}
                    alt={provider.title}
                    width={20}
                    height={20}
                    key={provider.title}
                  />
                ))}
              </div>
            )}

            {variant !== "feature" ? item !== "Providers" && item : item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderCompare;
