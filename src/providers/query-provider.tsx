"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const ReactQueryDevtools =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? React.lazy(() =>
        // Lazy load in development
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )
    : () => null;

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProviderWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProviderWrapper;
