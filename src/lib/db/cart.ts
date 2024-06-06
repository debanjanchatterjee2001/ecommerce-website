import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export type CartWithCars = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CarBookingCart = CartWithCars & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<CarBookingCart | null> {
  const locacCartId = cookies().get("locacCartId")?.value;
  const cart = locacCartId
    ? await prisma.cart.findUnique({
        where: { id: locacCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * Number(item.product.price),
      0
    ),
  };
}

export async function createCart(): Promise<CarBookingCart> {
  const newCart = await prisma.cart.create({ data: {} });
  cookies().set("locacCartId", newCart.id, { secure: true });

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
