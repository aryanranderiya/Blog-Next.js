import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/shadcn/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aryan's Blog",
  description: "A blog website created by Aryan Randeriya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen overflow-hidden`}>
        <NextUIProvider>
          <Navbar />
          <div className="flex flex-row dark h-screen max-h-screen min-h-screen">
            <Sidebar />
            <ScrollArea>{children}</ScrollArea>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
