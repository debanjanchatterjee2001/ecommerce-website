import Image from "next/image";
import Link from "next/link";
import animatedLogo from "@/assets/animated-logo.gif";
import SearchForm from "./SearchForm";
import CartButton from "./CartButton";
import { getCart } from "@/lib/db/cart";
import HomeButton from "./HomeButton";

export default async function Navbar() {
  const cart = await getCart();
  return (
    <>
      <div
        className="py-4 mb-3 navbar fixed  
                w-full top-0 left-0 bg-base-100 z-30"
      >
        <HomeButton />
        <div className="flex-none gap-2">
          <SearchForm />
          <CartButton cart={cart} />
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
