"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingLink } from "@/lib/constants";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CTAForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //TODO: Hit API to save email
      
      // fake delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setEmail("");
      window.location.href = bookingLink;
      // Send email to InboxDoctor
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center relative z-10">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row w-full max-w-xl sm:bg-white sm:rounded-full overflow-hidden gap-2 sm:gap-0"
      >
        <Input
          type="email"
          placeholder="Business email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-12 px-6 bg-transparent text-gray-900 border-0 focus:ring-0 focus:outline-none placeholder:text-gray-500 bg-white rounded-full"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-8 bg-primary hover:bg-primary-light text-white font-medium transition-all duration-200 disabled:opacity-50 sm:rounded-none rounded-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Booking...
            </span>
          ) : (
            "Book a Call"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CTAForm;
