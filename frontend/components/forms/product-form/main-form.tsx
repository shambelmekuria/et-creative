"use client";
import { Button } from "@/components/ui/button";
import UserForm from "./userForm";
import AddressForm from "./addressForm";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useMultStepForm from "@/hooks/useMultStepForm";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string(),
  email: z.string().optional(),
  password: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ProductMainForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "shambel",
      lastName: "mekuriaya",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    mode: "onChange",
  });

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultStepForm([<UserForm />, <AddressForm />]);
  async function onSubmit(data: FormValues) {
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
    <div className="relative border p-10  rounded m-6">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="absolute top-2 right-2">
            {currentStepIndex + 1}/{steps.length}
          </div>
          {step}
          <div className="mt-5 flex justify-end gap-3">
            {!isFirstStep && (
              <Button onClick={back} type="button">
                Back
              </Button>
            )}
            <Button type="submit">{isLastStep ? "Finish" : "Next"}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
