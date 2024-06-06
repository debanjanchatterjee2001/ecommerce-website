import CardDisplayCard from "@/components/CarDisplayCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface CarsByMakePageProps {
  params: {
    make: string;
  };
}

export async function generateMetadata({
  params: { make },
}: CarsByMakePageProps): Promise<Metadata> {
  const car = await prisma.car.findFirst({ where: { make: make } });
  if (!car) return notFound();
  return {
    title: make,
  };
}

export default async function CarsByMakePage({
  params: { make },
}: CarsByMakePageProps) {
  const cars = await prisma.car.findMany({
    where: { make: make },
    orderBy: { id: "desc" },
  });
  if (!cars) return notFound();
  return (
    <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <CardDisplayCard car={car} key={car.id} />
      ))}
    </div>
  );
}
