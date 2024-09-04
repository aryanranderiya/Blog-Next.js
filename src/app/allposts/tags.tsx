"use client";

import { useEffect, useState } from "react";
import { Post } from "@/components/BlogCard";
import { Chip } from "@nextui-org/react";

function SelectChip({ title, posts }: { title: string; posts: Post[] }) {
  const [active, setActive] = useState(false);

  return (
    <Chip
      variant={active ? "faded" : "bordered"}
      color="primary"
      className="cursor-pointer select-none"
      onClick={() => setActive((prev) => !prev)}
    >
      {title}
    </Chip>
  );
}

export function Tags({ posts }: { posts: Post[] }) {
  const [tags, setTags] = useState<Set<string>>(new Set());

  const addTag = (tag: string) => {
    setTags((prevTags) => new Set(prevTags).add(tag));
  };

  useEffect(() => {
    posts.forEach((post) => {
      Array.isArray(post.tags)
        ? post.tags
        : JSON.parse(post.tags).forEach((tag: string) => {
            addTag(tag);
          });
    });
  }, [posts]);

  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from(tags).map((tag: string, index: number) => (
        <SelectChip title={tag} posts={posts} key={index} />
      ))}
    </div>
  );
}
