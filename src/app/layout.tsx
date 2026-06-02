import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "BioRevise — Retro Biology Revision",
  description: "A retro-pixel themed biology revision tool for UCIL20892 at University of Manchester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-body bg-navy min-h-screen">
        <Sidebar />
        <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
