import { apiGet } from "@/app/api/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const id = pathParts[pathParts.length - 2];

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const query = `SELECT page_views FROM blogposts WHERE postID = '${id}'`;
    const post = await apiGet(query);

    if (!post || post.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ page_views: post[0].page_views });
  } catch (error) {
    console.error(`Failed to fetch page views: ${error.message}`, error);
    return NextResponse.json(
      { error: "Failed to fetch page views" },
      { status: 500 }
    );
  }
}
