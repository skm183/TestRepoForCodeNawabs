import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getAuthToken } from "@/lib/auth";

export async function GET() {
  const token = await getAuthToken();
  
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({
    userId: payload.userId,
    email: payload.email,
  });
}