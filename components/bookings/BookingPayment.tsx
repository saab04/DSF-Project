"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
    <div className="w-full h-full flex flex-col justify-center items-center gap-15 text-textPrimary">
      <div className="w-[80vw] max-w-100 aspect-1/3 max-h-80 flex flex-col justify-center items-center bg-foreground rounded-xl relative">
        <h1 className="text-[30px] absolute top-4 text-center mb-3">
          Booking Details
        </h1>
        <div className="h-[50%] w-[90%] flex justify-center flex-wrap gap-2">
          <p>Check-in: {bookingDetails.checkIn}</p>
          <p>Check-out: {bookingDetails.checkOut}</p>
          <p className="w-full text-center">Guests: {bookingDetails.guests}</p>
          <p>Small Rooms: {bookingDetails.small}</p>
          <p>Medium Rooms: {bookingDetails.medium}</p>
          <p>Large Rooms: {bookingDetails.large}</p>
        </div>
      </div>
      <div className="w-[50vw] sm:max-w-150 h-150 bg-foreground m-5"></div>
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
