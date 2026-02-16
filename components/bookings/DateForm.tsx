"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const DateForm = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE");
  };

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guests, setGuests] = useState(1);

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const handleCheckInChange = (e: any) => {
    const value = e.target.value;
    setCheckIn(value);
    if (checkOut && new Date(checkOut) <= new Date(value)) {
      setCheckOut("");
    }
  };

  return (
    <div className="w-[80vw] max-w-150 min-w-70 min-h-100 flex justify-center items-center bg-foreground rounded-[20px] shadow-xl text-textPrimary relative">
      <form className="w-[80%] aspect-9/10 max-h-90 flex flex-col justify-center items-center sm:mb-0 mb-15 gap-15 relative">
        <div className="w-full h-9.5 sm:h-11 bg-white relative cursor-pointer rounded-md shadow border border-white focus-within:border-primary">
          <label
            htmlFor="checkIn"
            className="absolute left-0 bottom-[calc(100%+8px)] text-[20px]"
          >
            Arrival
          </label>
          <input
            id="checkIn"
            type="date"
            name="checkIn"
            value={checkIn}
            min={formatDate(today)}
            onChange={handleCheckInChange}
            required
            className="w-full h-full absolute rounded-md top-0 left-0 px-3 hide-calendar"
          />
        </div>
        <div className="w-full h-9.5 sm:h-11 bg-white relative cursor-pointer rounded-md shadow border border-white focus-within:border-primary">
          <label
            htmlFor="checkOut"
            className="absolute left-0 bottom-[calc(100%+8px)] text-[20px]"
          >
            Departure
          </label>
          <input
            id="checkOut"
            type="date"
            name="checkOut"
            value={checkOut}
            min={
              checkIn
                ? formatDate(addDays(new Date(checkIn), 1))
                : formatDate(addDays(today, 1))
            }
            onChange={(e: any) => setCheckOut(e.target.value)}
            disabled={!checkIn}
            required
            className="w-full h-full absolute rounded-md top-0 left-0 px-3 hide-calendar"
          />
        </div>
        <div className="w-full h-9.5 sm:h-11 flex sm:justify-start items-center gap-2 bg-transparent relative select-none">
          <label
            htmlFor="guests"
            className="absolute left-0 bottom-[calc(100%+8px)] text-[20px]"
          >
            Guests
          </label>
          <input
            id="guests"
            type="number"
            name="guests"
            defaultValue={guests}
            disabled={true}
            required
            className="w-[20%] min-w-20 h-full text-white rounded-md px-3 bg-white shadow"
          />
          <span className="w-[20%] min-w-20 h-full flex justify-center items-center text-[20px] absolute left-0">
            {guests}
          </span>
          <div className="flex flex-col gap-1">
            <div className="cursor-pointer hover:scale-120">
              <ChevronUp
                size={30}
                onClick={(e) => {
                  setGuests((prev) => prev + 1);
                }}
              />
            </div>
            <div className="cursor-pointer hover:scale-120">
              <ChevronDown
                size={30}
                onClick={(e) => {
                  if (guests >= 2) {
                    setGuests((prev) => prev - 1);
                  }
                }}
              />
            </div>
          </div>
          <Link
            onClick={(e) => {
              if (!checkIn || !checkOut || !guests) {
                e.preventDefault();
              }
              const details = { checkIn, checkOut, guests };
              sessionStorage.setItem("details", JSON.stringify(details));
            }}
            href={{
              pathname: "/bookings/rooms",
              query: { checkIn, checkOut, guests },
            }}
            className="flex justify-center items-center bg-buttons w-[30%] min-w-30 h-[120%] min-h-10 text-[20px] cursor-pointer absolute sm:top-0 top-[calc(100%+30px)] right-0 rounded-md"
          >
            Book now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default DateForm;
