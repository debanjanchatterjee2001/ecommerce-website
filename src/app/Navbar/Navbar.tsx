import Image from "next/image";
import Link from "next/link";
import animatedLogo from "@/assets/animated-logo.gif";
import SearchForm from "./SearchForm";
import CartButton from "./CartButton";
import { getCart } from "@/lib/db/cart";

export default async function Navbar() {
  const cart = await getCart();
  return (
    <>
      <div
        className="py-4 mb-3 navbar fixed  
                w-full top-0 left-0 bg-base-100 z-30"
      >
        <div className="join-horizontal flex-1">
          <Link href="/" className="btn btn-ghost text-2xl font-bold">
            <Image
              src={animatedLogo}
              height={50}
              width={50}
              alt="Brand logo"
              unoptimized={true}
            />
            Roadio
          </Link>
        </div>
        <div className="flex-none gap-2">
          <SearchForm />
          <CartButton cart={cart} />
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
