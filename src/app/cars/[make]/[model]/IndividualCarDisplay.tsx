import { Car } from "@prisma/client";
import Image from "next/image";
import PriceTag from "../../../../components/PriceTag";
import CarMakeTag from "../../../../components/CarMakeTag";
import CarCategoryTag from "../../../../components/CarCategoryTag";
import BookCarButton from "@/app/cars/[make]/[model]/BookCarButton";
import { incrementCarQuantity } from "@/app/cars/[make]/[model]/actions";

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
        <BookCarButton
          productId={car.id}
          incrementCarQuantity={incrementCarQuantity}
        />
        <div className="flex flex-row-reverse gap-4">
          <CarCategoryTag className="text-neutral-500 hover:text-blue-400">
            {car.category.replace(/[^a-zA-Z]/g, " ")}
          </CarCategoryTag>
          <CarMakeTag className="text-neutral-800 hover:text-blue-800">
            {car.make.replace(/[^a-zA-Z]/g, " ")}
          </CarMakeTag>
        </div>
      </div>
    </div>
  );
}
