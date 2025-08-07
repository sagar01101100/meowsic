// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that need protection
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the route is protected
  if (protectedRoutes.includes(pathname)) {
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      // Redirect to homepage if no auth token
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Enable middleware only for specific routes
export const config = {
  matcher:  ["/dashboard/:path*"], // Add more if needed
};
