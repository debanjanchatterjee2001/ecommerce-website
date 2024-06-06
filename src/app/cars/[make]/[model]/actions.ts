"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementCarQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());
  const carInCart = cart.items.find((item) => item.productId === productId);

  if (carInCart) {
    await prisma.cartItem.update({
      where: { id: carInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/cars/[make]/[model]", "page");
}
