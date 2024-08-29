"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";

export default function Main({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  return (
    <NextUIProvider>
      <Navbar />
      <div
        className={`flex items-center justify-center bg-background ${
          isDark ? "dark" : ""
        }`}
      >
        <div
          className={`flex flex-row h-screen ${
            isDark ? "dark" : ""
          } bg-background text-foreground max-h-screen min-h-screen w-[90vw]`}
        >
          <Sidebar />
          <ScrollArea className="w-full">{children}</ScrollArea>
        </div>
      </div>
    </NextUIProvider>
  );
}
