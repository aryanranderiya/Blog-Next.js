import { Post } from "@/components/BlogCard";
import BlogPageInfo from "@/components/BlogPageInfo";
import { notFound } from "next/navigation";
import "../globals.css";
import NotFoundPage from "../not-found";

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  ).then((res) => res.json());

  return posts.map((post) => ({ id: post.postID.toString() }));
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  try {
    const data: Post | { error: string } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`
    ).then((res) => res.json());

    if ("error" in data) notFound();

    return <BlogPageInfo post={data as Post} />;
  } catch {
    return <NotFoundPage />;
  }
}
