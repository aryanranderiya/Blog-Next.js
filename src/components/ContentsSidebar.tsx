"use client";

import * as cheerio from "cheerio";
import { useEffect, useState } from "react";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Post } from "./BlogCard";

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

  return (
    <div className="flex h-full flex-col p-4 gap-4  min-w-[250px]">
      {headings.length !== 0 && (
        <div className="w-[240px] border px-1 py-2 rounded-lg border-foreground-400 absolute right-7 top-[30px] bg-foreground-50">
          <div className="flex flex-col gap-2 p-4">
            <span className="text-xs text-muted-foreground font-bold pb-3">
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
