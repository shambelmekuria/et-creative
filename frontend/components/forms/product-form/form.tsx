"use client";
import { matchSorter } from "match-sorter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/types/products";
import { ProductFormSchema } from "@/lib/shemas";
import { useEffect, useState } from "react";
import * as Combobox from "@diceui/combobox";
import { Check, ChevronDown } from "lucide-react";
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
import { fetchLocation } from "@/actions/location";
import { useRouter } from "next/navigation";
import { setProduct } from "@/actions/product";
import ProductImageForm from "../product-image/form";
import { ProductImage, ProductImageResponse } from "@/types/product-image";
import ProductImageDisplay from "@/components/product/product-image-display";

type FormValues = z.infer<typeof ProductFormSchema>;
type ProductFormProps = {
  product?: Product;
  product_id: string;
  images: ProductImage[];
};

const steps = [
  {
    id: "Step 1",
    name: "Product Information",
    fields: ["name", "code", "price", "description", "status", "is_sold"],
  },
  {
    id: "Step 2",
    name: "Saler Information",
    fields: [
      "saler_name",
      "saler_location",
      "saler_email",
      "saler_phone",
      "saler_telegram_url",
    ],
  },
];

const status = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
] as const;

type RawLocation = {
  id: string;
  name: string;
  region?: string;
};
type LocationOption = {
  label: string;
  value: string;
};

export default function ProductFormMain({ product, product_id ,images}: ProductFormProps) {
  const [rawLocations, setRawLocations] = useState<RawLocation[]>([]);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [salerLocationInputValue, setSalerLocationInputValue] = useState<
    string | undefined
  >(""); // For Update
  const delta = currentStep - previousStep;

  // Custom filter logic
  // Solutions #1
  function onFilter(optionValues: string[], inputValue: string) {
    if (!inputValue) return optionValues;
    const search = inputValue.toLowerCase();
    return locations
      .filter(
        (item) =>
          optionValues.includes(item.value) &&
          item.label.toLowerCase().includes(search),
      )
      .map((item) => item.value);
  }

  // Solutions #2
  const handleFilter = (options: string[], search: string) => {
    // 1. Map the string values back to their full objects
    const itemsToFilter = locations.filter((item) =>
      options.includes(item.value),
    );
    // 2. Use match-sorter (or .filter) to search specifically on the 'label' key
    const filtered = matchSorter(itemsToFilter, search, {
      keys: ["label"],
      threshold: matchSorter.rankings.MATCHES,
    });
    // 3. Return the array of values (IDs) that matched
    return filtered.map((item) => item.value);
  };
  async function fetchLocationChoice() {
    const res = await fetchLocation();
    setRawLocations(res);
  }

  useEffect(() => {
    fetchLocationChoice();
  }, []);
  const locations: LocationOption[] = rawLocations.map((item) => ({
    label: `${item?.name} - ${item?.region}`,
    value: String(item?.id),
  }));

  useEffect(() => {
    const location = locations.find(
      (loc) => loc.value === product?.saler_location,
    );
    setSalerLocationInputValue(location?.label);
  }, [product, locations]);

  // Set Location

  const form = useForm<FormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: product
      ? {
          // Product Related
          name: product.name,
          description: product.description,
          code: product.code,
          price: product.price,
          // Saler Related
          saler_name: product.saler_name,
          saler_location: product.saler_location,
          saler_email: product.saler_email,
          saler_phone: product.saler_phone,
          saler_telegram_url: product.saler_telegram_url,
          // Aditional Info and Status
          status: product.status,
          is_sold: product.is_sold,
        }
      : {
          // Product Related
          name: "",
          description: "",
          code: "",
          price: 0,
          // Saler Related
          saler_name: "",
          saler_location: "",
          saler_email: "",
          saler_phone: "",
          saler_telegram_url: "",
          // Aditional Info and Status
          status: "pending",
          is_sold: false,
        },
  });
  type FieldName = keyof FormValues;

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
      console.log("Error", error);
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
              <nav aria-label="Progress" className="mb-3">
                <ol
                  role="list"
                  className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                  {steps.map((step, index) => (
                    <li key={step.name} className="md:flex-1">
                      {currentStep > index + 1 ? (
                        <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-sky-600 transition-colors ">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : currentStep === index + 1 ? (
                        <div
                          className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                          aria-current="step"
                        >
                          <span className="text-sm font-medium text-sky-600">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : (
                        <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-gray-500 transition-colors">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              <form className="mt-3 w-full">
                {currentStep == 1 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FieldGroup>
                      <div className="grid  grid-cols-1 md:grid-cols-2 gap-3">
                        <Controller
                          name="name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Product Name</FieldLabel>
                              <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="code"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Code</FieldLabel>
                              <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
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
                        <Controller
                          name="saler_name"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Saler Name</FieldLabel>
                              <Input
                                type="text"
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="saler_email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Saler Email</FieldLabel>
                              <Input
                                type="text"
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="saler_phone"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Saler Phone</FieldLabel>
                              <Input
                                type="text"
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="saler_telegram_url"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel>Telegram URL</FieldLabel>
                              <Input
                                type="text"
                                {...field}
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="saler_location"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field
                              orientation="vertical"
                              data-invalid={fieldState.invalid}
                            >
                              <FieldContent>
                                <FieldLabel htmlFor="saler_location">
                                  Saler Location
                                </FieldLabel>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </FieldContent>
                              <Combobox.ComboboxRoot
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={salerLocationInputValue}
                                // onFilter={handleFilter}
                                onFilter={handleFilter}
                              >
                                <Combobox.ComboboxAnchor className="flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 shadow-xs transition-colors data-focused:ring-1 data-focused:ring-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:data-focused:ring-zinc-300">
                                  <Combobox.ComboboxInput
                                    placeholder="Search Location..."
                                    className="flex h-9 w-full rounded-md bg-transparent text-base text-zinc-900 placeholder:text-zinc-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-zinc-50 dark:placeholder:text-zinc-400"
                                  />
                                  <Combobox.ComboboxTrigger className="flex shrink-0 items-center justify-center rounded-r-md border-zinc-200 bg-transparent text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50">
                                    <ChevronDown className="h-4 w-4" />
                                  </Combobox.ComboboxTrigger>
                                </Combobox.ComboboxAnchor>
                                <Combobox.ComboboxPortal>
                                  <Combobox.ComboboxContent className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[var(--dice-anchor-width)] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                                    <Combobox.ComboboxEmpty className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                      No tricks found.
                                    </Combobox.ComboboxEmpty>
                                    {locations.map((location) => (
                                      <Combobox.ComboboxItem
                                        key={location.value}
                                        value={location.value}
                                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50"
                                      >
                                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                          <Combobox.ComboboxItemIndicator>
                                            <Check className="h-4 w-4" />
                                          </Combobox.ComboboxItemIndicator>
                                        </span>
                                        <Combobox.ComboboxItemText>
                                          {location.label}
                                        </Combobox.ComboboxItemText>
                                      </Combobox.ComboboxItem>
                                    ))}
                                  </Combobox.ComboboxContent>
                                </Combobox.ComboboxPortal>
                              </Combobox.ComboboxRoot>
                            </Field>
                          )}
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
              <ProductImageDisplay images={images}/>
              <ProductImageForm product_id={product_id} mode="create"/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
