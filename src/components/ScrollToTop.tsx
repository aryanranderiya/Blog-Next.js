"use client";

import { Chip } from "@nextui-org/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop({
  scrollTriggerRef,
}: {
  scrollTriggerRef: React.RefObject<HTMLDivElement>;
}) {
  const handleOnClick = () => {
    scrollTriggerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div onClick={handleOnClick}>
      <Chip
        className="cursor-pointer gap-1 select-none"
        size="lg"
        color="primary"
        variant="shadow"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="flex items-center gap-1">
          <span className="font-semibold">Scroll to Top</span>
          <ArrowUp width={19} />
        </div>
      </Chip>
    </div>
  );
}
