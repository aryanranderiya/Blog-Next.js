"use client";

import ContentsSidebar from "@/components/ContentsSidebar";
import { useTheme } from "@/contexts/ThemeContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import { formatDate } from "@/utils/formatDate";
import Giscus from "@giscus/react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useDisclosure } from "@nextui-org/modal";
import { Button, Chip } from "@nextui-org/react";
import { Calendar, Clock4 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Post } from "./BlogCard";
import BlogMarkdown from "./BlogMarkdown";
import { ShareIcon } from "./icons";
import ScrollToTop from "./ScrollToTop";
import SharePopup from "./SharePopup";

export default function BlogPageInfo({ post }: { post: Post }) {
  const [contentsOpen, setContentsOpen] = useState(false);
  const { isDark } = useTheme();
  const scrollTriggerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full flex flex-row justify-start">
      <DefaultLayout>
        <Breadcrumbs
          size="md"
          underline="hover"
          variant="solid"
          radius="full"
          className="sm:m-0 mb-3"
          ref={scrollTriggerRef}
        >
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/allposts">All Posts</BreadcrumbItem>
          <BreadcrumbItem href={`/${post.postID}`}>
            {post.title.slice(0, 35) + (post.title.length >= 35 ? "..." : "")}
          </BreadcrumbItem>
        </Breadcrumbs>
        <main
          className={`flex h-fit flex-col gap-7 relative w-full flex-grow transition-all overflow-y-scroll ] px-1 ${
            contentsOpen ? "opacity-25" : "opacity-100"
          }`}
          onClick={() => setContentsOpen(false)}
        >
          <div className="min-h-[200px] max-h-[200px] sm:w-[40vw w-full overflow-hidden rounded-xl bg-foreground-300 sm:my-3 outline outline-2 outline-foreground-200">
            <Image
              src={post.image}
              alt={post.title}
              height={150}
              width={500}
              className={`w-full min-h-[200px] max-h-[200px] object-cover`}
            />
          </div>

          <div className="flex flex-col gap-1 sm:w-[95%] w-full">
            <span className="font-bold text-4xl">{post?.title}</span>

            <span className="text-lg text-foreground-600">{post?.excerpt}</span>

            <div className="mt-3 flex flex-col gap-3 sm:w-fit w-full sm:rounded-full rounded-2xl pl-2 px-1 sm:py-1 py-2 bg-foreground-100 outline outline-2 outline-[#8f8f8f80]">
              <div className="flex sm:items-center items-start w-full justify-between flex-row gap-2 sm:gap-0">
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    src={"https://github.com/aryanranderiya.png"}
                    alt="Profile Picture"
                    width={35}
                    height={35}
                    className="min-h-[35px] max-h-[35px] aspect-square"
                  />

                  <div className="flex flex-row items-center gap-10 w-full justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        by Aryan Randeriya
                      </span>
                      <div className="flex flex-col items-start sm:flex-row sm:gap-4">
                        <span className="text-foreground-500 text-xs flex items-center gap-1">
                          <Calendar width={17} />
                          {formatDate(post?.date)}
                        </span>
                        <div className="text-foreground-500 text-xs flex items-center gap-1">
                          <Clock4 width={17} />
                          Read Time: &nbsp;
                          {post?.estimated_read_time}
                        </div>
                      </div>
                    </div>

                    <Button
                      onPress={onOpen}
                      isIconOnly
                      // color="primary"
                      radius="full"
                      // variant="faded"
                    >
                      <ShareIcon className="text-foreground-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <hr /> */}

          <div className="flex flex-col markdown-container sm:w-[95%] w-full flex-wrap pb-14">
            <BlogMarkdown content={post?.content} />

            {/* <hr /> */}

            <div className="flex gap-1 flex-wrap mt-2">
              {!!post?.tags &&
                JSON.parse(post.tags).map((tag: string, index: number) => (
                  <Chip
                    key={index}
                    color="primary"
                    variant="flat"
                    className="cursor-default"
                  >
                    {tag}
                  </Chip>
                ))}
            </div>
          </div>

          {/* <div
            className={` ${
              isDark ? "bg-white/5" : "bg-black/5"
            } rounded-xl p-5`}
            id="comments"
          > */}
          {/* <h1
              className="comments  mt-10 pt-5 border-t border-t-zinc-600"
            >
              Comments
            </h1> */}
          <Giscus
            id="comments"
            repo="aryanranderiya/Blog-Next.js"
            repoId="R_kgDOMqD_Fg"
            category="General"
            categoryId="DIC_kwDOMqD_Fs4CjI8C"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={isDark ? "dark" : "light"}
            lang="en"
          />
          {/* </div> */}

          <div className="flex w-full items-center justify-center">
            <ScrollToTop scrollTriggerRef={scrollTriggerRef} />
          </div>
        </main>
      </DefaultLayout>

      <div className="sm:min-w-[280px] w-0">
        <ContentsSidebar
          post={post}
          contentsOpen={contentsOpen}
          setContentsOpen={setContentsOpen}
        />
      </div>

      <SharePopup onClose={onClose} isOpen={isOpen} postID={post.postID} />
    </div>
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
