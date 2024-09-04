"use client";
import { ArrowUpRight } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SidebarItem({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Link
      className="flex justify-between py-[6px] pr-[13px] cursor-pointer"
      onMouseOver={HandleMouseOver}
      href={href}
      onMouseOut={HandleMouseOut}
    >
      <span
        className={`${
          isHovered || isActive ? "text-[#00bbff]" : "text-foreground-500"
        } transition-colors text-md ${isActive ? "font-semibold" : ""}`}
      >
        {label}
      </span>
      <ArrowUpRight
        color={isHovered || isActive ? "#00bbff" : "foreground"}
        width={18}
        className={`transition-all ${
          isHovered || isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }`}
      />
    </Link>
  );
}
