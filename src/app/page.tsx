"use client";
import BlogCard from "@/components/BlogCard";
import { ArrowUpRight } from "@/components/icons";
import { Chip } from "@nextui-org/react";
import { useState } from "react";

function HoveredChip({
  text,
  color,
  bolded,
}: {
  text: string;
  color: "primary" | "default";
  bolded: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Chip
      variant={isHovered ? "shadow" : "flat"}
      color={color}
      size="lg"
      className="cursor-pointer transition-all"
      endContent={
        <ArrowUpRight
          width={18}
          color={
            isHovered ? (color === "default" ? "#00bbff" : "black") : "white"
          }
          className={`${
            isHovered ? "-translate-y-[3px]" : ""
          } transition-transform`}
        />
      }
      onMouseOut={HandleMouseOut}
      onMouseOver={HandleMouseOver}
    >
      <div className={bolded ? "font-semibold" : ""}>{text}</div>
    </Chip>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 px-24 py-20 overflow-x-scroll">
      <div className="font-semibold text-4xl flex gap-3 items-center flex-wrap">
        <span className="text-nowrap">Welcome to my Blog!</span>
        <img
          src="https://github.com/aryanranderiya.png"
          alt="Aryan randeriya image"
          className="h-[32px] w-[32px]"
        />
        <span className="text-nowrap">I'm Aryan Randeriya,</span>
        <span className="text-nowrap">a Software Developer from India.</span>
      </div>

      <div className="flex gap-2">
        <HoveredChip text={"View my Portfolio"} color="primary" bolded={true} />
        <HoveredChip text={"LinkedIn"} color="default" bolded={false} />
        <HoveredChip text={"GitHub"} color="default" bolded={false} />
      </div>

      <FeaturedPosts />
      <LatestPosts />
    </main>
  );
}

function FeaturedPosts() {
  return (
    <div className="flex flex-col gap-2 pt-16 min-h-fit">
      <span className="font-semibold text-3xl">Featured Posts</span>
      <div className="flex gap-3 flex-wrap">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}

function LatestPosts() {
  return (
    <div className="flex flex-col gap-3 pt-8 min-h-fit">
      <span className="font-semibold text-3xl">Latest Posts</span>
      <div className="flex gap-3 flex-wrap">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
