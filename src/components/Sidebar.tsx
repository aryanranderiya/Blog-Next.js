"use client";

import Vercel from "@/components/Vercel.png";
import GithubIcon from "@/components/github.webp";
import { AnnouncementIcon, CloseIcon, FeatherIcon } from "@/components/icons";
import Nextjs from "@/components/nextjs.svg";
import { useTheme } from "@/contexts/ThemeContext";
import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import Image from "next/image";
import { ScrollArea } from "./shadcn/scroll-area";
import { SidebarItem } from "./SidebarItem";
// import { useTheme } from "@/contexts/ThemeContext";
import useSWR from "swr";

interface Item {
  id: number;
  key: string;
  label: string;
  href: string;
}

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

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());

export default function Sidebar() {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/titles`
  // );

  // const postTitles: { id: string; title: string }[] = await response
  //   .json()
  //   .catch(() => ({
  //     data: { error: "An unknown error occurred" },
  //   }));
  const { data, error } = useSWR("/api/posts/titles", fetcher);

  if (!data)
    return (
      <div className="flex w-[300px] pb-[90px] min-w-[300px] border-r-1 border-foreground-200 p-[1em] flex-col bg-background text-foreground">
        Loading...
      </div>
    );
  if (error) return <div>Failed to load</div>;

  const { isDark } = useTheme();

  return (
    <div className="flex w-[300px] pb-[90px] min-w-[300px] border-r-1 border-foreground-200 p-[1em] flex-col bg-background text-foreground">
      <ScrollArea>
        <Accordion
          showDivider={false}
          isCompact
          selectionMode="multiple"
          defaultExpandedKeys={["1", "2"]}
          disallowEmptySelection
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title={<span className="font-semibold">Getting Started</span>}
            startContent={<AnnouncementIcon color="#00bbff" width={18} />}
          >
            {items.map((item, index) => (
              <SidebarItem label={item.label} href={item.href} key={index} />
            ))}
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title={<span className="font-semibold">Posts</span>}
            startContent={<FeatherIcon color="#00bbff" width={18} />}
          >
            {data.length !== 0 ? (
              data.map(
                (item: { title: string; postID: string }, index: number) => (
                  <SidebarItem
                    label={item.title}
                    href={"/" + item.postID}
                    key={index}
                  />
                )
              )
            ) : (
              <div className="flex gap-1">
                <CloseIcon color="#A1AECE" width={19} />
                <span className="text-foreground-500">No Posts found</span>
              </div>
            )}
          </AccordionItem>
        </Accordion>

        <div className="flex w-full gap-1 items-center mt-6 flex-col">
          <Chip
            variant="flat"
            className="cursor-default"
            color="primary"
            startContent={
              <Image
                src={GithubIcon}
                width={20}
                height={20}
                className={(isDark ? "invert" : "") + " transition-all"}
                alt="Picture of the author"
              />
            }
          >
            Built by Aryan Randeriya
          </Chip>
          <Chip
            className="cursor-default"
            variant="flat"
            color="default"
            startContent={
              <Image
                src={Nextjs}
                width={17}
                height={17}
                className={(isDark ? "invert" : "") + " transition-all"}
                alt="Picture of the author"
              />
            }
            endContent={
              <Image
                src={Vercel}
                width={17}
                height={17}
                className={(isDark ? "invert" : "") + " transition-all"}
                alt="Picture of the author"
              />
            }
          >
            Next.js | Vercel
          </Chip>
          {/*  using Next.js */}
        </div>
      </ScrollArea>
    </div>
  );
}
