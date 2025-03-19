"use client";

import Container from "@/components/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";

const data = [
  {
    aspect: "Target Environment",
    b2b: "Corporate email systems (Microsoft Exchange, Google Workspace)",
    b2c: "Consumer email providers (Gmail, Yahoo, Outlook.com)",
  },
  {
    aspect: "Filtering Mechanisms",
    b2b: "Strict corporate filtering policies, security gateways",
    b2c: "Algorithmic filtering based on user engagement",
  },
  {
    aspect: "Blocklist Concerns",
    b2b: "Domain-level blocklists used by businesses",
    b2c: "Personal spam filter preferences",
  },
  {
    aspect: "Security Scrutiny",
    b2b: "Stricter spam filters and content scanning systems",
    b2c: "Folder categorization (Promotions, Updates, etc.)",
  },
  {
    aspect: "Testing Requirements",
    b2b: "Seed accounts within actual corporate environments",
    b2c: "Consumer seed accounts across major providers",
  },
  {
    aspect: "Testing Scope",
    b2b: "Multiple company domain types and security configurations",
    b2c: "Personal account configurations and engagement levels",
  },
  {
    aspect: "Verification Process",
    b2b: "Both external gateway and internal filtering results",
    b2c: "Folder placement rather than pure accept/reject outcomes",
  },
  {
    aspect: "Timing Considerations",
    b2b: "Often requires testing during business hours",
    b2c: "Can be performed reliably at any time of day",
  },
  {
    aspect: "Primary Success Metric",
    b2b: "Deliverability to the primary inbox",
    b2c: "Inbox vs. promotions vs. spam folder placement rates",
  },
  {
    aspect: "Security Focus",
    b2b: "Avoiding security blocks and false-positive detection",
    b2c: "Engagement metrics impact on future deliverability",
  },
  {
    aspect: "Authentication Importance",
    b2b: "SPF, DKIM, DMARC pass rates",
    b2c: "Image loading and click tracking preservation",
  },
  {
    aspect: "Delivery Tracking",
    b2b: "Delivery speed and security scanning delays",
    b2c: "Mobile app delivery confirmation",
  },
];

const ProviderCompare = () => {
  return (
    <Container id="provider-compare">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">Compare</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Key Differences Between B2B & B2C Inbox Placement
          </h2>
          {/* <p className="text-gray-400 text-lg lg:text-xl">
            Key Differences Between B2B & B2C Inbox Placement.
          </p> */}
        </motion.div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-4 px-5 text-lg text-gray-400">
                  Aspect
                </TableHead>
                <TableHead className="py-4 px-5 text-lg text-gray-400">
                  B2B Inbox Placement Testing
                </TableHead>
                <TableHead className="py-4 px-5 text-lg text-gray-400">
                  B2C Inbox Placement Testing
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.aspect} className="text-foreground/80">
                  <TableCell className="py-4 px-5 text-lg font-medium text-foreground">
                    {item.aspect}
                  </TableCell>
                  <TableCell className="py-4 px-5 text-base">
                    {item.b2b}
                  </TableCell>
                  <TableCell className="py-4 px-5 text-base">
                    {item.b2c}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ProviderCompare;
