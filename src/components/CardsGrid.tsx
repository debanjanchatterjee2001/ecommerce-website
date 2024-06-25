import CardDisplayCard from "@/components/CarDisplayCard";
import { Car } from "@prisma/client";

interface CardsGridProps {
  cars: Car[];
}

export default function CardsGrid({ cars }: CardsGridProps) {
  return (
    <div className="m-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <CardDisplayCard car={car} key={car.id} />
      ))}
    </div>
  );
}
