"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};
const CTASection = ({
  title,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) => {
  return (
    <Container className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="p-[.063rem] rounded-2xl relative overflow-hidden"
      >
        {/* decoration */}
        <div>
          <motion.div
            className="cta-decoration cta-decoration-one"
            animate={{
              x: ["-2%", "100%", "-2%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="cta-decoration cta-decoration-two"
            animate={{
              x: ["2%", "-100%", "2%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          ></motion.div>
        </div>

        {/* content */}
        <div className="relative z-10 border rounded-2xl py-12 px-8">
          <div className="z-0 pointer-events-none absolute inset-0">
            <Image
              src="/cta-image.png"
              alt="InboxDoctor Interface"
              fill
              className="w-full object-cover rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex flex-col gap-4 text-foreground">
              <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>

              <p className="text-base text-gray-400">{description}</p>

              <div className="pt-10">
                {/* CTA Button */}
                <Link
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full group relative"
                  >
                    {buttonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 -z-10 bg-blue-600/20 blur-lg rounded-full" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default CTASection;
