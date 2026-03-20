import { ProductFormSchema } from "@/lib/shemas";
import { Product } from "@/types/products";
import {z} from 'zod'

type FormValues = z.infer<typeof ProductFormSchema>;
export const getDefaultValues = (product?: Product): FormValues =>
  product
    ? {
        name: product.name,
        description: product.description,
        code: product.code,
        price: product.price,
        category: product.category,
        saler_name: product.saler_name,
        saler_location: product.saler_location,
        saler_email: product.saler_email,
        saler_phone: product.saler_phone,
        seller_telegram_username: product.seller_telegram_username,
        status: product.status,
        is_sold: product.is_sold,
      }
    : {
        name: "",
        description: "",
        code: "",
        price: 0,
        category: "",
        saler_name: "",
        saler_location: "",
        saler_email: "",
        saler_phone: "",
        seller_telegram_username: "",
        status: "pending",
        is_sold: false,
      };