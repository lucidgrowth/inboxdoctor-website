"use client";

import Container from "@/components/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
  title: string;
  description: string;
};

export default function FaqSection({ faqs, title, description }: Props) {
  return (
    <Container id="faq">
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <span className="text-sm text-blue-400">FAQ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4"
          >
            {title}
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl">
            {description}
          </p>
        </div>

        <div className="space-y-2">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/[0.02] rounded-2xl px-4"
                >
                  <AccordionTrigger className="py-6 hover:no-underline text-lg [&>svg]:size-6 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </Container>
  );
}
