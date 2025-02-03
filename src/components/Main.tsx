"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/shadcn/toaster";
import { useTheme } from "@/contexts/ThemeContext";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useRef, useState } from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const pathname = usePathname();
  console.log(pathname);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [translatePercent, setTranslatePercent] = useState(100);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const swipeThreshold = 1;

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
      !(
        Math.abs(horizontalDistance) > Math.abs(verticalDistance) &&
        Math.abs(horizontalDistance) > swipeThreshold
      )
    )
      return;

    const percentage = Math.max(
      0,
      Math.min((horizontalDistance / sidebarWidth) * 100, 100)
    );

    const finalPercentage = percentage < 10 ? 0 : 100;
    setTranslatePercent(finalPercentage);
  };

  const onTouchEnd = () => {
    if (touchStart === null || !sidebarRef.current) return;
    const finalPercentage = translatePercent < 10 ? 0 : 100;
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
        className={`flex justify-center h-screen w-full text-foreground bg-background ${
          isDark ? "dark" : ""
        }`}
      >
        {/* <div className={`flex flex-col items-center overflow-hidden `}> */}
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={translatePercent === 100}
        />
        <div
          className={`flex sm:pt-[65px] pt-[54px] sm:w-[calc(80vw)] w-screen ${
            isDark ? "dark" : ""
          } `}
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

          <div
            className={`${
              pathname == "/allposts" ||
              pathname == "/" ||
              pathname.startsWith("/search")
                ? "overflow-y-auto"
                : ""
            } overflow-x-hidden`}
          >
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </NextUIProvider>
  );
}
