import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";

export default function ContentsSidebar() {
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
