import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await createUser(email, password, name);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 400 });
  }
}