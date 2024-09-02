import { NextResponse } from "next/server";
import { apiPost } from "@/app/api/database";

export async function GET() {
  try {
    const query = "SELECT * FROM blogposts";
    const posts = await apiGet(query);
    const sortedPosts = posts
      .map((post) => ({
        ...post,
        date: parseDate(post.date),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
