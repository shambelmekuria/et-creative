"use server"
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import { getToken } from "./token";


export const fetchDashboard = async() =>{
    const token = await getToken();
    try{
        const res = await axios.get(`${DJANGO_BASE_URL}/api/dashboard`,{headers:{Authorization:`Bearer ${token}`}});
        return {approved:res.data.product_status.approved,pending:res.data.product_status.pending,rejected:res.data.product_status.rejected,totalProduct:res.data.total_product}
    }
    catch{
        
        return {error:"fetching Error"}
    }
}