import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  let client;

  try {
    client = await clientPromise;
  } catch (e) {
    console.error("❌ Failed to connect to MongoDB:", e);
    return NextResponse.json(
      { error: "Unable to connect to MongoDB" },
      { status: 500 }
    );
  }

  try {
    const db = client.db(process.env.MONGODB_DB || "your-db-name");

    // ✅ Ping the database
    const ping = await db.command({ ping: 1 });
    if (!ping.ok) {
      throw new Error("MongoDB ping failed");
    }

    console.log("✅ MongoDB connection successful")
    return NextResponse.json(
      { success: true, message: "✅ MongoDB connection successful" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error during DB ping:", err);
    return NextResponse.json(
      { error: "Database connection check failed" },
      { status: 500 }
    );
  }
}


