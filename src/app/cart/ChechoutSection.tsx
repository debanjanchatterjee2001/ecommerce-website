import { CarBookingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";

interface CheckoutSectionProps {
  cart: CarBookingCart | null;
}

export default function CheckoutSection({ cart }: CheckoutSectionProps) {
  return (
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
  );
}
