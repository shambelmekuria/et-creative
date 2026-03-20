import { fetchCategories } from "@/actions/category";
import { fetchLocation } from "@/actions/location";
import ProductFormMain from "@/components/forms/product-form/form";
type Category = {
  id: string;
  name: string;
  slug: string;
};
export default async function ProductAddPage() {
  const categories: Category[] = await fetchCategories();
  const locations = await fetchLocation();
  return (
    <>
      <ProductFormMain categories={categories} locations={locations} />
    </>
  );
}
