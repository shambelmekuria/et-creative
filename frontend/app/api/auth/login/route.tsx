import { DJANGO_BASE_URL, REFRESH_TOKEN_NAME, TOKEN_NAME } from "@/config/defualt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
const TOKEN_AGE = 3600;
type DecodedValues = {
  username: string;
  fullname: string;
  role: string;
};

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const response = await axios.post(`${DJANGO_BASE_URL}/api/token/`, data);
    const { access, refresh } = response.data;
    // decoded/translate token to readable format
    const decoded = jwtDecode<DecodedValues>(`${access}`);
    // Send access token to cookies browser storage
    const res = NextResponse.json({ fullname: decoded.fullname, username: decoded.username, role: decoded.role, login: true }, { status: 200 });
    
    const isProduction = process.env.NODE_ENV === "production";
    res.cookies.set({
      name: TOKEN_NAME,
      value: access,
      httpOnly: true,
      sameSite: "none",           // keep if you really need cross-site
      secure: isProduction,       // false in dev (http), true in prod (https)
      maxAge: TOKEN_AGE,
      path: "/",
    });

    res.cookies.set({
      name: REFRESH_TOKEN_NAME,
      value: refresh,
      httpOnly: true,
      sameSite: "none",
      secure: isProduction,
      maxAge: TOKEN_AGE * 24 * 7, // usually refresh lives longer
      path: "/",
    });
    return res;
  } catch (error) {
    return NextResponse.json({ login: false }, { status: 401 });
  }
}
