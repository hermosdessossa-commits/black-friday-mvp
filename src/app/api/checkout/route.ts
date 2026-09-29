import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { items } = await request.json();
  const sessionId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  return NextResponse.json({ url: `/success?session_id=${sessionId}` });
}