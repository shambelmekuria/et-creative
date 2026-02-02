import { Location } from "./location"
export type Product = {
  id?: string
  name: string
  description: string
  price: number
  code: string
  saler_name: string
  // saler_location: Location
  saler_location: string
  saler_email: string
  saler_phone: string 
  saler_telegram_url: string
  status: 'approved'| 'pending' | 'rejected'
  is_sold: boolean
  created_at?: string 
  update_at?: string
}

export type ProductResponse = Product[]
