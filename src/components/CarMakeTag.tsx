"use client";

import { ComponentProps } from "react";

type CarMakeTagProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function CarMakeTag({
  children,
  className,
  ...props
}: CarMakeTagProps) {
  return (
    <>
      <button
        {...props}
        onClick={(e) => {
          e.preventDefault();
          window.location.href =
            "/cars/" + children?.toString().replaceAll(" ", "-");
        }}
        className={`badge badge-outline hover:scale-105 ${className}`}
      >
        {children}
      </button>
    </>
  );
}
