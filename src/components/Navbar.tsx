"use client";

import {
  BlogIcon,
  HomeIcon,
  MoonIcon,
  Search01Icon,
  SunIcon,
} from "@/components/icons";
import { useTheme } from "@/contexts/ThemeContext";
import { Button, Input } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: any;
  isSidebarOpen: boolean;
}) {
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
        className={`sm:w-[90vw] w-screen sm:py-[1em] sm:px-[1.5em] px-[1em] py-[0.7em] flex justify-between items-center bg-background text-foreground `}
      >
        <Link href={"/"} className="font-bold flex items-center gap-3 ">
          <Image
            src="https://github.com/aryanranderiya.png"
            alt="Blog Logo"
            className="w-[30px]"
            width={30}
            height={30}
          />
          <span className="sm:text-lg text-sm">Aryan&apos;s Blog</span>
        </Link>

        <div className="flex items-center">
          <div className="sm:flex hidden gap-2 items-center">
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
                  <MoonIcon
                    className={className}
                    width={17}
                    fill="foreground"
                  />
                ) : (
                  <SunIcon className={className} width={17} fill="foreground" />
                )
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              radius="full"
              variant="faded"
              placeholder="Search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search01Icon color="foreground" width={"20"} />}
              onKeyDown={handleKeyDown}
              isClearable
              size="sm"
              className="max-w-[130px] sm:max-w-xs"
            />

            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setIsSidebarOpen((prev: boolean) => !prev)}
              className="sm:hidden flex"
            >
              {isSidebarOpen ? (
                <PanelRightClose color="gray" width={35} />
              ) : (
                <PanelRightOpen color="gray" width={35} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
