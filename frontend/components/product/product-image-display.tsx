import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductImage } from "@/types/product-image";
import ProductImageForm from "../forms/product-image/form";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { DeleteProductImage } from "./delete-product-image-dialog";

export default function ProductImageDisplay({images}: {images: ProductImage[],}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-3">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg">
            <Image
              src={image.image}
              alt={image.alt_text}
              fill
              className="rounded-lg object-cover"
            />
          </AspectRatio>
          <div
            className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-40 bg-black/50"
          >
            <DeleteProductImage  product_image_id={image.id} />
            <ProductImageForm image_data={image} mode="update" />
          </div>
        </div>
      ))}
    </div>
  );
}
