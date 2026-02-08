"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { toast } from "sonner";
import { Pen, Upload, X } from "lucide-react";
import * as z from "zod";
import { setItem } from "@/actions/product-image";
import { ProductImage } from "@/types/product-image";
import { useRouter } from "next/navigation";

const baseSchema = {
  product: z.string(),
  alt_text: z.string().min(10, "Alt Text must be at least 10 characters."),
  order: z.number().min(0, "Not less than 0"),
  is_main: z.boolean(),
};

export const createSchema = z.object({
  ...baseSchema,
  images: z
    .array(z.custom<File>())
    .min(1, "Please select at least one image")
    .max(2, "Please select up to 2 images")
    .refine(
      (images) => images.every((image) => image.size <= 5 * 1024 * 1024),
      {
        message: "Image size must be less than 5MB",
        path: ["images"],
      },
    ),
});

export const updateSchema = z.object({
  ...baseSchema,
  images: z
    .array(z.custom<File>())
    .max(2, "Please select up to 2 images")
    .refine(
      (images) => images.every((image) => image.size <= 5 * 1024 * 1024),
      {
        message: "Image size must be less than 5MB",
        path: ["images"],
      },
    )
    .optional(),
});

const formSchema = z.object({
  product: z.string(),
  images: z
    .array(z.custom<File>())
    .min(1, "Please select at least one image")
    .max(2, "Please select up to 2 images")
    .refine(
      (images) => images.every((image) => image.size <= 5 * 1024 * 1024),
      {
        message: "Image size must be less than 5MB",
        path: ["images"],
      },
    ),
  alt_text: z.string().min(10, "Alt Text must be at least 10 characters."),
  order: z.number().min(0, "Not less than 0"),
  is_main: z.boolean(),
});

type ProductImageFormProps = {
  mode: "create" | "update";
  product_id?: string;
  image_data?: ProductImage;
};

export default function ProductImageForm({
  product_id,
  image_data,
  mode,
}: ProductImageFormProps) {
  const schema = mode === "create" ? createSchema : updateSchema;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: image_data
      ? {
          product: String(image_data.product),
          alt_text: image_data.alt_text,
          order: image_data.order,
          is_main: image_data.is_main,
          images: [],
        }
      : {
          product: "",
          images: [],
          alt_text: "",
          order: 0,
          is_main: false,
        },
  });

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      // Validate max files
      const images = form.getValues("images") ?? [];
      if (images.length >= 2) {
        return "You can only upload up to 2 files";
      }

      // Validate file type (only images)
      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed";
      }

      // Validate file size (max 2MB)
      const MAX_SIZE = 9 * 1024 * 1024; // 9MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [form.getValues("images")],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    if (product_id !== undefined) formData.append("product", product_id);
    formData.append("alt_text", data.alt_text);
    formData.append("order", String(data.order));
    formData.append("is_main", String(data.is_main));
    // Append All Images
    // if (data.images) {
    //   formData.append("image", data.images[0]);
    // }

    if (
      data.images &&
      data.images.length > 0 &&
      data.images[0] instanceof File
    ) {
      formData.append("image", data.images[0]);
    }

    // data.images.forEach((file)=>formData.append('images',file))
    if (mode == "create") {
      const res = await setItem("api/product-image", formData);
      if (res.success) {
        toast.success("Product Images has been created");
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    }
    if (mode == "update") {
      const res = await setItem("api/product-image", formData, image_data?.id);
      if (res.success) {
        toast.success("Product Images has been updated");
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="rounded"
          variant={image_data ? "outline" : "default"}
        >
          {image_data ? (
            <span className="flex items-center gap-2 ">
              <Pen size={4} /> Edit Image
            </span>
          ) : (
            "Add Product Image"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Upload Product Images</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
          </SheetDescription>
        </SheetHeader>
        <form
          method="post"
          id="product-image-form"
          onSubmit={form.handleSubmit(onSubmit, (error) =>
            console.log("Error", error),
          )}
          className="flex-1 overflow-y-auto py-6 px-4"
        >
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Controller
                name="alt_text"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="alt-text">Alt Text</FieldLabel>
                    <Input
                      {...field}
                      id="alt-text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Alt Text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="order"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="order">Display order</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      id="order"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Lower numbers appear first.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="is_main"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                      id="is_main"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(!!value)}
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        Set as Featured Image
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Sets the selected image as the featured image.
                      </p>
                    </div>
                  </FieldLabel>
                </Field>
              )}
            />

            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel> Image</FieldLabel>
                  <FileUpload
                    value={field.value}
                    onValueChange={field.onChange}
                    onFileValidate={onFileValidate}
                    onFileReject={onFileReject}
                    accept="image/*"
                    maxFiles={1}
                    className="w-full max-w-md"
                  >
                    <FileUploadDropzone>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                          <Upload className="size-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm">
                          Drag & drop files here
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Or click to browse (max 2 files)
                        </p>
                      </div>
                      <FileUploadTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-fit"
                        >
                          Browse files
                        </Button>
                      </FileUploadTrigger>
                    </FileUploadDropzone>
                    <FileUploadList>
                      {(field.value ?? []).map((file) => (
                        <FileUploadItem key={file.name} value={file}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <X />
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                  <FieldDescription>Upload image up to 2MB.</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {image_data?.image && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Current Image
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                          <Image
                            src={image_data.image}
                            alt={image_data.alt_text}
                            fill
                            sizes="48px"
                            className="rounded object-cover grayscale dark:brightness-20"
                          />
                        </div>

                        <div className="space-y-1 text-xs">
                          <p className="font-semibold text-slate-900 dark:text-slate-50">
                            {image_data.alt_text}
                          </p>
                          <p className="text-muted-foreground">
                            Added:{" "}
                            {new Date(
                              image_data.created_at,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <SheetFooter>
          <Button type="submit" form="product-image-form">
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
