"use server"
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import { getToken } from "./token";
import { revalidatePath } from "next/cache";

export async function fetchCategories() {
    try {
        const token = await getToken()
        const res = await axios.get(`${DJANGO_BASE_URL}/api/category/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    }
    catch {
        return { message: "Fetching Error", success: false }
    }
}

export async function setCategories(data: { name: string, slug: string }, id?: number) {
    const token = await getToken()
    // Update category
    if (id) {
        try {
            const res = axios.put(`${DJANGO_BASE_URL}/api/category/${id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { success: true }
        }
        catch {
            return { message: "updating Error", success: false }
        }
    }
    // Create New
    else {
        try {
            const res = axios.post(`${DJANGO_BASE_URL}/api/category/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return { success: true }
        }
        catch {
            return { message: "creating error", success: false }
        }
    }

}


export async function deleteCategory(id: number) {
    try {
        const token = await getToken()
        await axios.delete(`${DJANGO_BASE_URL}/api/category/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        revalidatePath("/admin/category");
        return { success: true }
    }
    catch {
        return {
            message: "Deleting Error",
            success: false
        }
    }

}