import { apiDelete, apiGet } from "@/app/api/database";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id)
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );

    const query = "DELETE FROM blogposts WHERE id = ?";

    const result = await apiDelete(query, [id]);

    if (result.changes === 0)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let query = `SELECT * FROM blogposts WHERE id = '${id}`;

    const post = await apiGet(query);
    console.log("hey", post);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
