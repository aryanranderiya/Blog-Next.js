"use client";
import BlogCard from "@/components/BlogCard";
// import { HoveredChip } from "../page";
import { Chip } from "@nextui-org/react";
import { useState } from "react";

function SelectChip({ index }: { index: any }) {
  const [active, setActive] = useState(false);

  return (
    <Chip
      key={index}
      variant={active ? "faded" : "bordered"}
      color="primary"
      className="cursor-pointer"
      onClick={() => setActive((prev) => !prev)}
    >
      Tag {index + 1}
    </Chip>
  );
}

export default function AllPosts() {
  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 px-24 pt-20 pb-24">
      <div className="font-semibold text-4xl flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap">All Posts</span>

        <div className="flex gap-1 flex-wrap">
          {new Array(10).fill(null).map((_, index) => (
            <SelectChip index={index} />
          ))}
        </div>

        <div className="flex gap-3 flex-wrap pt-4">
          {new Array(20).fill(null).map((_, index) => (
            <BlogCard />
          ))}
        </div>
      </div>
    </main>
  );
}
