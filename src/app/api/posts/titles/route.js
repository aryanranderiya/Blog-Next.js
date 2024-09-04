import { NextResponse } from "next/server";
import { apiGet } from "@/app/api/database";

export async function GET() {
  try {
    const query = "SELECT * FROM blogposts";
    const posts = await apiGet(query);
    const simplifiedPosts = posts.map(({ postID, title }) => ({
      postID,
      title,
    }));
    return NextResponse.json(simplifiedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}