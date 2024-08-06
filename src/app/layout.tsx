import QueryProviderWrapper from "@/wrapper/provider/query-provider";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ZustandStoreProvider from "@/store/provider/store-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Choco Shop",
  description: "Ecomerce Chocolate Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen bg-background font-sans antialiased`,
          fontSans.variable,
        )}
      >
        <ZustandStoreProvider>
          <QueryProviderWrapper>{children}</QueryProviderWrapper>
        </ZustandStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
