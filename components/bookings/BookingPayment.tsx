"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Calendar, User, BedSingle, BedDouble } from "lucide-react";

const BookingContent = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const small = searchParams.get("small");
  const medium = searchParams.get("medium");
  const large = searchParams.get("large");

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
      <div className="w-[90vw] sm:max-w-130 h-170 flex flex-col justify-end items-center bg-foreground rounded-xl shadow-xl relative">
        <h2 className="text-[30px] absolute top-4 text-center mb-3">Payment</h2>
        <form className="h-[85%] w-[90%] flex flex-col mb-5">
          <div className="w-full h-30 flex flex-col justify-center items-start mb-8 sm:mb-0 relative">
            <label className="absolute top-0 left-0 text-[20px]">
              Cards Accepted:
            </label>
            <div className="flex justify-start items-center flex-wrap w-full sm:min-w-60 max-w-60 sm:max-w-none h-15">
              <img
                src="/paypal.png"
                alt="paypal"
                width={185}
                height={127}
                className="w-22 h-full"
              ></img>
              <img
                src="/visa.png"
                alt="visa"
                width={185}
                height={127}
                className="w-22 h-full"
              ></img>
              <img
                src="/mastercard.png"
                alt="mastercard"
                width={185}
                height={127}
                className="w-22 h-full"
              ></img>
              <img
                src="/amex.png"
                alt="amex"
                width={185}
                height={127}
                className="w-22 h-full"
              ></img>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">Name On Card:</label>
            <input
              type="text"
              placeholder="Sven Svensson"
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">
              Credit Card Number:
            </label>
            <input
              type="text"
              placeholder="1111 2222 3333 4444"
              value={number}
              onChange={(e) => {
                setNumber(formatCardNumber(handleNumber(e.target.value)));
              }}
              maxLength={19}
              inputMode="numeric"
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">Exp. Month:</label>
            <input
              type="text"
              placeholder="June"
              value={month}
              onChange={(e) => {
                setMonth(handleWord(e.target.value));
              }}
              maxLength={9}
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex gap-15 justify-end flex-1">
            <div className="w-full flex flex-1 flex-col justify-end relative">
              <label className="absolute top-0 text-[18px]">Exp. Year:</label>
              <input
                type="text"
                placeholder="2026"
                value={year}
                onChange={(e) => {
                  setYear(handleNumber(e.target.value));
                }}
                maxLength={4}
                inputMode="numeric"
                className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
              />
            </div>
            <div className="flex flex-1 flex-col justify-end relative">
              <label className="absolute top-0 text-[18px]">CVV:</label>
              <input
                type="password"
                placeholder="XXX"
                value={CVV}
                onChange={(e) => {
                  setCVV(handleNumber(e.target.value));
                }}
                maxLength={3}
                inputMode="numeric"
                className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <button className="w-full h-15 bg-buttons hover:bg-buttonsHover transition rounded-xl cursor-pointer text-[20px]">
              Confirm payment
            </button>
          </div>
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
