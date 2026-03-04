"use client";

import Image from "next/image";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  images: string[];
}

const RoomSlider = ({ images }: Props) => {
  const [showSlider, setShowSlider] = useState(false);
  return (
    <>
      <div className="w-full aspect-video rounded-sm relative">
        <img
          src={images[0]}
          alt="room"
          className="absolute w-full h-full rounded-sm"
        />
        <button
          onClick={() => setShowSlider((prev) => !prev)}
          className="w-10 aspect-square absolute bottom-2 right-2 flex justify-center items-center rounded-sm bg-white/30 backdrop-blur-sm cursor-pointer text-foreground"
        >
          <Images size={20} />
        </button>
      </div>
      {showSlider && <Slider setShowSlider={setShowSlider} images={images} />}
    </>
  );
};

interface SliderProps {
  images: string[];
  setShowSlider: any;
}

const Slider = ({ images, setShowSlider }: SliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < images.length - 1) setCurrent((current + 1) % images.length);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent((current - 1 + images.length) % images.length);
    }
  };
  return (
    <div className="flex justify-center items-center inset-0 fixed bg-white/30 backdrop-blur-sm z-10">
      <div className="w-[90vw] sm:w-[60vw] sm:min-w-115 flex justify-center items-center aspect-video bg-foreground p-10 relative rounded-xl shadow-2xl text-textPrimary">
        <button
          onClick={() => setShowSlider(false)}
          className="flex justify-center items-center w-12 aspect-square absolute top-2 right-2 cursor-pointer"
        >
          <X size={30} />
        </button>
        <div className="w-[85%] aspect-video rounded-xl relative">
          <Image
            src={images[current]}
            alt="room"
            width={1600}
            height={900}
            priority={true}
            className="absolute w-full h-full rounded-xl"
          />
        </div>
        <button
          onClick={prev}
          className="w-10 aspect-square flex justify-end items-center absolute left-4 cursor-pointer hover:scale-120 transition"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="w-10 aspect-square absolute flex justify-start items-center right-4 cursor-pointer hover:scale-120 transition"
        >
          <ChevronRight size={40} />
        </button>
        <div className="w-50 h-7 flex justify-center items-center gap-2.5 absolute bottom-2">
          <span
            className={`w-3 h-3 rounded-full border border-primary ${current === 0 && "bg-[#AFC4E2]"}`}
          ></span>
          <span
            className={`w-3 h-3 rounded-full border border-primary ${current === 1 && "bg-[#AFC4E2]"}`}
          ></span>
          <span
            className={`w-3 h-3 rounded-full border border-primary ${current === 2 && "bg-[#AFC4E2]"}`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default RoomSlider;
