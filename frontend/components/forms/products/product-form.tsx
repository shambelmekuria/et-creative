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
import { Controller, FormProvider, useForm } from "react-hook-form";
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
} from "@/components/ui/input-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDetail from "./product-detail";
import useMultStepForm from "@/hooks/useMultStepForm";
import SalerDetail from "./saler-details";

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
        mode: "onChange",
  });
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultStepForm([<ProductDetail />, <SalerDetail />]);
async function onSubmit(data: z.infer<typeof ProductSchema>) {
    console.log("Submit Clicked");
    // if (!isLastStep) {
    //   await form.trigger(); // validate current step
    //   next();
    //   return;
    // }
    if (!isLastStep) {
      await form.trigger(); // validate current step
      return next();
    }

    console.log("FINAL DATA ✅", data);
  }
  return (
    <div>
      <FormProvider {...form}>
        <form
          id="product"
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3  md:max-w-xl"
        >
          <FieldGroup>
            {step}

            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              {!isFirstStep && (
                <Button onClick={back} type="button">
                  Back
                </Button>
              )}
              <Button type="submit" form="product">
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
}
