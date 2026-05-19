"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Map, MapPin } from "lucide-react";
import { tabList } from "./tab";
import { Badge } from "../ui/badge";
import { DJANGO_BASE_URL } from "@/config/defualt";
import Link from "next/link";
type Product = {
  name: string;
  description: string;
  category: string;
  price: number;
  featured_image: string;
  saler_location: string;
};


export default function ProductList({productList}: {productList: Product[]}) {
  const [active, setActive] = React.useState(1);
  const [data, setData] = React.useState<Product[]>(productList);


  return (
    <div className="my-12 px-4 md:px-8">
      <div className="flex gap-2 flex-wrap items-center">
        {tabList.map((btn, index) => (
          <Button
            variant={active === index + 1 ? "default" : "secondary"}
            className="rounded"
            onClick={() => {
              setActive(index + 1);
              setData(
                 btn.category === "all"
                  ? productList
                  : productList.filter((item) => item.category === btn.category),
              );
            }}
            key={index}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 my-16 gap-6">
        {
        data.length === 0 ?<p className="text-muted-foreground">No Product Founds</p>:data.map((product: any,index) => (
         <Link href={`/product/${product.id}`} key={index}>
           <Card className="gap-1 py-0 rounded-md overflow-hidden">
            <div className="relative aspect-square w-full ">
              <Image src={
                product.featured_image  ? `${DJANGO_BASE_URL}${product.featured_image}`
                : "/images/placeholder.jpg"
              } alt={product.name} fill />
            </div>
            <CardHeader className="py-0 px-4">
              <CardTitle className="text-lg font-bold text-neutral-700 dark:text-neutral-100">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-0 px-4 flex flex-col gap-2 mb-4">
              <p className="font-bold text-green-500 text-xl">
                {product.price.toFixed(2)} ብር
              </p>
              <div className="flex items-center justify-between">
                <p className="flex gap-2 items-center text-muted-foreground text-xs ">
                <MapPin className="inline-block  text-muted-foreground h-3 w-3" />
               {product.saler_location}
              </p>
              <Badge variant="secondary" className="h-6 px-2 rounded capitalize">
                {product.category}
              </Badge>
              </div>
            </CardContent>
          </Card>
         </Link>
        ))}
      </div>
    </div>
  );
}
