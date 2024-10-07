import { Post } from "@/components/BlogCard";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Suspense } from "react";
import { SearchedPosts } from "./searchedPosts";

export default async function SearchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <DefaultLayout>
      <div className="flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap font-semibold text-4xl">
          Search Result
        </span>
        <div className="flex gap-3 flex-wrap flex-col">
          <Suspense>
            <SearchedPosts posts={posts} />
          </Suspense>
        </div>
      </div>
    </DefaultLayout>
  );
}
