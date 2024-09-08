"use client";

import { Chip } from "@nextui-org/react";
import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { ScrollArea } from "./shadcn/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ScrollShadow } from "@nextui-org/react";

export interface Post {
  id: number;
  postID: number;
  title: string;
  date: string;
  excerpt: string;
  tags: string;
  image: string;
  content: string;
  estimated_read_time: string;
}

export default function BlogCard({ post }: { post: Post }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Link
      className="flex sm:w-[300px] w-full min-h-[390px] max-h-[390px] bg-foreground-100 rounded-xl p-[10px] relative flex-col cursor-pointer hover:-tran  ate-y-2 hover:bg-foreground-200 transition-all"
      onMouseOut={handleMouseOut}
      href={post?.postID?.toString() || "/allposts"}
      onMouseOver={handleMouseOver}
    >
      <div className="min-h-[130px] max-h-[130px] overflow-hidden  rounded-xl bg-foreground-300 ">
        <Image
          src={post.image}
          alt={post.title}
          height={150}
          width={500}
          className={`w-full min-h-[130px] max-h-[130px] object-cover transition-all ${
            isHovered ? "scale-125" : ""
          }`}
        />
      </div>

      <Chip
        className={`absolute right-[12px] cursor-default top-[113px] transition-all ${
          isHovered ? "opacity-100" : "opacity-0"
        } `}
        color="primary"
        size="sm"
      >
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-[1.1em] text-background">
            View Post
          </span>
          <ArrowUpRight color="background" width={17} />
        </div>
      </Chip>

      <div className="py-[0.5em] px-[0.3em] flex flex-col gap-1 overflow-hidden">
        <span className="text-xs text-foreground-500 pt-1">{post.date}</span>
        <div className="flex flex-wrap py-1 gap-1">
          {Array.isArray(post.tags)
            ? post.tags
            : JSON.parse(post.tags).map((tag: string) => (
                <Chip key={tag} size="sm" variant="flat" color="primary">
                  {tag}
                </Chip>
              ))}
        </div>
        <span className="text-xl font-semibold pt-1">{post.title}</span>
        <ScrollShadow
          hideScrollBar
          className="min-h-[65px] max-h-[65px]"
          size={25}
        >
          {/* <ScrollArea > */}
          <span className="text-sm text-foreground-500 flex flex-wrap">
            {post.excerpt}
          </span>
          {/* </ScrollArea> */}
        </ScrollShadow>
      </div>
      {/* <div
        className="mt-auto font-bold text-background
      z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover"
      >
        Read Post
      </div> */}
      <div
        className="flex w-full justify-center text-xs font-semibold min-h-8 max-h-8 items-center bg-primary rounded-small text-background
      mt-auto hover:bg-[#63d6ff] transition-all hover:-translate-y-1
      "
      >
        Read Post
      </div>
    </Link>
  );
}
