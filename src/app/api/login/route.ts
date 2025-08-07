import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcryptjs"; // Use bcryptjs in edge-compatible apps

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check hashed password
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    // }

    // Create a response with auth-token cookie
    const response = NextResponse.json({
      message: "Login successful",
      username: user.username,
    });

    // Set cookie (here just a dummy token – replace with JWT if needed)
    response.cookies.set("auth-token", `${user._id}`, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
