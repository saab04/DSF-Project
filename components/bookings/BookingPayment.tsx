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
    large: large
  };

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Check-in: {bookingDetails.checkIn}</p>
      <p>Check-out: {bookingDetails.checkOut}</p>
      <p>Guests: {bookingDetails.guests}</p>
      <p>Small Rooms: {bookingDetails.small}</p>
      <p>Medium Rooms: {bookingDetails.medium}</p>
      <p>Large Rooms: {bookingDetails.large}</p>
    </div>
  );
};

const BookingPayment = () => {

    return(
        //Payment page content goes here
        <div>
            <Suspense fallback={<div>Loading booking details...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    )
};

export default BookingPayment;