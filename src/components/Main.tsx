"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Toaster } from "@/components/shadcn/toaster";
import { useTheme } from "@/contexts/ThemeContext";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { useState, useRef } from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [translatePercent, setTranslatePercent] = useState(100);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const swipeThreshold = 5;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || touchStartY === null || !sidebarRef.current)
      return;
    const touchEndX = e.targetTouches[0].clientX;
    const touchEndY = e.targetTouches[0].clientY;
    const sidebarWidth = sidebarRef.current.offsetWidth;
    const horizontalDistance = touchStart - touchEndX;
    const verticalDistance = touchStartY - touchEndY;
    if (
      Math.abs(horizontalDistance) > Math.abs(verticalDistance) &&
      Math.abs(horizontalDistance) > swipeThreshold
    ) {
      const percentage = Math.max(
        0,
        Math.min((horizontalDistance / sidebarWidth) * 100, 100)
      );

      const finalPercentage = percentage < 30 ? 0 : 100;
      setTranslatePercent(finalPercentage);
    }
  };

  const onTouchEnd = () => {
    if (touchStart === null || !sidebarRef.current) return;
    const finalPercentage = translatePercent < 30 ? 0 : 100;
    setTranslatePercent(finalPercentage);
    setTouchStart(null);
    setTouchStartY(null);
  };

  React.useEffect(() => {
    isSidebarOpen ? setTranslatePercent(100) : setTranslatePercent(0);
  }, [isSidebarOpen]);

  return (
    <NextUIProvider>
      <div
        className={`flex flex-col items-center min-h-[100dvh] overflow-hidden text-foreground bg-background ${
          isDark ? "dark" : ""
        }`}
      >
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={translatePercent === 100}
        />
        <div
          className={`flex flex-row h-[calc(100dvh-55px)] ${
            isDark ? "dark" : ""
          } sm:w-[90vw] w-screen`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Sidebar
            isDark={isDark}
            translateX={-translatePercent}
            ref={sidebarRef}
          />
          <div
            className={`bg-black w-screen h-screen z-[9] fixed top-0 left-0 bg-opacity-50 transition-all backdrop-blur-sm ${
              translatePercent === 100
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            onClick={() => setTranslatePercent(100)}
          />

          <ScrollArea onClick={() => setTranslatePercent(100)}>
            {children}
          </ScrollArea>
        </div>
      </div>
      <Toaster />
    </NextUIProvider>
  );
}
