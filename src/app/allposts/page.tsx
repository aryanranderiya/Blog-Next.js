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
    <main className="flex flex-col gap-7 px-24 pt-20 pb-24">
      <div className="flex gap-3 flex-wrap flex-col">
        <span className="text-nowrap font-semibold text-4xl">All Posts</span>
        <Tags posts={posts} isSearch={false} />
      </div>
    </main>
  );
}
