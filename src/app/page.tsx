import CardDisplayCard from "@/components/CarDisplayCard";
import HeroCarousel from "@/components/HeroCarousel";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadio",
};

export default async function Home() {
  const cars = await prisma.car.findMany({
    orderBy: { id: "desc" },
  });

  const featuredCars = await prisma.car.findMany({
    orderBy: { price: "desc" },
  });

  return (
    <div className="overflow-hidden">
      <HeroCarousel cars={featuredCars} />
      <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CardDisplayCard car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
}
