import { Tooltip, TooltipArrow, TooltipTrigger } from "@radix-ui/react-tooltip";
import { TooltipContent } from "./ui/tooltip";
import React from "react";

type Props = {
  children: React.ReactNode;
  description: string;
};

const StyledTooltip = ({ children, description }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-help">
        {children}
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white max-w-[300px]">
        <TooltipArrow />
        {description}
      </TooltipContent>
    </Tooltip>
  );
};

export default StyledTooltip;
