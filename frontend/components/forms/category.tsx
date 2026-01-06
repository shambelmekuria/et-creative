"use client";
import React, { useState } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { setCategories } from "@/actions/category";
import { Button } from "../ui/button";

const categorySchema = z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(3),
});
export type category = {
    id: number;
    name: string;
    slug:string;

};

type categoryFormProps = {
    category?: category;
};
export default function CategoryForm({ category }: categoryFormProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema), defaultValues: category ? { name: category.name, slug:category.slug} : { name: "",slug:""}
    });
    async function onSubmit(data: z.infer<typeof categorySchema>) {
        if (category) {
            const res = await setCategories(data, category.id);
            if (res.success) {
                setOpen(false);
                form.reset()
                router.refresh()
            }
        } else {
            console.log("from form",data)
            const res = await setCategories(data);
            if (res.success) {
                setOpen(false);
                form.reset()
                router.refresh()
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {category ? (<Button variant="ghost" className="font-normal flex items-center justify-start w-full mx-0"> Edit</Button>) : (<Button> Add Category</Button>)}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle> {category ? "Edit Category" : "Add Category"}</DialogTitle>
                    <DialogDescription>
                        {category ? "Edit the category details and save the changes." : "Fill the form below to add a new category."}
                    </DialogDescription>
                </DialogHeader>
                <form id="category-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-3" >
                    <FieldGroup>
                          <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="category-name">
                                        Category Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="category-name"
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
                            name="slug"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="slug">
                                        Slug
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="slug"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="category-form">{category ? "Save changes" : "Save"}</Button>
                </DialogFooter>
                
            </DialogContent>

        </Dialog>
    );
}
