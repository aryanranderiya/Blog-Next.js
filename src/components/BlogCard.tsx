"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Chip, ScrollShadow } from "@nextui-org/react";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { Tooltip } from "@nextui-org/react";
export interface Post {
  id: number;
  postID: string;
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

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <Card
      className="flex w-full bg-foreground-100 rounded-xl justify-start items-center gap-2 relative flex-row cursor-pointer hover:-translate-y-1 hover:bg-foreground-200 transition-all overflow-hidden border-none"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link
        href={post?.postID?.toString() || "/allposts"}
        prefetch={true}
        className="flex p-4 gap-4"
      >
        <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg ">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className={`transition-transform duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <CardContent className="p-0">
            <h2 className="text-lg font-semibold line-clamp-2 mb-1">
              {post.title}
            </h2>
            <ScrollShadow className="max-h-[60px]" hideScrollBar>
              <p className="text-md text-muted-foreground mb-2">
                {post.excerpt}
              </p>
            </ScrollShadow>
            <div className="flex sm:items-center sm:flex-row flex-col sm:gap-3 gap-0 sm:mb-3 mb-2">
              <Tooltip content={post.date} showArrow size="sm" delay={300}>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              </Tooltip>

              <Tooltip
                content="Estimated read time"
                showArrow
                size="sm"
                delay={300}
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {post.estimated_read_time}
                  </span>
                </div>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {(Array.isArray(post.tags)
                ? post.tags
                : JSON.parse(post.tags)
              ).map((tag: string) => (
                <Chip key={tag} size="sm" variant="flat" color="primary">
                  {tag}
                </Chip>
              ))}
            </div>
          </CardContent>
        </div>
      </Link>
      <Chip
        className={`absolute bottom-2 right-1 text-primary-foreground rounded-full p-2 shadow-lg transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        color="primary"
      >
        <div className="flex flex-row flex-nowrap justify-center items-center font-semibold gap-2">
          <span className="text-sm">View post</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </Chip>
    </Card>
  );
}
