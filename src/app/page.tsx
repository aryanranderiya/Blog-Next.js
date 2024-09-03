import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { Post } from "@/components/BlogCard";
import HoveredChip from "@/components/HoveredChip";

export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() {
  let posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  ).then((res) => res.json());

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

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
        <span className="text-nowrap">I&apos;m Aryan Randeriya,</span>
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

async function FeaturedPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

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

async function LatestPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

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
