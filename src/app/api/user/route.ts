import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection("users").findOne({ username });

    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const user = await db.collection("users").insertOne({ username, password, songs: [] });
    return NextResponse.json({ message: "User created", userId: user.insertedId });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
