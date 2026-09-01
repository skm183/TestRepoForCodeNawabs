import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/auth";

export async function middleware(request: any) {
  const token = await getAuthToken();
  
  // If user is not authenticated and trying to access dashboard, redirect to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (token && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // If user is not authenticated and trying to access root, redirect to login
  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};