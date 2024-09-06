"use client";
import { Post } from "@/components/BlogCard";
import BlogCard from "@/components/BlogCard";
import { useSearchParams } from "next/navigation";
import { CloseIcon } from "@/components/icons";
import { Tags } from "../allposts/tags";

export function SearchedPosts({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const result = posts.filter((post) => {
    const inTitle = post.title?.toLowerCase().includes(query.toLowerCase());
    const inDate = post.date?.toLowerCase().includes(query.toLowerCase());
    const inContent = post.content?.toLowerCase().includes(query.toLowerCase());
    const inExcerpt = post.excerpt?.toLowerCase().includes(query.toLowerCase());
    const inTags = Array.isArray(post.tags)
      ? post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      : false;

    return inTitle || inDate || inContent || inExcerpt || inTags;
  });
  return (
    <>
      {result.length > 0 ? (
        <>
          <Tags posts={posts} isSearch={true} />
          {result.map((post: Post, index: number) => (
            <BlogCard post={post} key={index} />
          ))}
        </>
      ) : (
        <div className="flex gap-1">
          <CloseIcon color="#A1AECE" width={19} />
          <span className="text-foreground-500">
            No Posts found for search query "{query}"
          </span>
        </div>
      )}
    </>
  );
}
