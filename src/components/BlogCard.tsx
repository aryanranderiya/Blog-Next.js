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
      className="flex w-[300px] h-[350px] bg-foreground-50 rounded-xl p-[0.5em] relative flex-col cursor-pointer hover:-translate-y-3 hover:bg-foreground-100 transition-all"
      onMouseOut={HandleMouseOut}
      onMouseOver={HandleMouseOver}
    >
      <img
        src={`https://picsum.photos/seed/${Math.random()}/200/300`}
        alt=""
        className="w-full h-[150px] object-cover rounded-xl"
      />

      <Chip
        className={`absolute right-4 top-[125px] transition-all ${
          isHovered ? "opacity-100" : "opacity-0"
        } `}
        color="primary"
        size="sm"
      >
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-[1.2em] text-foreground">
            View Post
          </span>
          <ArrowUpRight color="white" width={17} />
        </div>
      </Chip>

      <div className="p-[0.5em] flex flex-col gap-1 overflow-hidden">
        <span className="text-xs text-foreground-500 italic">27/07/25</span>
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
        <span className="text-xl font-semibold">Title</span>
        <ScrollArea>
          <span className="text-xs text-foreground-500 flex flex-wrap">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            vel labore possimus porro, officia cumque aspernatur omnis animi vel
            vel labore possimus porro, officia cumque aspernatur omnis animi vel
            labore possimus porro, officia cumque aspernatur omnis animi labore
            possimus porro, officia cumque aspernatur omnis animi
          </span>
        </ScrollArea>
      </div>
    </div>
  );
}
