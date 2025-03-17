import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  slug: string;
  className?: string;
};

const MoreInfoButton = ({ slug, className }: Props) => {
  return (
    <Link
      href={`/article/${slug}`}
      className={cn("text-muted-foreground text-sm underline")}
    >
      More Info
    </Link>
  );
};

export default MoreInfoButton;
