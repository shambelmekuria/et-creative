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
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { setLocation } from "@/actions/location";
import { useRouter } from "next/navigation";

const LocationSchema = z.object({
  name: z.string().min(2).max(100),
  region: z.string().min(3),
  zone: z.string().min(3),
  wereda: z.string().min(3),
});
export type location = {
  id: number;
  name: string;
  region: string;
  zone: string;
  wereda: string;
};

type LocationFormProps = {
  location?: location;
};
export default function LocationForm({ location }: LocationFormProps) {
  const [open, setOpen] = useState(false);
  const  router = useRouter()
  const form = useForm<z.infer<typeof LocationSchema>>({
    resolver: zodResolver(LocationSchema),
    defaultValues: location
      ? {
          name: location.name,
          region: location.region,
          zone: location.zone,
          wereda: location.wereda,
        }
      : {
          name: "",
          region: "",
          zone: "",
          wereda: "",
        },
  });
  async function onSubmit(data: z.infer<typeof LocationSchema>) {
    if (location) {
      const res = await setLocation(data, location.id);
      if (res.success) {
        setOpen(false);
        form.reset()
        router.refresh()
      }
    } else {
      const res = await setLocation(data);
      if (res.success) {
        setOpen(false);
        form.reset()
        router.refresh()
      }
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {location ? (
          <Button
            variant="ghost"
            className="font-normal flex items-center justify-start w-full mx-0">
            Edit
          </Button>
        ) : (
          <Button> Add Location</Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">
            {" "}
            {location ? "Edit Location" : "Add Location"}
          </SheetTitle>
          <SheetDescription>
            {location
              ? "Edit the location details and save the changes."
              : "Fill the form below to add a new location."}
          </SheetDescription>

          <form
            id="location"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-3"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location-name">
                      Location Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="location-name"
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
                name="region"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location-region">Region</FieldLabel>
                    <Input
                      {...field}
                      id="location-region"
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
                name="zone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location-zone">
                      Zone (Sub City)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="location-zone"
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
                name="wereda"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location-wereda">Wereda</FieldLabel>
                    <Input
                      {...field}
                      id="location-wereda"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" form="location">
                  Submit
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
