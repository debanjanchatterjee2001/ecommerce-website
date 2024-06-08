import { getCart } from "@/lib/db/cart";
import { Metadata } from "next";
import CartEntry from "./CartEntry";
import { setCarQuantity } from "./actions";
import CheckoutSection from "./ChechoutSection";
import { prisma } from "@/lib/db/prisma";
import CardsSortedByMake from "@/components/CardsSortedByMake";
import CardsSortedByCategory from "@/components/CardsSortedByCategory";

export const metadata: Metadata = {
  title: "Your cart - Roadio",
};

export default async function CartPage() {
  const cart = await getCart();
  const makeArray: string[] = [];
  const modelArray: string[] = [];
  const categoryArray: string[] = [];

  cart?.items.map((item) => makeArray.push(item.product.make));
  cart?.items.map((item) => modelArray.push(item.product.model));
  cart?.items.map((item) => categoryArray.push(item.product.category));

  const make1 = makeArray.reverse()[0];
  const model1 = modelArray.reverse()[0];
  const category1 = categoryArray.reverse()[0];

  const carsByMake = await prisma.car.findMany({
    where: { make: make1 },
  });

  const carsByCategory = await prisma.car.findMany({
    where: { category: category1 },
  });

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
        <p className="m-6 mb-[370px] text-lg">Your cart is empty.</p>
      )}
      {cart?.items.length !== 0 && (
        <>
          <CheckoutSection cart={cart} key={cart?.id} />
          <CardsSortedByMake cars={carsByMake} make={make1} model={model1} />
          <CardsSortedByCategory
            cars={carsByCategory}
            category={category1}
            model={model1}
          />
        </>
      )}
    </div>
  );
}
