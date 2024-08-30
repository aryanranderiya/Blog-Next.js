import { NextResponse } from "next/server";
import { posts } from "../posts";

export async function GET() {
  const sortedPosts = posts
    .map((post) => ({
      ...post,
      date: parseDate(post.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return NextResponse.json(sortedPosts);
}
