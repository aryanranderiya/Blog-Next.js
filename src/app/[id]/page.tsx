"use client";

import Image from "next/image";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";

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

export default function BlogPage() {
  return (
    <div className="flex flex-row px-24 pt-20 pb-24 justify-between">
      <main className="flex h-fit flex-col gap-7 relative">
        <div className="flex items-center gap-2">
          <Image
            src="https://github.com/aryanranderiya.png"
            alt="Profile Picture"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">Aryan Randeriya</span>
            <div className="flex gap-2">
              <span className="text-foreground-500 text-xs">
                31st January 2024
              </span>
              <span className="text-foreground text-xs">/</span>
              <span className="text-foreground-400 text-xs">
                10 minute read
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-2xl ">
            Title Lorem ipsum dolor, sit amet consectetur adipisicing.
          </span>
          <span className="text-sm text-foreground-500">
            subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Eaque, cupiditate!
          </span>
        </div>
      </main>
      <ContentsSidebar />
    </div>
  );
}
