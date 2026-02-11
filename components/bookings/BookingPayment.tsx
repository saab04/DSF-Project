"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Calendar, User, BedSingle, BedDouble } from "lucide-react";

type Details = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  smallRooms?: string | number;
  mediumRooms?: string | number;
  largeRooms?: string | number;
};

const BookingPayment = () => {
  const [bookingDetails, setBookingDetails] = useState<Details>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const readBookingDetails = () => {
    const stored = sessionStorage.getItem("bookingDetails");
    if (stored) {
      try {
        setBookingDetails(JSON.parse(stored));
        return;
      } catch {
        setBookingDetails({});
      }
    }
  };

  useEffect(() => {
    readBookingDetails();
    setLoading(false);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        readBookingDetails();
      }
    };

    window.addEventListener("focus", readBookingDetails);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("focus", readBookingDetails);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const getRoomCount = (value?: string | number) => {
    const parsed = parseInt(String(value ?? "0"), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut || !bookingDetails.guests) {
      event.preventDefault();
      setError("Please confirm dates and guests before checkout.");
      return;
    }

    const totalRooms =
      getRoomCount(bookingDetails.smallRooms) +
      getRoomCount(bookingDetails.mediumRooms) +
      getRoomCount(bookingDetails.largeRooms);

    if (totalRooms <= 0) {
      event.preventDefault();
      setError("Please select at least one room before checkout.");
      return;
    }

    setError(null);
  };

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
          onSubmit={handleSubmit}
          className="w-full flex justify-center"
        >
          <input type="hidden" name="checkIn" value={String(bookingDetails.checkIn ?? "")} />
          <input type="hidden" name="checkOut" value={String(bookingDetails.checkOut ?? "")} />
          <input type="hidden" name="guests" value={String(bookingDetails.guests ?? "0")} />
          <input type="hidden" name="smallRooms" value={String(bookingDetails.smallRooms ?? "0")} />
          <input type="hidden" name="mediumRooms" value={String(bookingDetails.mediumRooms ?? "0")} />
          <input type="hidden" name="largeRooms" value={String(bookingDetails.largeRooms ?? "0")} />
          <button
            type="submit"
            role="link"
            className="bg-buttons hover:bg-buttonsHover text-textPrimary px-5 py-2.5 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
          >
            Checkout
          </button>
        </form>
        {error && (
          <p className="mt-3 text-red-600" role="alert">
            {error}
          </p>
        )}
        <p>For testing purposes: </p>
        <p>card number 4242 4242 4242 4242 for successful payment.</p>
        <p>card number 4000 0000 0000 9995 for failed payment.</p>
      </div>
    </div>
  );
};

export default BookingPayment;
