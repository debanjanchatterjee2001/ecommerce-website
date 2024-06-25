import CardsGrid from "@/components/CardsGrid";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { title } from "process";

interface SearchPageParams {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageParams): Metadata {
  return {
    title: `Search: ${query} - Roadio`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageParams) {
  const userQuery = query.replace(" ", "-");
  const cars = await prisma.car.findMany({
    where: {
      OR: [
        { make: { contains: userQuery, mode: "insensitive" } },
        { model: { contains: userQuery, mode: "insensitive" } },
        { name: { contains: userQuery, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: userQuery, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (cars.length === 0)
    return (
      <div className="m-6 mb-[410px] text-lg text-center">No cars found.</div>
    );

  return (
    <div className="overflow-hidden">
      <h1 className="mx-4 my-2 text-lg">
        Showing results for - <b>{query}</b>
      </h1>
      <CardsGrid cars={cars} />
    </div>
  );
}
