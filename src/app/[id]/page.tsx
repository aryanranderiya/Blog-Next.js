import Image from "next/image";
import { Post } from "@/components/BlogCard";
import Markdown from "react-markdown";
import ContentsSidebar from "@/components/ContentsSidebar";
import { notFound } from "next/navigation";

interface ErrorResponse {
  data: {
    error: string;
  };
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
    <div className="flex flex-row px-24 pt-20 pb-24 justify-between">
      <main className="flex h-fit flex-col gap-7 relative">
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
              <span className="text-foreground-500 text-sm">{post.date}</span>
              <span className="text-foreground text-sm">/</span>
              <span className="text-foreground-400 text-sm">
                10 minute read
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-2xl ">{post.title}</span>
          <span className="text-sm text-foreground-500">{post.excerpt}</span>
        </div>
        <div className="flex flex-col">
          <Markdown>{post.content}</Markdown>
        </div>
      </main>
      {/* <ContentsSidebar /> */}
    </div>
  );
}
