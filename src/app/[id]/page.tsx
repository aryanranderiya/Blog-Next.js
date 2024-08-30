"use client";

import Image from "next/image";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/components/BlogCard";
import Markdown from "react-markdown";

function ContentsSidebar() {
  return (
    <div className="flex h-full flex-col p-[1em] gap-1">
      <div className="w-full min-w-[200px] max-w-[300px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-200">
        <Listbox
          aria-label="Actions"
          variant="light"
          selectionMode="single"
          hideSelectedIcon
        >
          <ListboxSection title="Table of Contents">
            <ListboxItem key="heading1">Heading 1</ListboxItem>
            <ListboxItem key="heading2">Heading 2</ListboxItem>
            <ListboxItem key="heading3">Heading 3</ListboxItem>
            <ListboxItem key="heading4">Heading 4</ListboxItem>
          </ListboxSection>
        </Listbox>
      </div>
    </div>
  );
}

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = params;
  const [post, setPost] = useState<Post>({
    id: 1,
    title: "",
    date: "01/01/80",
    excerpt: "",
    tags: [],
    image: "",
    content: "",
  });

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`/api/posts`);
      const data = await response.json();
      const foundPost = data.find((post: any) => post.id.toString() === id);
      setPost(foundPost);
    }

    fetchPost();
  }, [id]);
  const markdown =
    "# Heading 1 \n ## Heading 2 \n### Heading 3\n#### Heading 4";

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
              <span className="text-foreground-500 text-sm">{post?.date}</span>
              <span className="text-foreground text-sm">/</span>
              <span className="text-foreground-400 text-sm">
                10 minute read
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-2xl ">{post?.title}</span>
          <span className="text-sm text-foreground-500">{post?.excerpt}</span>
        </div>
        <div className="flex flex-col">
          <Markdown>{post?.content}</Markdown>
        </div>
      </main>
      <ContentsSidebar />
    </div>
  );
}
