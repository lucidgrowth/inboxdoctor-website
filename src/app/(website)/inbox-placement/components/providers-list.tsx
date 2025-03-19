"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { bookingLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const b2c = [
  {
    title: "Gmail",
    image: "/providers-logos/gmail.png",
  },
  {
    title: "Yahoo Mail",
    image: "/providers-logos/yahoo.png",
  },
  {
    title: "Outlook Mail",
    image: "/providers-logos/outlook.png",
  },
  {
    title: "iCloud Mail",
    image: "/providers-logos/icloud.png",
  },
  {
    title: "GMX Mail",
    image: "/providers-logos/gmx.png",
  },
  {
    title: "Proton Mail",
    image: "/providers-logos/proton-mail.png",
  },
  {
    title: "AOL Mail",
    image: "/providers-logos/aol.png",
  },
];

export const b2b = [
  {
    title: "Google Workspace",
    image: "/providers-logos/google-workspace.png",
  },
  {
    title: "Microsoft 365",
    image: "/providers-logos/microsoft-365.png",
  },
  {
    title: "Zoho Mail",
    image: "/providers-logos/zoho-mail.png",
  },
  {
    title: "AWS Workmail",
    image: "/providers-logos/aws-workmail.png",
  },
  {
    title: "Abusix Guardian Mail",
    image: "/providers-logos/abusix.png",
  },
  {
    title: "Spamhaus Domain Block List",
    image: "/providers-logos/spamhaus.png",
  },
  {
    title: "Trend Micro Virus Scanning",
    image: "/providers-logos/trend-micro.png",
  },
];

const combined1 = [...b2c, ...b2b];
const combined2 = [...b2b, ...b2c];

export const ProviderSection = () => {
  return (
    <Container>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 ">
        <div className="relative">
          <InfiniteMovingCards
            items={combined1}
            direction="right"
            speed="slow"
            pauseOnHover={false}
          />
          <InfiniteMovingCards
            items={combined2}
            direction="left"
            speed="slow"
            pauseOnHover={false}
          />
        </div>
        <div className="flex items-center justify-center flex-col gap-4">
          <h2 className="text-3xl font-medium text-foreground text-center">
            Providers We <br /> Support
          </h2>

          {/* CTA Button */}
          <Link href="/#pricing">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full group relative"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              {/* Button Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-blue-600/20 blur-lg rounded-full" />
            </Button>
          </Link>
        </div>
        <div className="relative">
          <InfiniteMovingCards
            items={combined1}
            direction="left"
            speed="slow"
            pauseOnHover={false}
          />
          <InfiniteMovingCards
            items={combined2}
            direction="right"
            speed="slow"
            pauseOnHover={false}
          />
        </div>
      </div>
    </Container>
  );
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[68px] h-[68px] shrink-0 rounded-2xl bg-gradient-to-tl from-white/40 via-background to-white/40 transition-[color,border] duration-300 backdrop-blur-sm p-px group"
          >
            <div className="bg-background rounded-2xl h-full w-full flex items-center justify-center shadow-[inset_-7px_0_15px_#bfd1da1f]">
              <div className="relative  overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  height={30}
                  width={30}
                  className="w-full"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
