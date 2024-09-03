"use client";

import { Chip } from "@nextui-org/react";
import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { ScrollArea } from "./shadcn/scroll-area";
import Image from "next/image";
import Link from "next/link";

export interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  content: string;
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
      className="flex w-[300px] h-[375px] bg-foreground-100 rounded-xl p-[10px] relative flex-col cursor-pointer hover:-tran  ate-y-2 hover:bg-foreground-200 transition-all"
      onMouseOut={handleMouseOut}
      href={post.id.toString()}
      onMouseOver={handleMouseOver}
    >
      <Image
        src={post.image}
        alt={post.title}
        height={150}
        width={500}
        className="w-full h-[150px] object-cover rounded-xl bg-foreground-300"
      />

      <Chip
        className={`absolute right-3 top-[130px] transition-all ${
          isHovered ? "opacity-100" : "opacity-0"
        } `}
        color="primary"
        size="sm"
      >
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-[1.1em] text-background">
            View Post
          </span>
          <ArrowUpRight color="foreground" width={17} />
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
        <ScrollArea>
          <span className="text-sm text-foreground-500 flex flex-wrap">
            {post.excerpt}
          </span>
        </ScrollArea>
      </div>
    </Link>
  );
}
