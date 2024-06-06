import { Car } from "@prisma/client";
import Image from "next/image";
import PriceTag from "./PriceTag";
import CarMakeTag from "./CarMakeTag";
import CarCategoryTag from "./CarCategoryTag";

interface IndividualCarDisplayProps {
  car: Car;
}

export default function IndividualCarDisplay({
  car,
}: IndividualCarDisplayProps) {
  return (
    <div className="m-4 p-2 flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={car.imageUrl}
        alt={car.name}
        width={800}
        height={600}
        className="rounded-lg max-h-96 w-1/2 object-left"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{car.name}</h1>
        <PriceTag price={car.price} className="mt-4" />
        <p className="py-6">{car.description}</p>
        <div className="flex flex-row-reverse gap-4">
          <CarCategoryTag className="text-neutral-500 hover:text-blue-400">
            {car.category}
          </CarCategoryTag>
          <CarMakeTag className="text-neutral-800 hover:text-blue-800">
            {car.make}
          </CarMakeTag>
        </div>
      </div>
    </div>
  );
}
