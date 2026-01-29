
import { Controller, useFormContext } from "react-hook-form";
import FormWrapper from "./formWrapper";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
function UserForm() {
  const {register,formState: { errors },control} = useFormContext();
  return (
    <FormWrapper title="Personal Information">
      <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    First  Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
      <label>Last Name</label>
      <br />
      <input
        required
        type="text"
       {...register('lastName')}
      />
      <br />
      <br />
    </FormWrapper>
  );
}

export default UserForm;
