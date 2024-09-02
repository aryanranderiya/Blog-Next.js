"use client";
import BlogCard from "@/components/BlogCard";
// import { HoveredChip } from "../page";
import { Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/components/BlogCard";

function SelectChip({ title, posts }: { title: string; posts: Post[] }) {
  const [active, setActive] = useState(false);

  return (
    <Chip
      variant={active ? "faded" : "bordered"}
      color="primary"
      className="cursor-pointer"
      onClick={() => setActive((prev) => !prev)}
    >
      {title}
    </Chip>
  );
}

export default async function AllPosts() {
  const [tags, setTags] = useState<Set<string>>(new Set());

  const addTag = (tag: string) => {
    setTags((prevTags) => new Set(prevTags).add(tag));
  };

  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const posts = await req.json();

  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 px-24 pt-20 pb-24">
      <div className="flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap font-semibold text-4xl">All Posts</span>

        <div className="flex gap-1 flex-wrap">
          {Array.from(tags).map((tag: string, index: number) => (
            <SelectChip title={tag} posts={posts} key={index} />
          ))}
        </div>

        <div className="flex gap-3 flex-wrap pt-4">
          {posts.map((post: Post, index: number) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
