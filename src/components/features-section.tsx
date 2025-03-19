"use client";

import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

type FeaturesSectionProps = {
  data: {
    id: string;
    badge: string;
    heading: string;
    description: string;
    steps: {
      key: number;
      title: string;
      description: string;
      image: string;
    }[];
  };
  twoColIndexes?: number[];
};

const FeaturesSection = ({ data, twoColIndexes }: FeaturesSectionProps) => {
  return (
    <Container id={data.id}>
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
            <span className="text-sm text-primary">{data.badge}</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">{data.description}</p>
        </motion.div>

        <div className=" grid grid-cols-1 gap-8 md:grid-cols-3">
          {data.steps.map((step, index) => (
            <BentoGridItem
              key={step.key}
              title={step.title}
              description={step.description}
              header={
                <Image
                  src={step.image}
                  alt={step.title}
                  height={250}
                  width={300}
                  className="w-full h-full rounded-lg"
                />
              }
              className={twoColIndexes?.includes(index) ? "md:col-span-2" : ""}
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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
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

export default FeaturesSection;
