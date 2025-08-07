import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the auth-token cookie
  response.cookies.set("auth-token", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
