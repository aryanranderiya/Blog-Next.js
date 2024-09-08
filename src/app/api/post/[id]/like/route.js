import { apiGet } from "@/app/api/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const id = pathParts[pathParts.length - 2];

    if (!id)
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );

    const query = `SELECT likes FROM blogposts WHERE postID = '${id}'`;
    const post = await apiGet(query);

    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json({ likes: post[0].likes });
  } catch (error) {
    console.error(`Failed to fetch likes: ${error.message}`, error);
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}
