import { prisma } from "@/lib/db/prisma";
import CardsGrid from "./CardsGrid";

export default async function CarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <>
      <h2 className="mx-4 my-2 text-2xl font-bold">All cars in collection</h2>
      <CardsGrid cars={cars} />
    </>
  );
}
