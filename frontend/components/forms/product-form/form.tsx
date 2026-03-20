"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/lib/shemas";
import { useEffect, useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { setProduct } from "@/actions/product";
import ProductImageForm from "../product-image/form";
import ProductImageDisplay from "@/components/product/product-image-display";
import { ProductFormProps, RawLocation } from "../../../types/product-form";
import useCategoryOption from "@/hooks/use-category-option";
import useLocationOption from "@/hooks/use-location-option";
import { steps } from "@/utils/product-form/form-step";
import { getDefaultValues } from "@/utils/product-form/get-defualt-values";
import { createFilter } from "@/utils/product-form/create-filter";
import FormInputField from "./FormInputField";
import StepProgress from "./step-progress";
import ComboboxInputField from "./ComboboxInputField";
import FormSelectField from "./FormSelectField";

type FormValues = z.infer<typeof ProductFormSchema>;
type FieldName = keyof FormValues;

const status = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
] as const;
export default function ProductFormMain({
  product,
  product_id,
  images,
  categories,
  locations,
}: ProductFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: getDefaultValues(product),
  });
  // Used to manage defualt Values for update
  let salerLocationInputValue = null;
  let categoryInputValue = null;
  const { categoriesOption } = useCategoryOption(categories ?? []);
  const { locationsOption } = useLocationOption(locations ?? []);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const delta = currentStep - previousStep;
  const category = categoriesOption.find(
    (item) => item.value == product?.category,
  );
  categoryInputValue = category?.label;
  const location = locationsOption.find(
    (item) => item.value == product?.saler_location,
  );
  salerLocationInputValue = location?.label;

  const handleLocationFilter = createFilter(locationsOption);
  const handleCategoriesFilter = createFilter(categoriesOption);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (product_id) {
        const res = await setProduct(data, product_id);
        toast.success("Product updated successfully");
      } else {
        const res = await setProduct(data);
        toast.success("Product saved successfully");
      }

      router.push("/admin/products");
    } catch (error) {
      toast.error("Unexpected error. Please refresh the page.");
      router.refresh();
    }
  };

  const next = async () => {
    const fields = steps[currentStep - 1].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep <= steps.length) {
      if (currentStep === steps.length) {
        await form.handleSubmit(onSubmit)();
        return;
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <div>
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Product</TabsTrigger>
            {product && (
              <TabsTrigger value="gallery">Add Product Gallery</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="products">
            <div className="space-y-3 mb-3 p-4">
              <h1 className="font-medium text-xl">Add Product</h1>
              <p className="text-muted-foreground text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </div>
            <div className="flex flex-col justify-between w-full md:max-w-3xl gap-3">
              <StepProgress currentStep={currentStep} />
              <form className="mt-3 w-full">
                {currentStep == 1 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FieldGroup>
                      <div className="grid  grid-cols-1 md:grid-cols-2 gap-3">
                        <FormInputField
                          name="name"
                          label="Product Name"
                          placeholder="Enter Product Name"
                          type="text"
                          control={form.control}
                        />
                        <FormInputField
                          name="code"
                          label="Code"
                          placeholder="Enter Code"
                          type="text"
                          control={form.control}
                        />

                        <Controller
                          name="price"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Price</FieldLabel>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  const v = e.target.valueAsNumber;
                                  field.onChange(isNaN(v) ? 0 : v);
                                }}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="is_sold"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldLabel>
                              <Field orientation="horizontal">
                                <Checkbox
                                  id="is_sold"
                                  checked={field.value}
                                  onCheckedChange={(value) =>
                                    field.onChange(!!value)
                                  }
                                />
                                <FieldContent>
                                  <FieldTitle>Product Sold</FieldTitle>
                                  <FieldDescription>
                                    Mark this if the product has already been
                                    sold.
                                  </FieldDescription>
                                </FieldContent>
                              </Field>
                            </FieldLabel>
                          )}
                        />
                        <FormSelectField
                          name="status"
                          control={form.control}
                          label="Status"
                          description="Choose the product’s approval status."
                          placeholder="Select Status"
                          options={status}
                        />
                        <Controller
                          name="status"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              orientation="vertical"
                              data-invalid={fieldState.invalid}
                            >
                              <FieldContent>
                                <FieldLabel htmlFor="status">Status</FieldLabel>
                                <FieldDescription>
                                  Choose the product’s approval status.
                                </FieldDescription>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger
                                  id="status"
                                  aria-invalid={fieldState.invalid}
                                >
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                  <SelectSeparator />
                                  {status.map((status) => (
                                    <SelectItem
                                      key={status.value}
                                      value={status.value}
                                    >
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </Field>
                          )}
                        />
                        <ComboboxInputField
                          name="category"
                          control={form.control}
                          label="Category"
                          placeholder="Search Categorie..."
                          description="Lorem ipsum dolor sit."
                          defaultValue={categoryInputValue}
                          onFilter={handleCategoriesFilter}
                          Options={categoriesOption}
                        />
                      </div>

                      <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Description</FieldLabel>

                            <InputGroup>
                              <InputGroupTextarea
                                {...field}
                                rows={5}
                                aria-invalid={fieldState.invalid}
                              />
                              <InputGroupAddon align="block-end">
                                <InputGroupText>
                                  {field.value?.length ?? 0}/100
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </motion.div>
                )}
                {currentStep == 2 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FieldGroup>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <FormInputField
                          name="saler_name"
                          label="Saler Name"
                          placeholder="Enter Saler Name"
                          type="text"
                          control={form.control}
                        />
                        <FormInputField
                          name="saler_email"
                          label="Saler Email"
                          placeholder="Enter Saler Email"
                          type="text"
                          control={form.control}
                        />
                        <FormInputField
                          name="saler_phone"
                          label="Saler Phone"
                          placeholder="Enter Saler Phone"
                          type="text"
                          control={form.control}
                        />
                        <FormInputField
                          name="seller_telegram_username"
                          label="Telegram Username"
                          placeholder="Enter Telegram Username"
                          type="text"
                          control={form.control}
                        />
                        <ComboboxInputField
                          name="saler_location"
                          control={form.control}
                          label="Saler Location"
                          placeholder="Search Saler Location..."
                          defaultValue={salerLocationInputValue}
                          onFilter={handleLocationFilter}
                          Options={locationsOption}
                        />
                      </div>
                    </FieldGroup>
                  </motion.div>
                )}
                <div className="mt-8 flex justify-between gap-3">
                  <Button
                    type="button"
                    disabled={currentStep === 1}
                    onClick={prev}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={next}>
                    {currentStep == steps.length ? "Save" : "Next"}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="gallery" id="gallery">
            <div className="px-4 mt-4">
              <h1 className="text-xl font-bold">Gallery</h1>
              <p className="text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempore, sint.
              </p>
              {images && <ProductImageDisplay images={images} />}
              <ProductImageForm product_id={product_id} mode="create" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
