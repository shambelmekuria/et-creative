"use client";
import React, { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { setProduct } from "@/actions/product";
import { useRouter } from "next/navigation";
import { Product } from "@/types/products";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductSchema = z.object({
  // Product Related
  name: z.string().min(2, "required"),
  description: z.string().min(1, "Required"),
  price: z.string().min(3),
  code: z.string().min(3),
  // Seler Related
  saler_name: z.string().min(1, "Required"),
  saler_location: z.string(),
  saler_email: z.email(),
  saler_telegram_url: z.url(),
  saler_phone: z
    .string()
    .trim()
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  // Additional Info
  status: z.enum(["approved", "pending", "rejected"]),
  is_sold: z.boolean(),
});

type ProductFormProps = {
  product?: Product;
};
export default function ProductForm({ product }: ProductFormProps) {
  const [openProductForm, setOpenProductForm] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
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
        name: "",
        code: "",
        price: "",
        description: "",
      },
  });
  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    if (product) {
      const res = await setProduct(data, product.id);
      if (res.success) {
        setOpen(false);
        form.reset();
        router.refresh();
      }
    } else {
      const res = await setProduct(data);
      if (res.success) {
        setOpen(false);
        form.reset();
        router.refresh();
      }
    }
  }
  return (
    <div>
      <form
        id="Product"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3  md:max-w-xl"
      >
        <FieldGroup>
          <Tabs defaultValue="product">
            <TabsList>
              <TabsTrigger
                value="product"
                onClick={() => setOpenProductForm(true)}
              >
                Product Detail
              </TabsTrigger>
              <TabsTrigger
                value="saler"
                onClick={() => setOpenProductForm(true)}
              >
                Saler Detail
              </TabsTrigger>
              {/* {product && (
                <TabsTrigger
                  value="gallery"
                  onClick={() => setOpenProductForm(false)}
                >
                  Product Gallery
                </TabsTrigger>
              )} */}
              <TabsTrigger
                value="gallery"
                onClick={() => setOpenProductForm(false)}
              >
                Product Gallery
              </TabsTrigger>
            </TabsList>
            <TabsContent value="product">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Track performance and user engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="product-name">
                            Product Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="product-name"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
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
                          <FieldLabel htmlFor="Product-code">code</FieldLabel>
                          <Input
                            {...field}
                            id="Product-code"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
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
                          <FieldLabel htmlFor="Product-price">
                            price (Sub City)
                          </FieldLabel>
                          <Input
                            {...field}
                            id="Product-price"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="Product-description">
                            description
                          </FieldLabel>
                          <Input
                            {...field}
                            id="Product-description"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-description">
                          Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id="form-rhf-demo-description"
                            placeholder="I'm having an issue with the login button on mobile."
                            rows={6}
                            className="min-h-24 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                              {field.value.length}/100 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                          Include steps to reproduce, expected behavior, and
                          what actually happened.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saler">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Track performance and user engagement metrics. Monitor
                    trends and identify growth opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  Page views are up 25% compared to last month.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    Generate and download your detailed reports. Export data in
                    multiple formats for analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  You have 5 reports ready and available to export.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {openProductForm && (
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="Product">
                Submit
              </Button>
            </Field>
          )}
        </FieldGroup>
      </form>
    </div>
  );
}
