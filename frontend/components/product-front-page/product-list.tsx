"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Map, MapPin } from "lucide-react";
import { apidata } from "./apidata";
import { tabList } from "./tab";
import { Badge } from "../ui/badge";
type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};


export default function ProductList() {
  const [active, setActive] = React.useState(1);
  const [data, setData] = React.useState<Product[]>(apidata);

  React.useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);
  return (
    <div className="my-8 px-4">
      <div className="flex gap-2 flex-wrap items-center">
        {tabList.map((btn, index) => (
          <Button
            variant={active === index + 1 ? "default" : "secondary"}
            className="rounded"
            onClick={() => {
              setActive(index + 1);
              setData(
                 btn.category === "all"
                  ? apidata
                  : apidata.filter((item) => item.category === btn.category),
              );
            }}
            key={index}
          >
            {btn.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8 my-8 ">
        {
        data.length === 0 ?<p className="text-muted-foreground">No Product Founds</p>:data.map((product: any) => (
          <Card key={product.id} className="gap-1 py-0 rounded-md overflow-hidden">
            <div className="relative aspect-square w-full ">
              <Image src="/image/img-2.jpg" alt={product.name} fill />
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
                <p className="flex gap-2 items-center text-muted-foreground text-xs">
                <MapPin className="inline-block  text-muted-foreground h-3 w-3" />
                Addis Ababa
              </p>
              <Badge variant="secondary" className="h-6 px-2 rounded capitalize">
                {product.category}
              </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
