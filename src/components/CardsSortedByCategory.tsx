import { Car } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CardsSortedByMakeProps {
  cars: Car[];
  category: string;
  model: string;
}

export default function CardsSortedByMake({
  cars,
  category,
  model,
}: CardsSortedByMakeProps) {
  return (
    <div className="flex flex-col bg-base-100">
      <div className={`flex-row ${cars.length <= 1 && "hidden"}`}>
        <h2 className="mx-4 my-2 float-start text-md">
          More cars of category - <b>{category.replace(/[^a-zA-Z]/g, " ")}</b>
        </h2>
        <Link
          href={"/" + category}
          className="btn btn-outline rounded-3xl float-end"
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
              <div className="card w-64 max-h-64 bg-base-200 hover:bg-base-300 hover:shadow-xl hover:scale-105 transition-all">
                <figure>
                  <Image
                    src={car.imageUrl}
                    alt={car.name}
                    width={300}
                    height={300}
                    className="h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{car.name}</h2>
                  <div className="card-actions justify-end">
                    <Link
                      href={"/cars/" + car.make + "/" + car.model}
                      className="btn btn-accent btn-sm"
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
