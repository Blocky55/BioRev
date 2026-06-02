import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "BioRevise — Biology Revision",
  description: "A revision tool for UCIL20892 Biology for Curious Minds at University of Manchester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-surface min-h-screen">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
