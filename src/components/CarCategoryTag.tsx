"use client";

import { ComponentProps } from "react";

type CarCategoryTagProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function CarCategoryTag({
  children,
  className,
  ...props
}: CarCategoryTagProps) {
  return (
    <>
      <button
        {...props}
        onClick={(e) => {
          e.preventDefault();
          window.location.href =
            "/" + children?.toString().replaceAll(" ", "-");
        }}
        className={`badge badge-outline hover:scale-105 ${className}`}
      >
        {children}
      </button>
    </>
  );
}
