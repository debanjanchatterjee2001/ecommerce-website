import CardDisplayCard from "@/components/CarDisplayCard";
import HeroCarousel from "@/components/HeroCarousel";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import CardsGrid from "@/components/CardsGrid";

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
      <CardsGrid cars={cars} />
    </div>
  );
}
