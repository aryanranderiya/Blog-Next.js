import { posts } from "../../posts";
import { NextResponse } from "next/server";

export async function GET() {
  const simplifiedPosts = posts.map(({ id, title }) => ({ id, title }));
  return NextResponse.json(simplifiedPosts);
}
