import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProductFormSchema } from "@/lib/shemas";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import { z } from "zod";
type FormValues = z.infer<typeof ProductFormSchema>;
type FieldName = keyof FormValues;
type FormInputFieldProps = {
//   form: UseFormReturn<FormValues>;
//   name: FieldName;
form: UseFormReturn;
  name: FieldPath<FormValues>;
  label: string;
  type: string;
  placeholder: string;
};
export default function FormInputField({
  form,
  name,
  label,
  type,
  placeholder,
}: FormInputFieldProps) {
  return (
    <>
      <Controller
        name={name}
        control={form.control}
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
