import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import ytdl from "@distube/ytdl-core";

export async function POST(req: NextRequest) {
  try {
    const { url, addedBy } = await req.json();

    if (!url || !addedBy) {
      return NextResponse.json({ error: "Missing URL or username" }, { status: 400 });
    }

    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const { title, videoId, lengthSeconds } = info.videoDetails;

    const song = {
      title,
      videoId,
      duration: parseInt(lengthSeconds),
      url,
      addedBy,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db();

    await db.collection("songs").insertOne(song);
    console.log("Song is added successfully.....")
    return NextResponse.json({ message: "Song added", song });
  } catch (error) {
    console.error("Error adding song:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
