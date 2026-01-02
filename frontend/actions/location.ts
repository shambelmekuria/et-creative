import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import { getToken } from "./token";

export async function fetchLocation() {
    try {
        const token = await getToken()
        const res = await axios.get(`${DJANGO_BASE_URL}/api/locations/`, {
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

export async function setLocation(data: { name: string, region: string, zone: string, wereda: string }, id?: number) {
    const token = await getToken()
    // Update Location
    if (id) {
        try {
            const res = axios.put(`${DJANGO_BASE_URL}/api/locations/${id}/`, data, {
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
            const res = axios.post(`${DJANGO_BASE_URL}/api/locations/`, data, {
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


export async function deleteLocation(id: number) {
    try {
        const token = await getToken()
        const res = await axios.delete(`${DJANGO_BASE_URL}/api/locations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            success: true
        }
    }
    catch {
        return {
            message: "Deleting Error",
            success: false
        }
    }

}