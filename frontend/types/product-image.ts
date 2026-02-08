export type ProductImageCreate = {
  product: string;
  alt_text: string;
  image: File;
  order: number;
  is_main: boolean;
};

export type ProductImage = {
  id: string;
  product: string;
  alt_text: string;
  image: string; // URL
  order: number;
  is_main: boolean;
  created_at: string;
  updated_at: string;
};


export type ProductImageResponse = ProductImage[]
