"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setCarQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const carInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (carInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: carInCart.id },
          },
        },
      });
    }
  } else {
    if (carInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: carInCart.id },
              data: { quantity },
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}
