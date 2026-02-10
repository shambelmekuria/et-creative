"use server"
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { getToken, isTokenExpiredOrInvalid } from "./token";
import { redirect } from "next/navigation";

/*************************************/
/*   Fetching Items By Id or All      */
/************************************/
export async function fetchItems(endPoint: string, id?: string) {
    const URL = id ? `${DJANGO_BASE_URL}/${endPoint}/${id}` : `${DJANGO_BASE_URL}/${endPoint}/`;
    try {
        const token = await getToken()
        const res = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
        return res.data
    }
    catch (error) { return { message: "Fetching Error", success: false, error } }
}

/* 
    Delete Items By Its endpoings
*/
export async function deleteItem(endPoint: string, id: string) {
    try {
        const token = await getToken()
        await axios.delete(`${DJANGO_BASE_URL}/${endPoint}/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
        return { success: true }
    }
    catch { return { message: "Deleting Error", success: false } }

}

// ************************************************ //
// **           Create or Update Items             */
//*************************************************/

export async function setItem(endPoint: string, data: FormData, id?: string) {
 try{
       // ✅ Token check happens on server
        const token = await getToken();
        // Update Product
        if (id) {
            try {
                const res = await axios.patch(`${DJANGO_BASE_URL}/${endPoint}/${id}/`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
    
                revalidatePath(`/admin/product/${id}`);
                return { success: true }
            }
            catch {
                return { message: "updating Error", success: false }
            }
        }
        // Create New
        else {
            try {
                const res = await axios.post(`${DJANGO_BASE_URL}/${endPoint}/`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                revalidatePath(`/admin/product/${id}`);
                return { success: true }
            }
            catch {
                return { message: "creating error", success: false }
            }
        }
 }
 catch(error){
    console.log(error)
     return { message: "creating error", success: false }
 }
    }




// SWR fetcher

export const swrFetcher = async (url: string, id: string) => {
    const URL = id ? `${DJANGO_BASE_URL}/${url}/${id}` : `${DJANGO_BASE_URL}/${url}/`;
    const token = await getToken()

    const res = await axios.get(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return res.data
}


