import { Post } from "@/components/BlogCard";
import ContentsSidebar from "@/components/ContentsSidebar";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import "../globals.css";

interface ErrorResponse {
  data: {
    error: string;
  };
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  let posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  ).then((res) => res.json());

  return posts.map((post) => ({
    id: post.postID.toString(),
  }));
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`
  );

  const data: Post | ErrorResponse = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  if ("data" in data && "error" in data.data) notFound();

  const post = data as Post;

  return (
    <div className="flex flex-row px-24 pt-10 pb-24 justify-between">
      <main className="flex h-fit flex-col gap-7 relative w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={"https://github.com/aryanranderiya.png"}
                alt="Profile Picture"
                width={40}
                height={40}
              />

              <div className="flex flex-col">
                <span className="text-md font-semibold">Aryan Randeriya</span>
                <div className="flex gap-2">
                  <span className="text-foreground-500 text-sm">
                    {post.date}
                  </span>
                  <span className="text-foreground text-sm">/</span>
                  <span className="text-foreground-400 text-sm">
                    Reading Time:&nbsp;
                    {post.estimated_read_time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-1 flex-wrap">
            {!!post.tags &&
              JSON.parse(post.tags).map((tag: string) => (
                <Chip
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="cursor-default"
                >
                  {tag}
                </Chip>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1>{post.title}</h1>
          <span className="text-lg text-foreground-600">{post.excerpt}</span>
        </div>

        <div className="flex flex-col markdown-container">
          <Markdown rehypePlugins={[rehypeSlug]}>{post.content}</Markdown>
        </div>
      </main>
      <ContentsSidebar post={post} />
    </div>
  );
}
