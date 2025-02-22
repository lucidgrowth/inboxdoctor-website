"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Spotlight } from "./spotlight";
import Container from "@/components/container";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description:
        "Perfect for individuals starting their email journey with essential features.",
      price: "Free",
      features: [
        "1 Domain Setup",
        "Basic Email Warmup",
        "Standard Analytics",
        "Email Health Monitoring",
        "Basic Templates",
        "Community Support",
      ],
      cta: "Get Started",
      ctaVariant: "outline" as const,
    },
    {
      name: "Pro",
      description:
        "Ideal for businesses needing advanced features and priority support.",
      price: isAnnual ? "89.99" : "99.99",
      features: [
        "All Basic Features",
        "Unlimited Domains",
        "Advanced Analytics",
        "Priority Support",
        "Custom Templates",
        "API Access",
      ],
      cta: "Get Started",
      ctaVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      description:
        "Tailored solutions for large organizations requiring custom features.",
      price: "Custom",
      features: [
        "All Pro Features",
        "Custom Integration",
        "Dedicated Support",
        "SLA Guarantee",
        "Custom Development",
        "Advanced Security",
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const,
    },
  ];

  return (
    <Container id="pricing">
      {/* <div className="z-2 pointer-events-none [background-origin:border-box] w-[924px] absolute -inset-[190px] inset-y-auto inset-x-auto left-1/2 -translate-x-[135px] -translate-y-[290px] hidden lg:block">
        <img
          src="/pricing-rays.png"
          alt="Pricing Background"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="z-0 pointer-events-none [background-origin:border-box] w-[870px] absolute inset-0 inset-y-auto inset-x-auto left-1/2 -translate-x-[135px] hidden lg:block">
        <img
          src="/pricing-spotlight-grid.png"
          alt="Pricing Background"
          className="w-full h-full object-contain"
        />
      </div> */}

      {/* Background with purple gradient */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      /> */}

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-5"
          >
            <span className="text-sm text-primary">Pricing</span>
          </motion.div>

          <h2 className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4">
            Flexible Pricing Plans
            <span className="">
              {" "}
              <br />
              for Every Need
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg lg:text-xl">
            Choose the plan that best fits your requirements and start
            optimizing your email deliverability today!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-7 mb-12"
          >
            <span
              className={`text-base ${
                isAnnual ? "text-gray-400" : "text-white"
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary scale-150"
            />
            <span
              className={`text-base  ${
                isAnnual ? "text-white" : "text-gray-400"
              }`}
            >
              Annually <span className="text-primary ">(20% off)</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border overflow-hidden ${
                plan.popular
                  ? "border-primary/50 bg-primary/[0.08]"
                  : "border-white/10 bg-white/[0.02]"
              } backdrop-blur-sm p-8`}
            >
              {plan.name === "Pro" && (
                <div className="z-0 pointer-events-none w-[70%] absolute right-0 top-0">
                  <img
                    src="/pricing-card-image.png"
                    alt="Pro Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )} */}
              <div className="mb-6 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-2xl text-white">$</span>
                  )}
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.ctaVariant}
                className={`w-full rounded-full h-14 text-base text-white ${
                  plan.ctaVariant === "default"
                    ? "bg-primary hover:bg-primary/90"
                    : "border-primary/50 hover:bg-primary/10"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
