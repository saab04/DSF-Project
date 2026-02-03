"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

const BookingContent = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const small = searchParams.get("small");
  const medium = searchParams.get("medium");
  const large = searchParams.get("large");

  const bookingDetails = {
    checkIn: checkIn,
    checkOut: checkOut,
    guests: guests,
    small: small,
    medium: medium,
    large: large,
  };

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center gap-15 text-textPrimary">
      <div className="w-[80vw] max-w-100 aspect-1/3 max-h-80 flex flex-col justify-center items-center bg-foreground rounded-xl shadow-xl relative">
        <h2 className="text-[30px] absolute top-4 text-center mb-3">
          Booking Details
        </h2>
        <div className="h-[50%] w-[90%] flex flex-col items-center justify-center gap-2">
          <p>Check-in: {bookingDetails.checkIn}</p>
          <p>Check-out: {bookingDetails.checkOut}</p>
          <p>Guests: {bookingDetails.guests}</p>
          <p>Small Rooms: {bookingDetails.small}</p>
          <p>Medium Rooms: {bookingDetails.medium}</p>
          <p>Large Rooms: {bookingDetails.large}</p>
        </div>
      </div>
      <div className="w-[90vw] sm:max-w-130 h-150 flex justify-center items-center bg-foreground rounded-xl shadow-xl relative">
        <h2 className="text-[30px] absolute top-4 text-center mb-3">Payment</h2>
        <form className="h-[80%] w-[90%] flex flex-col">
          <div className="w-full h-30 flex flex-col justify-center items-center mb-10 sm:mb-0 relative">
            <label className="absolute top-0 left-0 text-[20px]">
              Cards Accepted:
            </label>
            <div className="flex justify-center items-center flex-wrap w-full min-w-60 h-15">
              <Image
                src="/paypal.png"
                alt="paypal"
                width={185}
                height={127}
                className="w-22 h-full"
              ></Image>
              <Image
                src="/visa.png"
                alt="paypal"
                width={185}
                height={127}
                className="w-22 h-full"
              ></Image>
              <Image
                src="/mastercard.png"
                alt="paypal"
                width={185}
                height={127}
                className="w-22 h-full"
              ></Image>
              <Image
                src="/amex.png"
                alt="paypal"
                width={185}
                height={127}
                className="w-22 h-full"
              ></Image>
            </div>
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">Name On Card:</label>
            <input
              type="text"
              placeholder="kjasdlfsjdfk"
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">
              Credit Card Number:
            </label>
            <input
              type="text"
              placeholder="kjasdlfsjdfk"
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex flex-col justify-end flex-1 relative">
            <label className="absolute top-0 text-[18px]">Exp. Month:</label>
            <input
              type="text"
              placeholder="kjasdlfsjdfk"
              className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
            />
          </div>
          <div className="w-full flex gap-10 justify-end flex-1">
            <div className="w-full flex flex-1 flex-col justify-end relative">
              <label className="absolute top-0 text-[18px]">Exp. Year:</label>
              <input
                type="text"
                placeholder="kjasdlfsjdfk"
                className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
              />
            </div>
            <div className="flex flex-1 flex-col justify-end relative">
              <label className="absolute top-0 text-[18px]">CVV:</label>
              <input
                type="text"
                placeholder="kjasdlfsjdfk"
                className="w-full h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
              />
            </div>
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
