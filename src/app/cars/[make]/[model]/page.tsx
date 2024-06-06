import IndividualCarDisplay from "./IndividualCarDisplay";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface IndividualCarPageProps {
  params: {
    model: string;
  };
}

const getCar = cache(async (model: string) => {
  const car = await prisma.car.findFirst({ where: { model } });
  if (!car) return notFound();
  return car;
});

export async function generateMetadata({
  params: { model },
}: IndividualCarPageProps): Promise<Metadata> {
  const car = await getCar(model);

  return {
    title: car.name,
    description: car.description,
    openGraph: {
      images: [{ url: car.imageUrl }],
    },
  };
}

export default async function IndividualCarPage({
  params: { model },
}: IndividualCarPageProps) {
  const car = await getCar(model);
  return <IndividualCarDisplay car={car} />;
}
