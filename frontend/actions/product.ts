"use server"
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import { getToken } from "./token";
import { revalidatePath } from "next/cache";
import { Product } from "@/types/products";

export async function fetchProduct() {
    try {
        const token = await getToken()
        const res = await axios.get(`${DJANGO_BASE_URL}/api/product/`, {
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

export async function setProduct(data:Product, id?: string) {
    const token = await getToken()
    // Update Product
    if (id) {
        try {
            const res = axios.put(`${DJANGO_BASE_URL}/api/product/${id}/`, data, {
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
            const res = axios.post(`${DJANGO_BASE_URL}/api/product/`, data, {
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


export async function deleteProduct(id: string) {
    try {
        const token = await getToken()
        await axios.delete(`${DJANGO_BASE_URL}/api/product/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        revalidatePath("/admin/product");
        return { success: true }
    }
    catch {
        return {
            message: "Deleting Error",
            success: false
        }
    }

}