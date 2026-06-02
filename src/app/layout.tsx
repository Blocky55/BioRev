import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

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
        <Sidebar />
        <main className="lg:ml-[260px] min-h-screen pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
