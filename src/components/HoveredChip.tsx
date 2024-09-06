"use client";

import { ArrowUpRight } from "@/components/icons";
import { Chip } from "@nextui-org/react";
import { useState } from "react";

export default function HoveredChip({
  text,
  color,
  bolded,
}: {
  text: string;
  color: "primary" | "default";
  bolded: boolean;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <Chip
      variant={isHovered ? "shadow" : "flat"}
      color={color}
      size="lg"
      className={`cursor-pointer transition-all  ${
        isHovered && color === "primary" ? "text-background" : ""
      }`}
      endContent={
        <ArrowUpRight
          width={18}
          color={
            isHovered
              ? color === "default"
                ? "#00bbff"
                : "foreground"
              : "foreground"
          }
          className={`${
            isHovered ? "-translate-y-[3px]" : ""
          } transition-transform`}
        />
      }
      onMouseOut={HandleMouseOut}
      onMouseOver={HandleMouseOver}
    >
      <div className={bolded ? "font-semibold" : ""}>{text}</div>
    </Chip>
  );
}
