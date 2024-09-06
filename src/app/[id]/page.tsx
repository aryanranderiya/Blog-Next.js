import { Post } from "@/components/BlogCard";
import BlogPageInfo from "@/components/BlogPageInfo";
import { notFound } from "next/navigation";
import "../globals.css";

interface ErrorResponse {
  data: {
    error: string;
  };
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  let posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  ).then((res) => res.json());

  return posts.map((post) => ({
    id: post.postID.toString(),
  }));
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`
  );

  const data: Post | ErrorResponse = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  if ("data" in data && "error" in data.data) notFound();

  const post = data as Post;

  return <BlogPageInfo post={post} />;
}
