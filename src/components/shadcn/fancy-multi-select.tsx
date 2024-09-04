"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/shadcn/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { Command as CommandPrimitive } from "cmdk";
export type Tag = Record<"value" | "label", string>;

export function FancyMultiSelect({
  tags,
  selected,
  setSelected,
}: {
  tags: Tag[];
  selected: Tag[];
  setSelected: React.Dispatch<React.SetStateAction<Tag[]>>;
}): React.JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (framework: Tag) => {
      setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    },
    [setSelected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [setSelected]
  );

  const selectables = tags.filter((framework) => !selected.includes(framework));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-xl border-2 border-input px-3 py-[14px] text-sm ring-offset-background focus-within:ring-2 focus-within:ring-foreground-400 focus-within:ring-ring focus-within:ring-offset-2 bg-foreground-100">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => (
            <Badge
              key={framework.value}
              variant="secondary"
              className="bg-foreground-300 py-1 hover:bg-foreground-400"
            >
              {framework.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(framework);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(framework)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select tags..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <div className="relative mt-2">
          <div className="absolute top-0 z-10 w-full rounded-xl border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, framework]);
                    }}
                    className="cursor-pointer"
                  >
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      )}
    </Command>
  );
}
