"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface CustomCollapseContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomCollapseContext =
  React.createContext<CustomCollapseContextProps | null>(null);

function useCustomCollapseContext() {
  const context = React.useContext(CustomCollapseContext);
  if (!context) {
    throw new Error(
      "useCustomCollapseContext must be used within a CustomCollapse"
    );
  }
  return context;
}

interface CustomCollapseProps {
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

function CustomCollapse({
  defaultOpen = false,
  children,
  className = "",
}: CustomCollapseProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <CustomCollapseContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={className}>{children}</div>
    </CustomCollapseContext.Provider>
  );
}

interface CustomCollapseTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function CustomCollapseTrigger({
  children,
  className = "",
}: CustomCollapseTriggerProps) {
  const { isOpen, setIsOpen } = useCustomCollapseContext();

  return (
    <button
      data-state={isOpen ? "open" : "closed"}
      onClick={() => setIsOpen(!isOpen)}
      className={cn("", className)}
    >
      {/* <div> */}
      {children}
      {/* <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}
      {/* </div> */}
    </button>
  );
}

interface CustomCollapseContentProps {
  children: React.ReactNode;
  className?: string;
}

function CustomCollapseContent({
  children,
  className = "",
}: CustomCollapseContentProps) {
  const { isOpen } = useCustomCollapseContext();

  if (!isOpen) return null;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </div>
  );
}

interface CustomCollapseTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function CustomCollapseTitle({ children, icon }: CustomCollapseTitleProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-sm font-medium">{children}</h3>
    </div>
  );
}

interface CustomCollapseDescriptionProps {
  children: React.ReactNode;
}

function CustomCollapseDescription({
  children,
}: CustomCollapseDescriptionProps) {
  return <p className="text-sm text-muted-foreground mt-1">{children}</p>;
}

// Export the compound component
export {
  CustomCollapse,
  CustomCollapseContent,
  CustomCollapseDescription,
  CustomCollapseTitle,
  CustomCollapseTrigger,
};
