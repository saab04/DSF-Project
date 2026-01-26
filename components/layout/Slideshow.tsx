"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/bed-4416515_1920.webp", "/hotel-1979406_1920.webp"];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt="Slideshow"
          width={1920}
          height={1280}
          priority={true}
          className={`absolute w-full h-full object-cover transition-opacity duration-2000 shadow-2xl rounded-2xl ${
            i === index ? "opacity-100 fade-in" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
