"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type CartWithCars = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CarBookingCart = CartWithCars & {
  size: number;
  subtotal: number;
};

export type CartItemWithCar = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export async function getCart(): Promise<CarBookingCart | null> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let cart: CartWithCars | null;

  if (user) {
    cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

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
  let newCart: Cart;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    newCart = await prisma.cart.create({ data: { userId: user.id } });
  } else {
    newCart = await prisma.cart.create({ data: {} });
    cookies().set("localCartId", newCart.id, { secure: true });
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeLocalCartWithUserCart(userId: string) {
  const localCartId = cookies().get("locacCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    await tx.cart.delete({
      where: { id: localCart.id },
    });

    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
