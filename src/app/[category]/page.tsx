import CardDisplayCard from "@/components/CarDisplayCard";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

interface CarsByCategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CarsByCategoryPage({
  params: { category },
}: CarsByCategoryPageProps) {
  const cars = await prisma.car.findMany({
    where: { category: category },
    orderBy: { id: "desc" },
  });
  if (!cars) return notFound();
  return (
    <div>
      <h2 className="mx-4 my-2">
        Showing from category- <b>{category?.replace(/[^a-zA-Z]/g, " ")}</b>
      </h2>
      <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CardDisplayCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
}
