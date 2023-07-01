import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const { NEXTAUTH_SECRET } = process.env;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: NEXTAUTH_SECRET, raw: true });

  return NextResponse.json({ token }, { status: 200 });
};
