"use client";

import type React from "react";

import { socialsLinks } from "@/app/components/footer";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Megaphone } from "@phosphor-icons/react";
import { ArrowRight, Headphones, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const contactInfo = [
  {
    icon: Headphones,
    title: "Support",
    value: "support@inboxdoctor.ai",
  },
  {
    icon: Megaphone,
    title: "Sales",
    value: "sales@inboxdoctor.ai",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleRecaptchaChange = (token: string | null) => {
    console.log("Recaptcha value:", token);
  };

  return (
    <section className="overflow-clip">
      <Container
        type="div"
        className="pt-32 overflow-visible flex flex-col items-center lg:items-start"
      >
        {/* <div className="z-0 pointer-events-none w-[1200px] absolute top-0 bottom-auto left-1/2 -translate-x-1/2">
          <Image
            src="/circle-grid.png"
            alt="InboxDoctor Interface"
            width={1400}
            height={600}
            className="w-full"
          />
        </div> */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm w-fit mb-6"
        >
          <Mail className="w-4 h-4 text-primary mr-2" />
          <span className="text-sm text-primary">Contact Us</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-20"
        >
          <div className="lg:max-w-[450px] w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold font-aspekta tracking-tight text-white text-center lg:text-left"
            >
              Get In Touch!
            </motion.h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl mt-4 text-center lg:text-left">
              In need of help? Together, let&apos;s approach it and make sure we
              succeed at every turn. How could I be of assistance?
            </p>

            <ContactInfoRender className="hidden lg:grid" />
          </div>

          <div className="bg-gradient-to-b from-primary/50 to-transparent rounded-xl md:rounded-2xl p-px h-fit flex-1">
            <div className="bg-background rounded-xl lg:rounded-2xl p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-white">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="bg-white/[0.02] border border-white/10 text-white placeholder:text-white/20 placeholder:text-base h-auto py-4 px-5 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-white">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="bg-white/[0.02] border border-white/10 text-white placeholder:text-white/20 placeholder:text-base h-auto py-4 px-5 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-white">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="bg-white/[0.02] border border-white/10 text-white placeholder:text-white/20 placeholder:text-base h-auto py-4 px-5 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-white">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here!"
                    className="min-h-[150px] bg-white/[0.02] border border-white/10 text-white placeholder:text-white/20 placeholder:text-base h-auto py-4 px-5 text-base"
                  />
                </div>
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                  <div className="space-y-2">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme="dark"
                      className="rounded-xl"
                    />
                  </div>
                )}

                <div className="flex justify-start">
                  <Button
                    type="submit"
                    className="px-8 py-4 h-auto rounded-full text-base flex items-center"
                  >
                    Submit
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <ContactInfoRender className="lg:hidden m-0" />
        </motion.div>
      </Container>
    </section>
  );
};

const ContactInfoRender = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cn("grid md:grid-cols-1 gap-12 my-16 w-full", className)}>
        {contactInfo.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-primary/50 to-transparent rounded-xl p-px relative"
          >
            <div className="rounded-xl py-5 px-6 bg-background flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center">
                <item.icon className="h-8 w-8 text-primary/70" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <a
                  href={`mailto:${item.value}`}
                  className="text-muted-foreground"
                >
                  {item.value}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={cn("border-t border-white/10 pt-6", className)}>
        <div className="flex items-center">
          <span className="text-gray-300 mr-4">Social Media :</span>
          <div className="flex space-x-3">
            {socialsLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <item.icon className="h-5 w-5 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
