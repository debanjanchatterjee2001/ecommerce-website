"use client";

import { CartItemWithCar } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CarEntryProps {
  cartItem: CartItemWithCar;
  setCarQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setCarQuantity,
}: CarEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="mx-7 my-5">
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={250}
          height={250}
          className="rounded-lg"
        />
        <div>
          <Link
            href={"/cars/" + product.make + "/" + product.model}
            className="my-4 font-bold"
          >
            {product.name}
          </Link>
          <div>Price: {formatPrice(BigInt(product.price))}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px] rounded-lg"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setCarQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value="0">0 (Remove from cart)</option>
              {quantityOptions}
            </select>
          </div>
          <div>
            Total: {formatPrice(BigInt(Number(product.price) * quantity))}
            {isPending && (
              <span className="m-2 loading loading-spinner loading-md text-primary" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
