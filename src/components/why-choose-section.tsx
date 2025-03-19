"use client";

import Container from "@/components/container";
import { motion } from "motion/react";

type WhyChooseSectionProps = {
  data: {
    id: string;
    badge: string;
    heading: string;
    description: string;
    steps: {
      key: number;
      icon: React.ReactNode;
      title: string;
      description: string;
    }[];
  };
};

const WhyChooseSection = ({ data }: WhyChooseSectionProps) => {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">{data.badge}</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            {data.heading}
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl">{data.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data?.steps.map((feature, index) => (
            <motion.div
              className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6"
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {/* image */}

              <div className="flex items-start gap-4 [&>svg]:text-primary [&>svg]:size-8 [&>svg]:shrink-0">
                {feature.icon}
                <div className="flex flex-col gap-2 text-foreground">
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <p className="text-base text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseSection;
