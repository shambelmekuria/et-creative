import { fetchCategories } from "@/actions/category";
import { fetchProduct } from "@/actions/product";
import ProductFormMain from "@/components/forms/product-form/form";
import React from "react";

export default async function ProductUpatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const data = await fetchProduct(productId);
  const categories = await fetchCategories()
  return (
    <ProductFormMain
      product={{
        name: data.name,
        description: data.description,
        code: data.code,
        price: Number(data.price),
        category: String(data.category_detail.id),
        saler_name: data.saler_name,
        saler_location: String(data.saler_location_detail.id),
        saler_email: data.saler_email,
        saler_phone: data.saler_phone,
        seller_telegram_username: data.seller_telegram_username,
        status: data.status,
        is_sold: data.is_sold,
      }}
      product_id={productId}
      images = {data.images}
      categories = {categories}
    />
  );
}
