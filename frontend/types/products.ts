export type Product = {
  id?: string
  name: string
  description: string
  price: number
  code: string
  saler_name: string
  // saler_location: Location
  saler_location: string,
  category:string,
  saler_email: string
  saler_phone: string
  seller_telegram_username?: string
  status: 'approved' | 'pending' | 'rejected'
  is_sold: boolean
  created_at?: string
  update_at?: string
}

export type ProductResponse = Product[]
