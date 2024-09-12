"use client";

import ContentsSidebar from "@/components/ContentsSidebar";
import { Button, Chip } from "@nextui-org/react";
import { Calendar, Clock4, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { Post } from "./BlogCard";
import Head from "next/head";

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
    else if (days === 1) return "Uesterday";
    else return `${days} Day${days > 1 ? "s" : ""} ago`;
  }
}

export default function BlogPageInfo({ post }: { post: Post }) {
  const startComponentRef = useRef(null);
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
    <>
      {post && (
        <Head>
          <title>Aryans Blog | {post.title}</title>

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
      )}

      <div
        className="flex min-h-[calc(100dvh-80px)] h-fit md:w-[calc(86vw-280px)] min-w-screen sm:gap-7 sm:px-24 sm:pr-0 sm:pt-20 sm:pb-24 p-[2em] flex-row"
        ref={startComponentRef}
      >
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
                  <div className="flex sm:gap-2 sm:flex-row flex-col sm:items-center items-start">
                    <span className="text-foreground-500 text-sm flex items-center gap-1">
                      <Calendar width={17} />
                      {formatDate(post?.date)}
                    </span>
                    <span className="text-foreground text-sm sm:flex hidden">
                      /
                    </span>
                    <div className="text-foreground-400 text-sm flex items-center gap-1">
                      <Clock4 width={17} />
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

          <div className="flex flex-col markdown-container">
            <Markdown rehypePlugins={[rehypeSlug]}>{post?.content}</Markdown>
          </div>
        </main>

        <div className="sm:min-w-[280px] w-0">
          <ContentsSidebar
            post={post}
            contentsOpen={contentsOpen}
            setContentsOpen={setContentsOpen}
            startComponentRef={startComponentRef}
          />
        </div>
      </div>
    </>
  );
}
