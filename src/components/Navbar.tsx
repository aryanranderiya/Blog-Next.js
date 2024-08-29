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

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`w-screen p-[1em] px-[1.5em] flex justify-between items-center border-b-1 border-foreground-200 ${
        isDark ? "dark" : ""
      } bg-background text-foreground `}
    >
      <div className="font-bold flex items-center gap-3">
        <img
          src="https://github.com/aryanranderiya.png"
          alt="Blog Logo"
          className="w-[30px]"
        />
        Aryan's Blog
      </div>

      <div className="flex gap-3 items-center">
        <HomeIcon color="foreground" width={35} />
        <BlogIcon color="foreground" width={35} />

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
              <MoonIcon className={className} width={17} />
            ) : (
              <SunIcon className={className} width={17} />
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
  );
}
