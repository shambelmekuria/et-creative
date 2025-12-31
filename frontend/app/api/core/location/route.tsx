import { TOKEN_NAME } from "@/config/defualt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  return NextResponse.json({ message: "Location API is working", token: token || null }, { status: 200 });
}
