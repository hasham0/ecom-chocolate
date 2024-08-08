import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Header from "./_components/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Product Page",
  description: "Ecomerce Chocolate Application",
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
