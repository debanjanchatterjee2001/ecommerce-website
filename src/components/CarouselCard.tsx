import { Car } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CarouselCardProps {
  car: Car;
}

export default function CarouselCard({ car }: CarouselCardProps) {
  return (
    <div className="card w-full max-h-96 bg-base-100 image-full">
      <figure>
        <Image
          src={car.imageUrl}
          alt={car.name}
          width={2000}
          height={1100}
          className="w-full"
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{car.name}</h2>
        <div className="card-actions justify-end">
          <p className="">Featured</p>
          <Link
            href={`/cars/${car.make}/${car.model}`}
            className="btn btn-primary"
          >
            Check it out
          </Link>
        </div>
      </div>
    </div>
  );
}
