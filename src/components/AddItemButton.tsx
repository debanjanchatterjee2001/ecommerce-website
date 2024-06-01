"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type AddItemButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function AddItemButton({
  children,
  className,
  ...props
}: AddItemButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {children}
      {pending && <span className="loading loading-spinner loading-sm"></span>}
    </button>
  );
}
