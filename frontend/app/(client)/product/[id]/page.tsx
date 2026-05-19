import { HeroHeader } from "@/components/common/header";
import ProductDetail from "@/components/product-front-page/product-detail";
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function ProductDetailPage({ params }: Props) {
  const product_id = (await params).id;

  const product = await axios.get(`${DJANGO_BASE_URL}/api/product-detail/6/`);

  return <div>
    <HeroHeader/>
    <ProductDetail/>
  </div>;
}
