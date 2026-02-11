"use client";

import { useState, useEffect } from "react";
import { Calendar, User, BedSingle, BedDouble } from "lucide-react";

type Details = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  smallRooms?: string;
  mediumRooms?: string;
  largeRooms?: string;
};

const BookingPayment = () => {
  const [bookingDetails, setBookingDetails] = useState<Details>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("bookingDetails");
    if (stored) {
      setBookingDetails(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <p className="flex-1 text-start">{bookingDetails.smallRooms}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <BedSingle size={18} color="var(--textPrimary)" />
                <p>Medium rooms:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.mediumRooms}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 min-w-31.25 flex justify-end items-center gap-1">
                <BedDouble size={18} color="var(--textPrimary)" />
                <p>Large rooms:</p>
              </div>
              <p className="flex-1 text-start">{bookingDetails.largeRooms}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <form
          action="/api/checkout_sessions"
          method="POST"
          className="bg-buttons hover:bg-buttonsHover text-textPrimary px-5 py-2.5 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
        >
          <input type="hidden" name="smallRooms" value={bookingDetails.smallRooms ?? '0'} />
          <input type="hidden" name="mediumRooms" value={bookingDetails.mediumRooms ?? '0'} />
          <input type="hidden" name="largeRooms" value={bookingDetails.largeRooms ?? '0'} />
          <section>
            <button type="submit" role="link">Checkout</button>
          </section>
          
        </form>
        <p>For testing purposes: </p>
        <p>card number 4242 4242 4242 4242 for successful payment.</p>
        <p>card number 4000 0000 0000 9995 for failed payment.</p>
      </div>
    </div>
  );
};

export default BookingPayment;
