"use client";
import React, { FormEvent, useState } from "react";
import useMultStepForm from "../../hooks/useMultStepForm";
import { Button } from "@/components/ui/button";
import UserForm from "./userForm";
import AddressForm from "./addressForm";
import AccountForm from "./acccontForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export interface FormData {
  // AccountForm
  email: string;
  password: string;

  // UserForm
  firstName: string;
  lastName: string;

  // AddressForm
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const initialFormData: FormData = {
  email: "",
  password: "",

  firstName: "",
  lastName: "",

  street: "",
  city: "",
  state: "",
  zip: "",
};

export default function Page() {
  const [data, setData] = useState(initialFormData);
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  console.log({...form})
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultStepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    next();
  }
  return (
    <div className="relative border p-10  rounded m-6">
      <form onSubmit={onSubmit}>
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
    </div>
  );
}
