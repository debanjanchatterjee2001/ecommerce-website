import { Car } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";
import CarMakeTag from "./CarMakeTag";
import CarCategoryTag from "./CarCategoryTag";

interface CardDisplayCardProps {
  car: Car;
}

export default function CardDisplayCard({ car }: CardDisplayCardProps) {
  const newTagFeatureInDays = 3;
  const isNew =
    Date.now() - new Date(car.createdAt).getTime() <
    1000 * 60 * 60 * 24 * newTagFeatureInDays;

  return (
    <Link
      href={"/cars/" + car.make + "/" + car.model}
      className="card w-full bg-base-200 hover:bg-base-300 hover:shadow-xl hover:scale-105 transition-all"
    >
      <figure>
        <Image
          src={car.imageUrl}
          alt={car.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        ></Image>
      </figure>
      <span className="card-body">
        <h2 className="card-title">{car.name}</h2>
        <PriceTag price={car.price} />

        <span className="card-actions justify-end">
          <CarMakeTag className="text-neutral-800 hover:text-blue-800">
            {car.make.replace(/[^a-zA-Z]/g, " ")}
          </CarMakeTag>
          <CarCategoryTag className="text-neutral-500 hover:text-blue-400">
            {car.category.replace(/[^a-zA-Z]/g, " ")}
          </CarCategoryTag>
          {isNew && <span className="badge badge-secondary">New arrival</span>}
        </span>
      </span>
    </Link>
  );
}
