"use client";

import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import {
  ArrowUpRight,
  AnnouncementIcon,
  FeatherIcon,
} from "@/components/icons";
import { useEffect, useState } from "react";
import GithubIcon from "@/components/github.webp";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ScrollArea } from "./shadcn/scroll-area";

interface Item {
  id: number;
  key: string;
  label: string;
  href: string;
}

interface BlogPost {
  key: string;
  label: string;
}

export function SidebarItem({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname]);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex justify-between py-[5px] cursor-pointer"
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
        color={isHovered || isActive ? "#00bbff" : "foreground"}
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

  const posts: BlogPost[] = [
    {
      key: "blog1",
      label: "Introduction to TypeScript",
    },
    {
      key: "blog2",
      label: "Understanding React Hooks",
    },
    {
      key: "blog3",
      label: "A Guide to Next.js API Routes",
    },
    {
      key: "blog4",
      label: "Best Practices for CSS-in-JS",
    },
    {
      key: "blog5",
      label: "Exploring the MERN Stack",
    },
    {
      key: "blog6",
      label: "Implementing Authentication in Express",
    },
    {
      key: "blog7",
      label: "Building Responsive Layouts with Tailwind CSS",
    },
    {
      key: "blog8",
      label: "Optimizing React Performance",
    },
    {
      key: "blog9",
      label: "Introduction to GraphQL",
    },
    {
      key: "blog10",
      label: "Deploying Your Next.js App to Vercel",
    },
    {
      key: "blog11",
      label: "Managing State with Redux",
    },
    {
      key: "blog12",
      label: "Creating Custom Hooks in React",
    },
    {
      key: "blog13",
      label: "Understanding JavaScript Closures",
    },
    {
      key: "blog14",
      label: "Building RESTful APIs with FastAPI",
    },
    {
      key: "blog15",
      label: "Using Docker for Development",
    },
    {
      key: "blog16",
      label: "Introduction to Serverless Architecture",
    },
    {
      key: "blog17",
      label: "Handling Errors in Express.js",
    },
    {
      key: "blog18",
      label: "Testing React Components with Jest",
    },
    {
      key: "blog19",
      label: "Exploring MongoDB Aggregation Framework",
    },
    {
      key: "blog20",
      label: "Creating a CI/CD Pipeline with GitHub Actions",
    },
  ];

  return (
    <div className="flex w-[300px] pb-[90px] min-w-[300px] border-r-1 border-foreground-200 p-[1em] flex-col bg-background text-foreground ">
      <ScrollArea>
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

          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title={<span className="font-semibold">Posts</span>}
            startContent={<FeatherIcon color="#00bbff" width={18} />}
          >
            {posts.map((item) => (
              <SidebarItem label={item.label} href={"/" + item.key} />
            ))}
            {posts.map((item) => (
              <SidebarItem label={item.label} href={"/" + item.key} />
            ))}
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
      </ScrollArea>
    </div>
  );
}
