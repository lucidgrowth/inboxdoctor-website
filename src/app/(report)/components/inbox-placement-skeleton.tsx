import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const InboxPlacementSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row items-center lg:justify-between mb-4">
        <h1 className="page-heading text-muted-foreground">
          Inbox Placement Report
        </h1>

        <div className="flex items-center gap-2">
          <Skeleton className="w-[200px] h-10" />
          <Skeleton className="w-[100px] h-10" />
        </div>
      </div>
      <Skeleton className="max-w-[400px] h-5 my-4" />

      <div>
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
          Overall Result
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Skeleton className="w-full h-[112px]" />
          <Skeleton className="w-full h-[112px]" />
          <Skeleton className="w-full h-[112px]" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="col-span-full h-[340px]" />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
          Email Delivery Chain
        </h2>
        <Skeleton className="w-full h-[78px]" />
      </div>

      <div className="mb-6 space-y-6">
        <Skeleton className="w-full h-[78px]" />
        <Skeleton className="w-full h-[78px]" />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
          Placement by Provider Type
        </h2>
        <div className="space-y-6">
          <Skeleton className="w-full h-[78px]" />
          <Skeleton className="w-full h-[78px]" />
          <Skeleton className="w-full h-[78px]" />
        </div>
      </div>
    </div>
  );
};

export default InboxPlacementSkeleton;
