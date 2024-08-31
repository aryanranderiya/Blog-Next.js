"use client";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/components/BlogCard";
import HoveredChip from "@/components/HoveredChip";

export default function Home() {
  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 px-24 pt-20 pb-24">
      <div className="font-semibold text-4xl flex gap-3 items-center flex-wrap">
        <span className="text-nowrap">Welcome to my Blog!</span>

        <Image
          src="https://github.com/aryanranderiya.png"
          alt="Aryan randeriya image"
          width={32}
          height={32}
        />
        <span className="text-nowrap">I'm Aryan Randeriya,</span>
        <span className="text-nowrap">
          a Software Developer & Designer from India.
        </span>
      </div>

      <div className="flex gap-2">
        <a href="https://aryanranderiya.com" target="_blank">
          <HoveredChip
            text={"View my Portfolio"}
            color="primary"
            bolded={true}
          />
        </a>

        <a href="https://linkedin.com/in/aryanranderiya" target="_blank">
          <HoveredChip text={"LinkedIn"} color="default" bolded={false} />
        </a>
        <a href="https://github.com/aryanranderiya" target="_blank">
          <HoveredChip text={"GitHub"} color="default" bolded={false} />
        </a>
      </div>

      <FeaturedPosts />
      <LatestPosts />
    </main>
  );
}

function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 pt-16 min-h-fit">
      <span className="font-semibold text-3xl">Featured Posts</span>
      <div className="flex gap-3 flex-wrap pt-4">
        {posts.length > 0 ? (
          posts.map((post, index) => <BlogCard post={post} key={index} />)
        ) : (
          <span className="text-foreground-400">No Posts Found</span>
        )}
      </div>
    </div>
  );
}

function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 pt-8 min-h-fit">
      <span className="font-semibold text-3xl">Latest Posts</span>
      <div className="flex gap-3 flex-wrap pt-4">
        {posts.length > 0 ? (
          posts.map((post, index) => <BlogCard post={post} key={index} />)
        ) : (
          <span className="text-foreground-400">No Posts Found</span>
        )}
      </div>
    </div>
  );
}
