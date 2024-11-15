import { Post } from "@/components/BlogCard";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Tags } from "./tags";

export default async function AllPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <DefaultLayout>
      <div className="flex gap-3 flex-wrap flex-col h-full">
        <span className="text-nowrap font-semibold text-4xl">All Posts</span>
        <Tags posts={posts} isSearch={false} />
      </div>
    </DefaultLayout>
  );
}
