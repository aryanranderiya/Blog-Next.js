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

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`flex justify-center w-screen ${
        isDark ? "dark" : ""
      } bg-background border-b-1 border-foreground-200`}
    >
      <div
        className={`w-[90vw] p-[1em] px-[1.5em] flex justify-between items-center bg-background text-foreground `}
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

        <div className="flex gap-3 items-center">
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
            startContent={<Search01Icon color="foreground" width={"20"} />}
          />
        </div>
      </div>
    </div>
  );
}
