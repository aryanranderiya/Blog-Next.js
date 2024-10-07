"use client";

import ContentsSidebar from "@/components/ContentsSidebar";
import DefaultLayout from "@/layouts/DefaultLayout";
import Giscus from "@giscus/react";
import { Button, Chip } from "@nextui-org/react";
import { Calendar, Clock4, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Post } from "./BlogCard";
import { ClipboardDoneIcon, ClipboardIcon } from "./icons";

export function formatDate(dateString: string) {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (isNaN(date.getTime())) return "";

  if (diffInSeconds < secondsInMinute) return "Just Now";
  else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} Minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} Hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    if (days === 0) return "Today";
    else if (days === 1) return "Yesterday";
    else return `${days} Day${days > 1 ? "s" : ""} ago`;
  }
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return !inline && match ? (
    <div className="relative flex flex-col gap-0">
      <div className="flex justify-between items-center bg-black bg-opacity-70 text-white px-4 py-1 rounded-xl rounded-b-none mb-[-0.5em]">
        <span className="text-xs font-mono monospace">{match[1]}</span>
        <Button
          onPress={handleCopy}
          size="sm"
          variant="light"
          isIconOnly
          // className="text-foreground hover:text-gray-300 text-xs"
        >
          {copied ? (
            <div className="flex flex-row gap-1 items-center">
              <ClipboardDoneIcon color="white" width={21} />
              {/* <p>Copied!</p> */}
            </div>
          ) : (
            <div className="flex flex-row gap-1 items-center text-foreground">
              <ClipboardIcon color="white" width={21} />
              {/* <p>Copy</p> */}
            </div>
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        wrapLines
        className="m-0 rounded-xl rounded-t-none bg-opacity-30"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function BlogPageInfo({ post }: { post: Post }) {
  const [contentsOpen, setContentsOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [views, setViews] = useState(post.page_views);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLikedPost = !!localStorage.getItem(`hasLiked-${post.postID}`);
      setHasLiked(hasLikedPost);
    }
  }, [post.postID]);

  // const metadata: Metadata = {
  //   title: post.title,
  //   // description:
  //   // "The official Next.js Course Dashboard, built with App Router.",
  //   // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  // };

  const toggleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/update/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postID: post.postID,
            like: !hasLiked,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setHasLiked(!hasLiked);
        setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
        localStorage.setItem(
          `hasLiked-${post.postID}`,
          !hasLiked ? "true" : ""
        );
      } else {
        console.error("Failed to update likes on the server:", data.message);
      }
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  useEffect(() => {
    const incrementView = async () => {
      if (typeof window !== "undefined") {
        const hasViewedPost = !!sessionStorage.getItem(
          `hasViewed-${post.postID}`
        );
        if (!hasViewedPost) {
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/update/view`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  postID: post.postID,
                }),
              }
            );
            sessionStorage.setItem(`hasViewed-${post.postID}`, "true");
          } catch (error) {
            console.error("Failed to update views:", error);
          }
        }
      }
    };

    incrementView();

    const fetchPostData = async () => {
      try {
        const [likesRes, viewsRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post.postID}/like`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post.postID}/views`
          ),
        ]);

        const [likesData, viewsData] = await Promise.all([
          likesRes.json(),
          viewsRes.json(),
        ]);

        setLikes(likesData.likes);
        setViews(viewsData.page_views);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchPostData();
  }, [post.postID]);

  return (
    <DefaultLayout>
      <main
        className={`flex h-fit flex-col gap-7 relative w-full flex-grow transition-all ${
          contentsOpen ? "opacity-25" : "opacity-100"
        }`}
        onClick={() => setContentsOpen(false)}
      >
        <div className="min-h-[200px] max-h-[200px] sm:w-[40vw] w-full overflow-hidden rounded-xl bg-foreground-300 sm:my-3 outline outline-2 outline-foreground-200">
          <Image
            src={post.image}
            alt={post.title}
            height={150}
            width={500}
            className={`w-full min-h-[200px] max-h-[200px] object-cover`}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex sm:items-center items-start w-full justify-between flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-3 flex-1">
              <Image
                src={"https://github.com/aryanranderiya.png"}
                alt="Profile Picture"
                width={40}
                height={40}
              />

              <div className="flex flex-col">
                <span className="text-md font-semibold">Aryan Randeriya</span>
                <div className="flex flex-col items-start">
                  <span className="text-foreground-500 text-sm flex items-center gap-1">
                    <Calendar width={17} />
                    {formatDate(post?.date)}
                  </span>
                  <div className="text-foreground-400 text-sm flex items-center gap-1">
                    <Clock4 width={17} />
                    Estimated Read Time: &nbsp;
                    {post?.estimated_read_time}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex sm:gap-3 gap-0 sm:flex-row flex-col sm:items-center items-end">
              <div className="flex gap-1 text-lg items-center">
                <Eye />
                <span className="text-gray-500 min-w-3">{views}</span>
              </div>

              <Button
                className="flex gap-1 text-lg items-center p-0 w-fit sm:justify-center justify-end"
                variant="light"
                color="danger"
                onPress={toggleLike}
                size="sm"
              >
                <Heart fill={hasLiked ? "red" : "transparent"} color="red" />
                <span className="text-gray-500 min-w-3">{likes}</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-1 flex-wrap">
            {!!post?.tags &&
              JSON.parse(post.tags).map((tag: string, index: number) => (
                <Chip
                  key={index}
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="cursor-default"
                >
                  {tag}
                </Chip>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1>{post?.title}</h1>
          <span className="text-lg text-foreground-600">{post?.excerpt}</span>
        </div>

        <hr />

        <div className="flex flex-col markdown-container sm:w-[70%] w-full flex-wrap pb-14">
          <Markdown
            rehypePlugins={[rehypeSlug, remarkGfm]}
            components={{
              code: CodeBlock,
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mt-3 mb-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-bold mt-2 mb-1" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 mb-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 mb-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-4 italic my-2"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img
                  className="max-w-full h-auto my-2 rounded-lg"
                  {...props}
                  alt="Image"
                />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto">
                  <table
                    className="min-w-full border-collapse border border-gray-300 rounded-md"
                    {...props}
                  />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-200 bg-opacity-20" {...props} />
              ),
              tbody: ({ node, ...props }) => <tbody {...props} />,
              tr: ({ node, ...props }) => (
                <tr className="border-b border-gray-300" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-4 py-2 text-left font-bold" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2" {...props} />
              ),
              hr: () => <hr className="border-t border-gray-300 my-4" />,
            }}
          >
            {post?.content}
          </Markdown>
        </div>

        {/* <ScrollToTop scrollTriggerRef={startComponentRef} /> */}
      </main>

      <div className="sm:min-w-[280px] w-0">
        {/* <ContentsSidebar
          post={post}
          contentsOpen={contentsOpen}
          setContentsOpen={setContentsOpen}
        /> */}

        <ContentsSidebar
          post={post}
          contentsOpen={contentsOpen}
          setContentsOpen={setContentsOpen}
        />
      </div>

      <Giscus
        id="comments"
        repo="giscus/giscus-component"
        repoId="MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA="
        category="Announcements"
        categoryId="DIC_kwDOF1L2fM4B-hVS"
        mapping="specific"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </DefaultLayout>
  );
}

//   {post && (
// <Head>
{
  /* <title>Aryans Blog | {post.title}</title>

          <meta name="description" content={post.excerpt} />
          <meta
            name="keywords"
            content={
              "Aryan Randeriya Blog, Blog Website, Aryan, Randeriya, Blog, Next.js" +
              JSON.parse(post.tags).toString()
            }
          />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={post.image} />
          <meta
            property="og:url"
            content={`https://blog.aryanranderiya.com/${post.postID}`}
          />
          <meta
            property="canonical"
            content={`https://blog.aryanranderiya.com/${post.postID}`}
          />
        </Head>
      )} */
}
