import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import FormWrapper from "../formWrapper";

export default function ProductDetail() {
  const { control } = useFormContext();

  return (
    <FormWrapper title="Product Information">
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Product Name</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Code</FieldLabel>
              <Input {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Price</FieldLabel>
              <Input
                type="number"
                value={field.value ?? ""}
                onChange={(e) => {
                  const v = e.target.valueAsNumber;
                  field.onChange(isNaN(v) ? 0 : v);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Description</FieldLabel>

              <InputGroup>
                <InputGroupTextarea {...field} rows={5} />
                <InputGroupAddon align="block-end">
                  <InputGroupText>
                    {(field.value?.length ?? 0)}/100
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
    </FormWrapper>
  );
}
