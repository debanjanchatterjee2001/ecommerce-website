import { Car } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CardsSortedByMakeProps {
  cars: Car[];
  make: string;
  model: string;
}

export default function CardsSortedByMake({
  cars,
  make,
  model,
}: CardsSortedByMakeProps) {
  return (
    <div className="flex flex-col bg-base-100">
      <div className={`felx-row ${cars.length <= 1 && "hidden"}`}>
        <h2 className="mx-4 my-2 float-start text-md">
          More cars from - <b>{make.replace(/[^a-zA-Z]/g, " ")}</b>
        </h2>
        <Link
          href={"/cars/" + make}
          className="btn btn-outline btn-xs sm:btn-sm rounded-2xl float-end"
        >
          View all
        </Link>
      </div>
      <div className="flex overflow-x-scroll hide-scroll-bar">
        <div className="flex flex-nowrap">
          {cars.map((car) => (
            <div
              className={`inline-block py-5 px-3 ${car.model === model && "hidden"}`}
              key={car.id}
            >
              <div className="card w-54 min-h-60 sm:w-72 sm:max-h-64 bg-base-200 hover:bg-base-300 hover:shadow-xl hover:scale-105 transition-all">
                <figure>
                  <Image
                    src={car.imageUrl}
                    alt={car.name}
                    width={300}
                    height={300}
                    className="h-16 object-cover sm:h-32"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xs justify-center sm:font-bold sm:text-lg sm:justify-start">
                    {car.name}
                  </h2>
                  <div className="card-actions justify-center sm:justify-end">
                    <Link
                      href={"/cars/" + car.make + "/" + car.model}
                      className="btn btn-accent btn-xs sm:btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
