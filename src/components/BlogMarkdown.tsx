"use client";

import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      rehypePlugins={[rehypeSlug, remarkGfm]}
      components={{
        code: CodeBlock,
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-3 mb-2" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-2 mb-1" {...props} />
        ),
        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 mb-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 mb-2" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic my-2"
            {...props}
          />
        ),
        img: ({ node, ...props }) => (
          <img
            className="max-w-full h-auto my-2 rounded-lg"
            {...props}
            alt="Image"
          />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table
              className="min-w-full border-collapse border border-gray-300 rounded-md"
              {...props}
            />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-200 bg-opacity-20" {...props} />
        ),
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => (
          <tr className="border-b border-gray-300" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-bold" {...props} />
        ),
        td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
        hr: () => <hr className="border-t border-gray-300 my-4" />,
      }}
    >
      {content}
    </Markdown>
  );
}
