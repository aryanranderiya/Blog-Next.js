// /src/app/api/update-likes/route.ts

import { NextResponse } from "next/server";
import { apiPost } from "@/app/api/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postID } = body;

    if (!postID)
      return NextResponse.json({ error: "Missing postID" }, { status: 400 });

    const query = `UPDATE blogposts SET page_views = page_views + 1 WHERE postID = ?`;

    await apiPost(query, [postID]);

    return NextResponse.json(
      { message: "Page Views updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update page view: " + error },
      { status: 500 }
    );
  }
}
