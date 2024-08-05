"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = { children: ReactNode };

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient();
}

function getQueryClient() {
  if (typeof window === "undefined") {
    // we are on server side
    return makeQueryClient();
  } else {
    // we are on client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

const queryClient = getQueryClient();

function QueryProviderWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
  );
}

export default QueryProviderWrapper;
