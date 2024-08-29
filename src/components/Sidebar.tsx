"use client";

import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
  Chip,
} from "@nextui-org/react";
import {
  ArrowUpRight,
  FeatherIcon,
  AnnouncementIcon,
} from "@/components/icons";
import { useState } from "react";
import GithubIcon from "@/components/github.webp";
import Image from "next/image";

interface Item {
  id: number;
  key: string;
  label: string;
}

export function SidebarItem({ label }: { label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex justify-between px-3 py-[5px]"
      onMouseOver={HandleMouseOver}
      onMouseOut={HandleMouseOut}
    >
      {label}
      <ArrowUpRight
        color={isHovered ? "#00bbff" : "white"}
        width={18}
        className={`transition-all ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      />
    </div>
  );
}

export default function Sidebar() {
  const items: Item[] = [
    {
      id: 1,
      key: "new",
      label: "New file",
    },
    {
      id: 2,
      key: "copy",
      label: "Copy link",
    },
    {
      id: 3,
      key: "edit",
      label: "Edit file",
    },
  ];

  return (
    <div className="flex h-screen w-[300px] border-r-1 border-foreground-300 p-[1em] flex-col">
      <Accordion
        showDivider={false}
        isCompact
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2"]}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={<span className="font-semibold">Introduction</span>}
          startContent={<AnnouncementIcon color="#00bbff" width={18} />}
        >
          <Listbox
            items={items}
            aria-label="Dynamic Actions"
            selectionMode="single"
            hideSelectedIcon
            variant="flat"
            color="primary"
          >
            {(item: Item) => (
              <ListboxItem
                key={item.key}
                className="p-0"
                classNames={{ wrapper: "text-red" }}
              >
                <SidebarItem label={item.label} />
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title={<span className="font-semibold">Posts</span>}
          startContent={<FeatherIcon color="#00bbff" width={18} />}
        >
          <Listbox
            items={items}
            aria-label="Dynamic Actions"
            selectionMode="single"
            hideSelectedIcon
            variant="flat"
            color="primary"
          >
            {(item: Item) => (
              <ListboxItem
                key={item.key}
                className="p-0"
                classNames={{ wrapper: "text-red" }}
              >
                <SidebarItem label={item.label} />
              </ListboxItem>
            )}
          </Listbox>
        </AccordionItem>
      </Accordion>

      <div className="flex w-full justify-center mt-6">
        <Chip
          className=""
          variant="flat"
          color="primary"
          startContent={
            <Image
              src={GithubIcon}
              width={20}
              height={20}
              className="invert"
              alt="Picture of the author"
            />
          }
        >
          Built by Aryan R. using Next.js
        </Chip>
      </div>
    </div>
  );
}
