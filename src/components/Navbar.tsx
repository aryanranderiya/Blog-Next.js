"use client";

import { Input } from "@nextui-org/react";
import {
  Search01Icon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  BlogIcon,
} from "@/components/icons";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EnterIcon } from "@/components/icons";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const prevQueryRef = useRef("");
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && searchQuery.trim().length !== 0) {
      event.preventDefault();

      const searchParams = new URLSearchParams({
        query: searchQuery,
      }).toString();

      router.push(`/search?${searchParams}`);
    } else if (searchQuery.trim().length === 0) router.push(`/allposts`);
  };

  useEffect(() => {
    if (
      prevQueryRef.current.trim().length > 0 &&
      searchQuery.trim().length === 0
    ) {
      router.push(`/allposts`);
    }
    prevQueryRef.current = searchQuery;
  }, [searchQuery, router]);

  return (
    <div
      className={`flex justify-center w-screen ${
        isDark ? "dark" : ""
      } bg-background border-b-1 border-foreground-200`}
    >
      <div
        className={`w-[90vw] py-[1em] px-[1.5em] flex justify-between items-center bg-background text-foreground `}
      >
        <Link href={"/"} className="font-bold flex items-center gap-3">
          <Image
            src="https://github.com/aryanranderiya.png"
            alt="Blog Logo"
            className="w-[30px]"
            width={30}
            height={30}
          />
          Aryan&apos;s Blog
        </Link>

        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <HomeIcon
              color="foreground"
              width={35}
              className="cursor-pointer"
            />
          </Link>
          <Link href={"/allposts"}>
            <BlogIcon
              color="foreground"
              width={35}
              className="cursor-pointer"
            />
          </Link>

          <Switch
            defaultSelected
            color="primary"
            onValueChange={toggleTheme}
            thumbIcon={({
              isSelected,
              className,
            }: {
              isSelected: boolean;
              className: string;
            }) =>
              isSelected ? (
                <MoonIcon className={className} width={17} fill="foreground" />
              ) : (
                <SunIcon className={className} width={17} fill="foreground" />
              )
            }
          />
          <Input
            radius="full"
            variant="faded"
            placeholder="Search"
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Search01Icon color="foreground" width={"20"} />}
            onKeyDown={handleKeyDown}
            isClearable
          />
        </div>
      </div>
    </div>
  );
}
