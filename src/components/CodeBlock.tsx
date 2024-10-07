"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardDoneIcon, ClipboardIcon } from "./icons";

export const CodeBlock = ({
  node,
  inline,
  className,
  children,
  ...props
}: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return !inline && match ? (
    <div className="relative flex flex-col gap-0">
      <div className="flex justify-between items-center bg-black bg-opacity-70 text-white px-4 py-1 rounded-xl rounded-b-none mb-[-0.5em]">
        <span className="text-xs font-mono monospace">{match[1]}</span>
        <Button
          onPress={handleCopy}
          size="sm"
          variant="light"
          isIconOnly
          // className="text-foreground hover:text-gray-300 text-xs"
        >
          {copied ? (
            <div className="flex flex-row gap-1 items-center">
              <ClipboardDoneIcon color="white" width={21} />
              {/* <p>Copied!</p> */}
            </div>
          ) : (
            <div className="flex flex-row gap-1 items-center text-foreground">
              <ClipboardIcon color="white" width={21} />
              {/* <p>Copy</p> */}
            </div>
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        wrapLines
        className="m-0 rounded-xl rounded-t-none bg-opacity-30"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
