import BlogCard from "@/components/BlogCard";
import { Post } from "@/components/BlogCard";
import { Tags } from "./tags";
import { CloseIcon } from "@/components/icons";

export default async function AllPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <main className="flex min-h-screen h-fit flex-col gap-7 px-24 pt-20 pb-24">
      <div className="flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap font-semibold text-4xl">All Posts</span>
        <Tags posts={posts} />
        <div className="flex gap-3 flex-wrap pt-4">
          {posts.length === 0 ? (
            <div className="flex gap-1">
              <CloseIcon color="#A1AECE" width={19} />
              <span className="text-foreground-500">No Posts found</span>
            </div>
          ) : (
            posts.map((post: Post, index: number) => (
              <BlogCard post={post} key={index} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
