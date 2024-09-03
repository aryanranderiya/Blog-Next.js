"use client";
import { Post } from "@/components/BlogCard";
import BlogCard from "@/components/BlogCard";
import { useSearchParams } from "next/navigation";

export async function SearchedPosts({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  // const result = words.filter((word) => word.length > 6);

  return (
    <>
      {posts.map((post: Post, index: number) => (
        <BlogCard post={post} key={index} />
      ))}
    </>
  );
}
