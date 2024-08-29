"use client";

import { Editable, useEditor } from "@wysimark/react";
import { useState } from "react";
import { Button, DatePicker, Input } from "@nextui-org/react";
import * as React from "react";
import { FancyMultiSelect } from "@/components/shadcn/fancy-multi-select";

export default function AddPost() {
  const [markdown, setMarkdown] = useState("# Hello World");
  const editor = useEditor({});

  return (
    <main className="flex min-h-screen h-fit flex-col gap-3 px-24 pt-20 pb-24">
      <span className="text-nowrap font-semibold text-4xl">Add Post</span>
      <Input
        placeholder="Lorem ipsum"
        label="Enter Post Title"
        variant="faded"
      />
      <Input
        placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing."
        label="Enter Post Subtitle"
        variant="faded"
      />
      <div className="flex gap-3">
        <DatePicker
          label="Post Date"
          className="max-w-[284px]"
          variant="faded"
        />
        <FancyMultiSelect />
      </div>

      <div className="rounded-2xl overflow-hidden outline outline-3 outline-foreground-200">
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          className="min-h-[50vh] border-none"
        />
      </div>

      <Button variant="shadow" color="primary" className="font-semibold">
        Create new post
      </Button>
    </main>
  );
}
