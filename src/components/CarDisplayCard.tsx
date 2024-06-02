import { Car } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";

interface CardDisplayCardProps {
  car: Car;
}

export default function CardDisplayCard({ car }: CardDisplayCardProps) {
  const isNew = Date.now() - new Date(car.createdAt).getTime() < 1000 * 60 * 60;

  return (
    <Link
      href={"/cars/" + car.make + "/" + car.model}
      className="card w-96 bg-base-100 shadow-md hover:bg-base-300 hover:shadow-xl"
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
      <div className="card-body">
        <h2 className="card-title">{car.name}</h2>
        <PriceTag price={car.price} />

        <div className="card-actions justify-end">
          <div className="badge badge-outline">{car.make}</div>
          <div className="badge badge-outline">{car.category}</div>
          {isNew && <div className="badge badge-secondary">New arrival</div>}
        </div>
      </div>
    </Link>
  );
}
