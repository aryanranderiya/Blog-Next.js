import { useEffect, useState } from "react";

export default function VerticalProgressBar({
  headings,
  activeId,
}: {
  headings: { id: string; text: string }[];
  activeId: string | null;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const scrollProgress = (scrollPosition / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-1 bg-gray-300">
      <div
        className="bg-blue-500 transition-all duration-300"
        style={{ height: `${progress}%` }}
      ></div>
    </div>
  );
}
