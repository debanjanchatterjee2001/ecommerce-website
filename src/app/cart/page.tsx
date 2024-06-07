import { getCart } from "@/lib/db/cart";
import { Metadata } from "next";
import CartEntry from "./CartEntry";
import { setCarQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your cart - Roadio",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mx-4 my-2 text-3xl font-bold">Cars in your cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setCarQuantity={setCarQuantity}
        />
      ))}
      {!cart?.items.length && (
        <p className="m-6 text-lg">Your cart is empty.</p>
      )}
      {cart?.items.length !== 0 && (
        <>
          <div className="flex flex-col items-end sm:items-center">
            <p className="m-4 font-bold">
              Total price: {formatPrice(BigInt(cart?.subtotal || 0))}
            </p>
            <button className="btn btn-accent rounded-lg sm:w-[200px]">
              Checkout
            </button>
          </div>
          <div className="divider" />
        </>
      )}
    </div>
  );
}
