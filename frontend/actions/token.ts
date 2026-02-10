'use server'
import { REFRESH_TOKEN_NAME, TOKEN_NAME } from "@/config/defualt";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type decodeTokenValues = {
  exp: number,
  role: string,
  username: string
}

export async function getToken() {
 try{
   const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
 }
 catch{
  redirect('/login')
 }
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value;
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  return cookieStore.delete(REFRESH_TOKEN_NAME);
}

export async function isTokenExpiredOrInvalid() {
  const token = await getToken();
  if (!token){
    redirect('/login')
  }
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (decoded.exp * 1000 < Date.now()) {
      return { tokenExpired: true };
    }
    return { tokenExpired: false };
  } catch {
    return { tokenExpired: true };
  }
}


// export async function isTokenExpiredOrInvalid() {
//   const token = await getToken();
//   let decoded: decodeTokenValues;
//   if (!token) return { tokenExpired: true }
//   try {
//     decoded = jwtDecode<decodeTokenValues>(token);
//   }
//   catch (err) {
//     return {  tokenExpired: true }
//   }

//   // Expired token , Rewrite to refresh API
//   if (decoded.exp * 1000 < Date.now()) {
//     return { tokenExpired: true }
//   }
//   return { tokenExpired: false }
// }
