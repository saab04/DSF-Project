"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Calendar, User, BedSingle, BedDouble } from "lucide-react";

const BookingContent = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const small = parseInt(searchParams.get("small") || "0");
  const medium = parseInt(searchParams.get("medium") || "0");
  const large = parseInt(searchParams.get("large") || "0");

  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVV, setCVV] = useState("");

  const bookingDetails = {
    checkIn: checkIn,
    checkOut: checkOut,
    guests: guests,
    small: small,
    medium: medium,
    large: large,
  };

  const formatCardNumber = (input: string) => {
    return input
      .replace(/\s/g, "") // only numbers
      .replace(/(.{4})/g, "$1 ") // space
      .trim();
  };

  const handleNumber = (input: string) => {
    const raw = input.replace(/\D/g, "");
    return raw;
  };

  const handleWord = (input: string) => {
    const raw = input.replace(/\[^a-zA-Z]/g, "");
    return raw;
  };

  return (
    <div className="w-[90%] h-full flex flex-col justify-center items-center gap-15 text-textPrimary">
      <div className="sm:w-[60vw] w-[90vw] min-h-56 flex flex-col flex-wrap bg-foreground shadow rounded-xl pb-5">
        <div className="flex items-center justify-center h-15">
          <h2 className="text-[30px]">Booking details</h2>
        </div>
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-[40%] sm:min-w-70 min-w-[90%] flex flex-col justify-center gap-2 min-h-40">
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <Calendar size={18} color="var(--textPrimary)" />
                <p>Check in:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.checkIn}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <Calendar size={18} color="var(--textPrimary)" />
                <p>Check out:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.checkOut}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <User size={18} color="var(--textPrimary)" />
                <p>Guests:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.guests}</p>
            </div>
          </div>
          <div className="w-[40%] sm:min-w-70 min-w-[90%] flex flex-col justify-center gap-2 min-h-40">
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <BedSingle size={18} color="var(--textPrimary)" />
                <p>Small rooms:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.small}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <BedSingle size={18} color="var(--textPrimary)" />
                <p>Medium rooms:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.medium}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <BedDouble size={18} color="var(--textPrimary)" />
                <p>Large rooms:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.large}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <form action="/api/checkout_sessions?bleh" method="POST" className="bg-buttons hover:bg-buttonsHover text-textPrimary px-5 py-2.5 rounded-md cursor-pointer transition-all duration-200 active:scale-95">
          <section>
           <button type="submit" role="link">
              Checkout
           </button>
           </section>
         </form>
      </div>
    </div>
  );
};

const BookingPayment = () => {
  return (
    //Payment page content goes here
    <Suspense fallback={<div>Loading booking details...</div>}>
      <BookingContent />
    </Suspense>
  );
};

export default BookingPayment;
