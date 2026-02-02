import React, { ReactNode } from "react";
type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
