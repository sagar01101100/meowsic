import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../../lib/mongodb";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    // Await the params before destructuring
    const { username } = await context.params;

    if (!username) {
      return NextResponse.json({ error: "Username is missing" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const songs = await db
      .collection("songs")
      .find({ addedBy: username })
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`Fetched ${songs.length} song(s) for user: ${username}`);
    

    return NextResponse.json({ songs });
  } catch (err) {
    console.error("Fetch songs error:", err);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}