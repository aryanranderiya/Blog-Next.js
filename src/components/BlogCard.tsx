"use client";

import { Chip, ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDate } from "./BlogPageInfo";
import { ArrowUpRight } from "./icons";

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
  likes: number;
  page_views: number;
}

export default function BlogCard({ post }: { post: Post }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Link
      className="flex w-full bg-foreground-100 rounded-xl p-[10px] justify-start sm:items-center items-stretch gap-2 relative flex-row cursor-pointer hover:-translate-y-2 hover:bg-foreground-200 transition-all"
      onMouseOut={handleMouseOut}
      href={post?.postID?.toString() || "/allposts"}
      onMouseOver={handleMouseOver}
      prefetch={true}
    >
      <div className="min-w-[100px] max-w-[100px] sm:min-w-[150px] sm:max-w-[150px] aspect-square overflow-hidden  rounded-xl bg-foreground-300 ">
        <Image
          src={post.image}
          alt={post.title}
          height={150}
          width={150}
          className={`sm:w-[150px] sm:min-w-[150px] sm:max-w-[150px] w-[100px] min-w-[100px] max-w-[100px] h-full aspect-square object-cover transition-all ${
            isHovered ? "scale-110" : ""
          }`}
        />
      </div>

      <div>
        <Chip
          className={`absolute right-[12px] cursor-default top-[12px] sm:visible hidden transition-all ${
            isHovered ? "opacity-100" : "opacity-0"
          } `}
          color="primary"
          size="lg"
        >
          <div className="flex gap-1 items-center">
            <span className="font-semibold text-[1.1em] text-background">
              View Post
            </span>
            <ArrowUpRight color="background" width={17} />
          </div>
        </Chip>

        <div className="py-[0.5em] px-[0.3em] flex flex-col gap-1 overflow-hidden h-full">
          <span className="sm:text-2xl text-xl font-semibold">
            {post.title}
          </span>

          <span className="text-xs text-foreground-500">
            {formatDate(post.date)}
          </span>

          <div className="flex flex-wrap py-1 gap-1">
            {Array.isArray(post.tags)
              ? post.tags
              : JSON.parse(post.tags).map((tag: string) => (
                  <Chip key={tag} size="sm" variant="flat" color="primary">
                    {tag}
                  </Chip>
                ))}
          </div>

          <ScrollShadow hideScrollBar className=" max-h-[65px]" size={25}>
            <span className="sm:text-md text-sm text-foreground-500 flex flex-wrap">
              {post.excerpt}
            </span>
          </ScrollShadow>
        </div>
      </div>
    </Link>
  );
}
