"use client";

import GithubIcon from "@/components/github.webp";
import {
  AnnouncementIcon,
  BlogIcon,
  CloseIcon,
  FeatherIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";
import Nextjs from "@/components/nextjs.svg";
import Vercel from "@/components/Vercel.png";
import { useTheme } from "@/contexts/ThemeContext";
import { Accordion, AccordionItem, Chip, Switch } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { ScrollArea } from "./shadcn/scroll-area";
import { SidebarItem } from "./SidebarItem";
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

export default function Sidebar({
  isDark,
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  isDark: any;
  setIsSidebarOpen: any;
  isSidebarOpen: boolean;
}) {
  const { data, error } = useSWR("/api/posts/titles", fetcher);
  const { toggleTheme } = useTheme();

  if (!data)
    return (
      <div className="flex w-[300px] pb-[90px] min-w-[300px] border-r-1 border-foreground-200 p-[1em] flex-col bg-background text-foreground">
        Loading...
      </div>
    );
  if (error) return <div>Failed to load</div>;

  return (
    <div
      className={`flex overflow-hidden sm:min-w-[300px] sm:w-[300px] sm:pb-[90px] sm:p-[1em] border-r-1 border-foreground-200 flex-col text-foreground 
      ${isSidebarOpen ? "w-0 p-0" : "min-w-[300px] w-[300px] p-[1em] "}`}
    >
      {/* <div className="w-full justify-end flex sm:hidden pb-5">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => setIsSidebarOpen((prev: boolean) => !prev)}
        >
          <PanelRightOpen color="gray" width={35} />
        </Button>
      </div> */}

      <div className="sm:hidden flex gap-2 items-center w-full justify-between pb-3 mb-3 border-b-1 border-b-foreground-300">
        <Link href={"/"}>
          <HomeIcon color="foreground" width={35} className="cursor-pointer" />
        </Link>
        <Link href={"/allposts"}>
          <BlogIcon color="foreground" width={35} className="cursor-pointer" />
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
      </div>

      <ScrollArea>
        <Accordion
          showDivider={false}
          isCompact
          selectionMode="multiple"
          defaultExpandedKeys={["1"]}
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

        <div className="flex w-full gap-2 items-center mt-6 flex-col">
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
            Built using Next.js | Vercel
          </Chip>
          {/*  using Next.js */}
        </div>
      </ScrollArea>
    </div>
  );
}
