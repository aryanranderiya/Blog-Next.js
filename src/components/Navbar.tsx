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

export default function Navbar() {
  return (
    <div className="w-screen p-[1em] px-[1.5em] flex justify-between items-center border-b-1 border-foreground-700">
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
          size="sm"
          className="dark"
          placeholder="Search"
          startContent={<Search01Icon color="white" width={"20"} />}
        />
      </div>
    </div>
  );
}
