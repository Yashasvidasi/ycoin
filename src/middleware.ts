import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const ispublicpath = path === "/";

  const token = request.cookies.get("token")?.value || "";

  if (ispublicpath && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!ispublicpath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/home", "/api/coin"],
};
