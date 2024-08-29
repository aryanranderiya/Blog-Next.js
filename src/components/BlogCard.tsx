import { Chip } from "@nextui-org/react";
import { useState } from "react";
import { ArrowUpRight } from "./icons";
import { ScrollArea } from "./shadcn/scroll-area";

export default function BlogCard() {
  const [isHovered, setIsHovered] = useState(false);

  const HandleMouseOver = () => {
    setIsHovered(true);
  };

  const HandleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex w-[300px] h-[350px] bg-foreground-50 rounded-xl p-[10px] relative flex-col cursor-pointer hover:-translate-y-2 hover:bg-foreground-100 transition-all"
      onMouseOut={HandleMouseOut}
      onMouseOver={HandleMouseOver}
    >
      <img
        src={`https://picsum.photos/seed/${Math.random()}/200/300`}
        alt=""
        className="w-full h-[150px] object-cover rounded-xl bg-zinc-800"
      />

      <Chip
        className={`absolute right-3 top-[130px] transition-all ${
          isHovered ? "opacity-100" : "opacity-0"
        } `}
        color="primary"
        size="sm"
      >
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-[1.1em] text-background">
            View Post
          </span>
          <ArrowUpRight color="foreground" width={17} />
        </div>
      </Chip>

      <div className="py-[0.5em] px-[0.3em] flex flex-col gap-1 overflow-hidden">
        <span className="text-xs text-foreground-500 pt-1">27/07/25</span>
        <div className="flex flex-wrap py-1 gap-1">
          <Chip size="sm" variant="flat" color="primary">
            lorem
          </Chip>

          <Chip size="sm" variant="flat" color="primary">
            lorem
          </Chip>

          <Chip size="sm" variant="flat" color="primary">
            lorem
          </Chip>

          <Chip size="sm" variant="flat" color="primary">
            lorem
          </Chip>

          <Chip size="sm" variant="flat" color="primary">
            lorem
          </Chip>
        </div>
        <span className="text-xl font-semibold pt-1">Title</span>
        <ScrollArea>
          <span className="text-xs text-foreground-500 flex flex-wrap">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>
        </ScrollArea>
      </div>
    </div>
  );
}