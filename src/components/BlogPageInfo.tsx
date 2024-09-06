"use client";

import { Post } from "./BlogCard";
import Image from "next/image";
import ContentsSidebar from "@/components/ContentsSidebar";
import { Chip } from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { Eye, Heart } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { useRef } from "react";

export default function BlogPageInfo({ post }: { post: Post }) {
  const startComponentRef = useRef(null);
  return (
    <div
      className="flex flex-row px-24 pt-10 justify-between"
      ref={startComponentRef}
    >
      <main className="flex h-fit flex-col gap-7 relative w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={"https://github.com/aryanranderiya.png"}
                alt="Profile Picture"
                width={40}
                height={40}
              />

              <div className="flex flex-col">
                <span className="text-md font-semibold">Aryan Randeriya</span>
                <div className="flex gap-2">
                  <span className="text-foreground-500 text-sm">
                    {post.date}
                  </span>
                  <span className="text-foreground text-sm">/</span>
                  <span className="text-foreground-400 text-sm">
                    Reading Time:&nbsp;
                    {post.estimated_read_time}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1 text-lg items-center">
                <Eye />
                <span className="text-gray-500">100</span>
              </div>

              <div className="flex gap-1 text-lg items-center">
                <Heart fill="red" color="red" />
                <span className="text-gray-500">100</span>
              </div>
            </div>
          </div>

          <div className="flex gap-1 flex-wrap">
            {!!post.tags &&
              JSON.parse(post.tags).map((tag: string) => (
                <Chip
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="cursor-default"
                >
                  {tag}
                </Chip>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1>{post.title}</h1>
          <span className="text-lg text-foreground-600">{post.excerpt}</span>
        </div>

        <div className="flex flex-col markdown-container">
          <Markdown rehypePlugins={[rehypeSlug]}>{post.content}</Markdown>
        </div>
        <div className="pt-10 pb-7 flex justify-end w-full">
          <ScrollToTop scrollTriggerRef={startComponentRef} />
        </div>
      </main>
      <ContentsSidebar post={post} />
    </div>
  );
}
