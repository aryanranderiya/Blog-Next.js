"use client";

import * as cheerio from "cheerio";
import { useEffect, useState } from "react";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Post } from "./BlogCard";
import { CrossIcon, TableOfContents, X } from "lucide-react";

async function convertMarkdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

function extractHeadings(html: string) {
  const $ = cheerio.load(html);
  const headings: { id: string; text: string }[] = [];
  $("h1, h2, h3, h4, h5, h6").each((i, el) => {
    const id = $(el).attr("id");
    const text = $(el).text();
    if (id) {
      headings.push({ id, text });
    }
  });
  return headings;
}

export default function ContentsSidebar({ post }: { post: Post }) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [contentsOpen, setContentsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const html = await convertMarkdownToHtml(post.content);
        const headings = extractHeadings(html);
        console.log(headings);
        setHeadings(headings);
      } catch (error) {
        console.error("Error processing Markdown:", error);
      }
    }

    fetchData();
  }, [post.content]);

  const toggleSidebar = () => {
    setContentsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-col p-4 gap-4 min-w-[250px] max-w-[250px]">
      <div
        className="rounded-full w-[45px] h-[45px] absolute right-6 sm:hidden bottom-1 bg-foreground-50 flex border-foreground-400 border items-center justify-center z-10"
        onClick={toggleSidebar}
      >
        {contentsOpen ? (
          <X width={30} color="gray" />
        ) : (
          <TableOfContents width={30} color="gray" />
        )}
      </div>

      {headings.length !== 0 && (
        <div
          className={`w-[240px] border px-1 py-2 rounded-lg border-foreground-400 absolute right-7 sm:top-20 sm:bottom-auto bottom-2 bg-foreground-50 transition-all origin-bottom-right sm:opacity-100 sm:pointer-events-auto overflow-hidden ${
            contentsOpen
              ? "opacity-100 h-fit pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2 p-4">
            <span className="text-xs text-muted-foreground font-bold pb-3 flex items-center gap-2">
              <TableOfContents width={18} />
              Table of Contents
            </span>

            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className="text-foreground text-sm hover:text-gray-400 transition-all"
              >
                {heading.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
