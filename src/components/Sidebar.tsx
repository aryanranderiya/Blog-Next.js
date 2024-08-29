"use client";

import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import { ArrowUpRight, AnnouncementIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import GithubIcon from "@/components/github.webp";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface Item {
  id: number;
  key: string;
  label: string;
  href: string;
}

export function SidebarItem({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsActive(pathname === href);
    console.log(href, pathname);
  }, [pathname]);

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
      onClick={() => router.push(href)}
      onMouseOut={HandleMouseOut}
    >
      <span
        className={`${
          isHovered || isActive ? "text-[#00bbff]" : "text-foreground-500"
        } transition-all text-sm ${isActive ? "font-semibold" : ""}`}
      >
        {label}
      </span>
      <ArrowUpRight
        color={isHovered || isActive ? "#00bbff" : "white"}
        width={18}
        className={`transition-all ${
          isHovered || isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }`}
      />
    </div>
  );
}

export default function Sidebar() {
  const items: Item[] = [
    {
      id: 1,
      key: "introduction",
      label: "Introduction",
      href: "/",
    },
    {
      id: 2,
      key: "allposts",
      label: "All Posts",
      href: "/allposts",
    },
  ];

  return (
    <div className="flex h-screen w-[300px]  min-w-[300px] border-r-1 border-foreground-200 p-[1em] flex-col">
      <Accordion
        showDivider={false}
        isCompact
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2"]}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={<span className="font-semibold">Getting Started</span>}
          startContent={<AnnouncementIcon color="#00bbff" width={18} />}
        >
          {items.map((item) => (
            <SidebarItem label={item.label} href={item.href} />
          ))}
        </AccordionItem>
        {/* <AccordionItem
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
        </AccordionItem> */}
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
