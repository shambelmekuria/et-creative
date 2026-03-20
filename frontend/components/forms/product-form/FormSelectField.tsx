import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSelectFieldProps } from "@/types/product-form";
export default function FormSelectField({
  control,
  name,
  label,
  placeholder,
  description,
  options,
}: FormSelectFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="vertical" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={`form-${name}`}>{label}</FieldLabel>
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id={`form-${name}`} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectSeparator />
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </>
  );
}
