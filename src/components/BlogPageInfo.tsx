"use client";

import { Post } from "./BlogCard";
import Image from "next/image";
import ContentsSidebar from "@/components/ContentsSidebar";
import { Chip } from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { Calendar, Clock4, Eye, Heart } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { useRef, useState } from "react";

export default function BlogPageInfo({ post }: { post: Post }) {
  const startComponentRef = useRef(null);
  const [contentsOpen, setContentsOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen h-fit sm:w-[calc(86vw-280px)] w-screen sm:gap-7 sm:px-24 sm:pr-0 sm:pt-20 sm:pb-24 p-[2em] flex-row"
      ref={startComponentRef}
    >
      <main
        className={`flex h-fit flex-col gap-7 relative w-full flex-grow transition-all ${
          contentsOpen ? "opacity-25" : "opacity-100"
        }`}
        onClick={() => setContentsOpen(false)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex sm:items-center items-start w-full justify-between flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-3 flex-1">
              <Image
                src={"https://github.com/aryanranderiya.png"}
                alt="Profile Picture"
                width={40}
                height={40}
              />

              <div className="flex flex-col">
                <span className="text-md font-semibold">Aryan Randeriya</span>
                <div className="flex sm:gap-2 sm:flex-row flex-col sm:items-center items-start">
                  <span className="text-foreground-500 text-sm flex items-center gap-1">
                    <Calendar width={17} />
                    {post?.date}
                  </span>
                  <span className="text-foreground text-sm sm:flex hidden">
                    /
                  </span>
                  <div className="text-foreground-400 text-sm flex items-center gap-1">
                    <Clock4 width={17} />
                    {post?.estimated_read_time}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
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
            {!!post?.tags &&
              JSON.parse(post.tags).map((tag: string, index: number) => (
                <Chip
                  key={index}
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
          <h1>{post?.title}</h1>
          <span className="text-lg text-foreground-600">{post?.excerpt}</span>
        </div>

        <div className="flex flex-col markdown-container">
          <Markdown rehypePlugins={[rehypeSlug]}>{post?.content}</Markdown>
        </div>
        <div className="pt-10 pb-7 flex justify-end w-full">
          <ScrollToTop scrollTriggerRef={startComponentRef} />
        </div>
      </main>

      <div className="sm:min-w-[280px] w-0">
        <ContentsSidebar
          post={post}
          contentsOpen={contentsOpen}
          setContentsOpen={setContentsOpen}
        />
      </div>
    </div>
  );
}
