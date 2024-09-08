import { NextResponse } from "next/server";
import { apiPost } from "@/app/api/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postID, like } = body;

    if (!postID || like === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = like
      ? `UPDATE blogposts SET likes = likes + 1 WHERE postID = ?`
      : `UPDATE blogposts SET likes = likes - 1 WHERE postID = ?`;

    await apiPost(query, [postID]);

    return NextResponse.json(
      { success: true, message: "Likes updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update likes: " + error },
      { status: 500 }
    );
  }
}
