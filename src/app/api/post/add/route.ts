import { NextResponse } from "next/server";
import { apiPost } from "@/app/api/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      postID,
      title,
      date,
      excerpt,
      tags,
      image,
      content,
      estimated_read_time,
    } = body;

    console.log(body);

    if (
      !postID ||
      !title ||
      !date ||
      !excerpt ||
      !tags ||
      !image ||
      !content ||
      !estimated_read_time
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO blogposts (postID, title, date, excerpt, tags, image, content, estimated_read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await apiPost(query, [
      postID,
      title,
      date,
      excerpt,
      JSON.stringify(tags),
      image,
      content,
      estimated_read_time,
    ]);

    return NextResponse.json(
      { message: "Post added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add post" + error },
      { status: 500 }
    );
  }
}
