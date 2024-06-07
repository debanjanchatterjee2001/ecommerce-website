"use client";

import { useState, useTransition } from "react";

interface BookCarButtonProps {
  productId: string;
  incrementCarQuantity: (productId: string) => Promise<void>;
}

export default function BookCarButton({
  productId,
  incrementCarQuantity,
}: BookCarButtonProps) {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          startTransition(async () => {
            await incrementCarQuantity(productId);
          });
        }}
        className="m-2 p-4 btn btn-primary btn-lg rounded-lg"
      >
        Book car now!
      </button>
      {isPending && <span className="loading loading-dots loading-sm"></span>}
    </div>
  );
}
