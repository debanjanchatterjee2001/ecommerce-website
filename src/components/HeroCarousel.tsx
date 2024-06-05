"use client";
import { Car } from "@prisma/client";
import CarouselCard from "./CarouselCard";
import { useState, useEffect } from "react";

interface HeroCarouselProps {
  cars: Car[];
}

export default function HeroCarousel({ cars }: HeroCarouselProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const heroCarouselLength = 7;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((slideIndex) => (slideIndex + 1) % heroCarouselLength);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel m-2 p-2 w-full gap-2">
      {cars.map((car, i) => (
        <div
          className={`carousel-item ${slideIndex !== i ? "hidden" : "active"} transition-all w-full`}
          key={car.id}
        >
          <CarouselCard car={car} />
        </div>
      ))}
    </div>
  );
}
