import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "qts-next-backend",
    time: new Date().toISOString(),
  });
}
