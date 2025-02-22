import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  type?: "section" | "div";
} & (React.HTMLAttributes<HTMLDivElement> | React.HTMLAttributes<HTMLElement>);

const Container = ({
  children,
  className,
  type = "section",
  ...props
}: Props) => {
  const baseClassName =
    "max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-32 relative py-20 overflow-hidden bg-background";

  return type === "section" ? (
    <section className={cn(baseClassName, className)} {...props}>
      {children}
    </section>
  ) : (
    <div className={cn(baseClassName, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
