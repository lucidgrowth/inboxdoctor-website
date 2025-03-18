"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ChartLine,
  Clock,
  FileText,
  Lock,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const steps = [
  {
    key: 1,
    icon: ChartLine,
    title: "Overall Health Score",
    image: "/email-health/feature_01.png",
    description:
      "See your domain's overall score, like this example of 90/100, to gauge deliverability.",
  },
  {
    key: 2,
    icon: Shield,
    title: "Security Insights",
    image: "/email-health/feature_02.png",
    description:
      "Get a security breakdown, such as a 92% score with 2 failed checks, to identify risks.",
  },
  {
    key: 3,
    icon: Lock,
    title: "Records Status",
    image: "/email-health/feature_03.png",
    description: "Check the overall status of the DNS records of your domain.",
  },
  {
    key: 4,
    icon: ChartLine,
    title: "Delivery Chain Analysis",
    image: "/email-health/feature_04.png",
    description:
      "Track your email's journey, like this Amazon SES success, with no open relay issues.",
  },
  {
    key: 5,
    icon: Clock,
    title: "Domain Age Impact",
    image: "/email-health/feature_05.png",
    description:
      "Learn how domain age affects delivery, like this 10-day domain needing reputation growth.",
  },
  {
    key: 6,
    icon: FileText,
    title: "Open Relay Checks",
    image: "/email-health/feature_07.png",
    description: "Check session transcripts and detected Open Relay.",
  },
  {
    key: 7,
    icon: AlertTriangle,
    title: "Blacklist Monitoring",
    image: "/email-health/feature_06.png",
    description:
      "Find out if you're blacklisted, as shown by this sample with 1 listing needing attention.",
  },
];

const EmailHealthFeatures = () => {
  return (
    <Container id="features">
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
            <span className="text-sm text-primary">Why Choose Us</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Why Choose InboxDoctor?
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            We are a team of email experts who are dedicated to providing the
            best email health check service to our customers.
          </p>
        </motion.div>

        <div className=" grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <BentoGridItem
              key={step.key}
              title={step.title}
              description={step.description}
              header={
                step.image ? (
                  <Image
                    src={step.image}
                    alt={step.title}
                    height={250}
                    width={300}
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="!h-[251px] w-full bg-primary/10 rounded-lg" />
                )
              }
              icon={<step.icon className="size-4 shrink-0 text-white" />}
              className={index === 3 || index === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/10 bg-white/[0.02] transition duration-200",
        className
      )}
    >
      {header}
      <div className="p-5 pt-0">
        {/* {icon} */}
        <div className="mt-2 mb-2 text-lg font-sans font-bold text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};

export default EmailHealthFeatures;
