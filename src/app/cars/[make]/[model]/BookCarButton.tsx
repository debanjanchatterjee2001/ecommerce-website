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
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementCarQuantity(productId);
            setSuccess(true);
          });
        }}
        className="m-2 p-4 btn btn-primary btn-lg"
      >
        Book car now!
      </button>
      {isPending && <span className="loading loading-dots loading-sm"></span>}
      {!isPending && success && (
        <span className="text-success">Car added to cart</span>
      )}
    </div>
  );
}
