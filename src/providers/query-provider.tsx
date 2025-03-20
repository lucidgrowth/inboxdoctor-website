"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProviderWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default QueryProviderWrapper;
