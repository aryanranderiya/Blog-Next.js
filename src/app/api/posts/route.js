import { NextResponse } from "next/server";
import { posts } from "../posts";

export async function GET() {
  return NextResponse.json(posts);
}
