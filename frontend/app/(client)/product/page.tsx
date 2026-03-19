import Footer from "@/components/common/footer";
import { HeroHeader } from "@/components/common/header";
import ProductList from "@/components/product-front-page/product-list";
import { DJANGO_BASE_URL } from "@/config/defualt";
import axios from "axios";
import React from "react";


export default async function ProductPage() {
  let data = [];
  try {
    const res = await axios.get(`${DJANGO_BASE_URL}/api/product-list/`);
    data = res.data.products;
  } catch (error) {
    return <h1>Can`t fetch product Error ,{`${error}`}</h1>;
  }
  return (
    <>
      <HeroHeader />
      <div className="max-w-7xl mx-auto pt-24 px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Product List</h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
         <ProductList />
      </div>
     
      <Footer />
    </>
  );
}
