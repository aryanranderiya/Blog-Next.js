"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/shadcn/toaster";

export default function Main({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <NextUIProvider>
      <div
        className={`flex flex-col items-center  max-h-screen min-h-screen overflow-hidden text-foreground bg-background ${
          isDark ? "dark" : ""
        }`}
      >
        <Navbar />
        <div
          className={`flex flex-row h-[calc(100vh-80px)] ${
            isDark ? "dark" : ""
          } w-[90vw]`}
        >
          <Sidebar isDark={isDark} />
          <ScrollArea className="w-full">{children}</ScrollArea>
        </div>
      </div>
      <Toaster />
    </NextUIProvider>
  );
}
