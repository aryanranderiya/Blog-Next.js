"use client";
import { Post } from "@/components/BlogCard";
import BlogCard from "@/components/BlogCard";
import { useSearchParams } from "next/navigation";
import { CloseIcon } from "@/components/icons";
import { Tags } from "../allposts/tags";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchedPosts({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Post[]>([]);
  const [query, setQuery] = useState(searchParams?.get("query") || "");
  const router = useRouter();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    setQuery(queryParam || "");
  }, [searchParams]);

  useEffect(() => {
    if (query.trim().length === 0) {
      router.push("/allposts");
      return;
    }

    setResult(
      posts.filter((post) => {
        const inTitle = post.title?.toLowerCase().includes(query.toLowerCase());
        const inDate = post.date?.toLowerCase().includes(query.toLowerCase());
        const inContent = post.content
          ?.toLowerCase()
          .includes(query.toLowerCase());
        const inExcerpt = post.excerpt
          ?.toLowerCase()
          .includes(query.toLowerCase());

        const inTags = JSON.parse(post.tags).some((tag: string) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

        return inTitle || inDate || inContent || inExcerpt || inTags;
      })
    );
  }, [query]);

  return (
    <>
      {result.length > 0 ? (
        <>
          <Tags posts={posts} isSearch={true} />
          <div className="flex flex-row flex-wrap">
            {result.map((post: Post, index: number) => (
              <BlogCard post={post} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex gap-1">
          <CloseIcon color="#A1AECE" width={19} />
          <span className="text-foreground-500">
            No Posts found for search query &ldquo;{query}&ldquo;
          </span>
        </div>
      )}
    </>
  );
}
