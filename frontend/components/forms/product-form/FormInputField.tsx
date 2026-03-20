import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormInputFieldProps } from "@/types/product-form";
import { Controller } from "react-hook-form";
export default function FormInputField({
  control,
  name,
  label,
  type,
  placeholder,
}: FormInputFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              type={type}
              placeholder={placeholder}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
