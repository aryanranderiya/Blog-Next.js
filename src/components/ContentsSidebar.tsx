import * as cheerio from "cheerio";
import { Speech, TableOfContents, X } from "lucide-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Post } from "./BlogCard";
import { Accordion, AccordionItem } from "@nextui-org/react";

async function convertMarkdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

function extractHeadings(html: string) {
  const $ = cheerio.load(html);
  const headings: { id: string; text: string }[] = [];
  $("h1, h2, h3").each((i, el) => {
    const id = $(el).attr("id");
    const text = $(el).text();
    if (id) {
      headings.push({ id, text });
    }
  });
  return headings;
}

export default function ContentsSidebar({
  post,
  setContentsOpen,
  contentsOpen,
}: {
  post: Post;
  setContentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contentsOpen: boolean;
}) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const tocRef = useRef<HTMLDivElement | null>(null); // Ref to the Table of Contents container

  useEffect(() => {
    async function fetchData() {
      try {
        const html = await convertMarkdownToHtml(post.content);
        const headings = extractHeadings(html);
        setHeadings([...headings, { id: "comments", text: "Comments" }]);
      } catch (error) {
        console.error("Error processing Markdown:", error);
      }
    }

    fetchData();
  }, [post?.content]);

  useEffect(() => {
    const headingElements = document.querySelectorAll("h1, h2, h3");

    const options = {
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: 1,
    };

    observer.current = new IntersectionObserver((entries) => {
      const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].target.id);
      }
    }, options);

    headingElements.forEach((heading) => {
      if (observer.current) observer.current.observe(heading);
    });

    return () => {
      if (observer.current)
        headingElements.forEach((element) =>
          observer.current?.unobserve(element)
        );
    };
  }, [headings]);

  useEffect(() => {
    // Scroll the TOC container if the active heading is out of view
    if (activeId && tocRef.current) {
      const activeElement = tocRef.current.querySelector(
        `a[href="#${activeId}"]`
      );

      if (activeElement) {
        const containerBounds = tocRef.current.getBoundingClientRect();
        const activeBounds = activeElement.getBoundingClientRect();

        // Check if the active element is outside the container's view
        if (
          activeBounds.bottom > containerBounds.bottom ||
          activeBounds.top < containerBounds.top
        ) {
          // Scroll the container to make the active element visible
          tocRef.current.scrollTo({
            top: activeElement.offsetTop - containerBounds.top,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeId]);

  const toggleSidebar = () => {
    setContentsOpen((prev: boolean) => !prev);
  };

  return (
    <div className="flex h-full flex-col p-4 gap-4 sm:min-w-[70vh] sm:max-w-[70vh] w-0">
      <div
        className="rounded-full w-[45px] outline outline-1 outline-foreground-300 h-[45px] absolute right-6 sm:hidden bottom-6 bg-foreground-50 flex shadow-2xl items-center justify-center z-[9]"
        onClick={toggleSidebar}
      >
        {contentsOpen ? (
          <X width={30} color="gray" />
        ) : (
          <TableOfContents width={30} color="gray" />
        )}
      </div>

      {headings.length !== 0 && (
        <div
          className={`w-[240px] h-fit max-h-[60vh] overflow-hidden shadow-xl border border-foreground-200 px-1 py-2 rounded-xl absolute right-7 sm:top-5 sm:bottom-auto bottom-7 bg-foreground-50 transition-all origin-bottom-right sm:opacity-100 sm:pointer-events-auto ${
            contentsOpen
              ? "opacity-100 h-fit pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Accordion
            isCompact
            itemClasses={{
              base: "p-0",
              content: "p-0",
              trigger: "py-1",
              title: "font-bold text-xs text-muted-foreground",
            }}
            defaultExpandedKeys={["1"]}
          >
            <AccordionItem
              key="1"
              aria-label="Table of Contents Accordion"
              className="!py-0 my-0"
              title="Table of Contents"
            >
              <div
                className="flex flex-col px-2 pt-2 overflow-y-auto max-h-[50vh] h-fit"
                ref={tocRef}
              >
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`text-foreground min-h-fit relative text-sm py-1 px-2 hover:text-gray-400 transition-opacity   rounded-sm overflow-hidden  ${
                      heading.id === activeId
                        ? "font-semibold bg-[#00bbff] bg-opacity-15 "
                        : ""
                    }`}
                  >
                    <div
                      className={`absolute transition-opacity top-0 left-0 h-full bg-[#00bbff] w-[3px] rounded-full ${
                        heading.id === activeId ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {heading.text}
                  </a>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
