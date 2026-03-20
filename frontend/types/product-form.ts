import { Location } from "@/types/location";
import { ProductImage } from "@/types/product-image";
import { Product } from "@/types/products";

export type RawCategory = {
  id: string;
  name: string;
  slug: string;
};
export type ProductFormProps = {
  product?: Product;
  product_id?: string;
  images?: ProductImage[];
  categories?: RawCategory[];
  locations?: Location[];
};

// It Useful for comes from API Data for UPDate
export type RawLocation = {
  id: string;
  name: string;
  region: string;
};

// Useful for filter for UI Components
export type LocationOption = {
  label: string;
  value: string;
};

export type CategoryOption = {
  label: string;
  value: string;
};

export type FormInputFieldProps = {
  control: any;
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

export type ComboboxInputFieldProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?:string | null;
  Options: LocationOption[];
  defaultValue: string | undefined;
  onFilter: (options: string[], search: string) => any[];
};
