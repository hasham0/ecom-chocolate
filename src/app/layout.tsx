import QueryProviderWrapper from "@/wrapper/provider/query-provider";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

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
        <QueryProviderWrapper>{children}</QueryProviderWrapper>
      </body>
    </html>
  );
}
