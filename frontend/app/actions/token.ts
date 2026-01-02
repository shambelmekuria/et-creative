import { REFRESH_TOKEN_NAME, TOKEN_AGE, TOKEN_NAME } from "@/config/defualt";
import { cookies } from "next/headers";


export async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get(TOKEN_NAME)?.value
}

export async function getRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get(REFRESH_TOKEN_NAME)?.value
}

export async function setToken(token: string) {
    const cookieStore = await cookies()
    return cookieStore.set(TOKEN_NAME, token, {
        sameSite: "none",
        secure: true,
        maxAge: TOKEN_AGE,
        path: "/",
    })
}

export async function setRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get(REFRESH_TOKEN_NAME)?.value
}

export async function deleteToken() {
    const cookieStore = await cookies()
    cookieStore.delete(TOKEN_NAME)
    return cookieStore.delete(REFRESH_TOKEN_NAME)
}