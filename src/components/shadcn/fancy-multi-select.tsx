import React, { useState, useRef, useEffect } from "react";
import { Chip, Input } from "@nextui-org/react";
import { ScrollArea } from "@/components/shadcn/scroll-area";

type ChipType = {
  label: string;
};

const predefinedChips: ChipType[] = [
  { label: "React" },
  { label: "TypeScript" },
  { label: "JavaScript" },
  { label: "Node.js" },
  { label: "Next.js" },
];

export default function MultiChipSelect({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: ChipType[];
  setSelectedTags: React.Dispatch<React.SetStateAction<ChipType[]>>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredChips, setFilteredChips] =
    useState<ChipType[]>(predefinedChips);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDropdownOpen(true);

    const filtered = predefinedChips.filter(
      (chip) =>
        chip.label.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.some((selected) => selected.label === chip.label)
    );
    setFilteredChips(filtered);
  };

  const addChip = (chip: ChipType) => {
    if (!selectedTags.some((selected) => selected.label === chip.label)) {
      setSelectedTags([...selectedTags, chip]);
      setInputValue("");
      setFilteredChips(predefinedChips.filter((c) => c.label !== chip.label));
      inputRef.current?.focus();
    }
  };

  const removeChip = (chipToRemove: ChipType) => {
    setSelectedTags(
      selectedTags.filter((chip) => chip.label !== chipToRemove.label)
    );
    setFilteredChips([...filteredChips, chipToRemove]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newChip: ChipType = {
        label: inputValue.trim(),
      };
      if (!selectedTags.some((selected) => selected.label === newChip.label)) {
        addChip(newChip);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="flex flex-wrap items-center border-2 bg-foreground-50 border-foreground-200 rounded-2xl p-1 gap-1">
          {selectedTags.map((chip) => (
            <Chip
              variant="flat"
              key={chip.label}
              size="md"
              color="primary"
              className="ml-1 select-none"
              onClose={() => removeChip(chip)}
            >
              {chip.label}
            </Chip>
          ))}
          <Input
            ref={inputRef}
            type="text"
            variant="faded"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsDropdownOpen(true)}
            className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type to add or select chips..."
          />
        </div>
        {isDropdownOpen && filteredChips.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-popover text-popover-foreground rounded-xl shadow-md bg-foreground-50"
          >
            <ScrollArea className="h-[200px]">
              {filteredChips.map((chip) => (
                <div
                  key={chip.label}
                  className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm"
                  onClick={() => addChip(chip)}
                >
                  {chip.label}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
