import {z} from 'zod'
export const ProductFormSchema = z.object({
  // Product Related
  name: z.string().min(2, "required"),
  description: z.string().min(1, "Required"),
  price: z.number(),
  code: z.string().min(3),
  // Seler Related
  saler_name: z.string().min(1, "Required"),
  saler_location: z.string().min(1, "Saler location is required"),
  saler_email: z.email(),
  seller_telegram_username: z.string().optional(),
  saler_phone: z
    .string()
    .trim()
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  // Additional Info
  status: z.enum(["approved", "pending", "rejected"]),
  is_sold: z.boolean(),
});