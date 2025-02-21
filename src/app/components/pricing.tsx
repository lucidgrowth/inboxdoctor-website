"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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
    <div className="relative py-20 overflow-hidden bg-background">
      {/* Background with purple gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Flexible Pricing Plans
            <br />
            <span className="text-blue-400">for Every Need</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Choose the plan that best fits your requirements and start
            optimizing your email deliverability today!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={`text-sm ${isAnnual ? "text-gray-400" : "text-white"}`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-blue-600"
            />
            <span
              className={`text-sm ${isAnnual ? "text-white" : "text-gray-400"}`}
            >
              Annually <span className="text-blue-400">(20% off)</span>
            </span>
          </motion.div>
        </div>

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
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-blue-500/50 bg-blue-500/[0.08]"
                  : "border-white/10 bg-white/[0.02]"
              } backdrop-blur-sm p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
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
                    <Check className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.ctaVariant}
                className={`w-full ${
                  plan.ctaVariant === "default"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-blue-500/50 hover:bg-blue-500/10"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
