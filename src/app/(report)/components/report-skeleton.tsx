import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ReportSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row items-center lg:justify-between mb-4">
        <h1 className="page-heading">Email Domain Health Report</h1>

        <div className="flex items-center gap-2">
          <Skeleton className="w-[200px] h-10" />
          <Skeleton className="w-[100px] h-10" />
        </div>
      </div>
      <Skeleton className="max-w-[400px] h-5 my-4" />

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="w-full h-[290px]" />
        <Skeleton className="w-full h-[290px]" />
        <Skeleton className="w-full h-[290px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Skeleton className="w-full h-[340px]" />
        <Skeleton className="w-full h-[340px]" />
        <Skeleton className="col-span-full h-[340px]" />
      </div>

      <Skeleton className="w-full h-[48px] mt-5 mb-4" />

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Email Delivery Chain</h2>
        <Skeleton className="w-full h-[78px]" />
      </div>
      <div className="mb-6">
        <div className="flex gap-4 justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Email Health Results</h2>
          <Skeleton className="max-w-[100px] w-full h-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[64px]" />
          ))}
        </div>
      </div>

      <div className="mb-6 space-y-6">
        <Skeleton className="w-full h-[78px]" />
        <Skeleton className="w-full h-[78px]" />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Blacklists</h2>
        <div className="space-y-6">
          <Skeleton className="w-full h-[78px]" />
          <Skeleton className="w-full h-[78px]" />
          <Skeleton className="w-full h-[78px]" />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Open relay check</h2>
        <Skeleton className="w-full h-[78px]" />
      </div>
    </div>
  );
};

export default ReportSkeleton;
