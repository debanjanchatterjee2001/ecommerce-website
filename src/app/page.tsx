import CardDisplayCard from "@/components/CarDisplayCard";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Cars Website",
};

export default async function Home() {
  const cars = await prisma.car.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <CardDisplayCard car={car} key={car.id} />
      ))}
    </div>
  );
}
