import { Post } from "@/components/BlogCard";
import { Suspense } from "react";
import { SearchedPosts } from "./searchedPosts";
export default async function SearchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 sm:px-24 sm:pt-20 sm:pb-24 p-[2em]">
      <div className="flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap font-semibold text-4xl">
          Search Result
        </span>
        <div className="flex gap-3 flex-wrap flex-col">
          <SearchedPosts posts={posts} />
        </div>
      </div>
    </main>
  );
}
