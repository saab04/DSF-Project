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
    return (
      <div className="min-h-screen flex items-center justify-center text-[1.15rem]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-[1.15rem] text-textPrimary">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-textPrimary">Booking details</p>
          <h1 className="text-3xl font-semibold">Review and pay</h1>
          <p className="text-base">Confirm your reservation before checkout.</p>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-6 rounded-xl border border-gray-300 bg-foreground p-6 shadow">
          <div className="min-w-[240px] flex-1 flex flex-col gap-3">
            <p className="text-lg font-semibold">Dates and guests</p>
            <div className="flex items-center gap-2">
              <Calendar size={18} color="var(--textPrimary)" />
              <p className="font-medium">Check in:</p>
              <p>{bookingDetails.checkIn}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} color="var(--textPrimary)" />
              <p className="font-medium">Check out:</p>
              <p>{bookingDetails.checkOut}</p>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} color="var(--textPrimary)" />
              <p className="font-medium">Guests:</p>
              <p>{bookingDetails.guests}</p>
            </div>
          </div>
          <div className="min-w-[240px] flex-1 flex flex-col gap-3">
            <p className="text-lg font-semibold">Room selections</p>
            <div className="flex items-center gap-2">
              <BedSingle size={18} color="var(--textPrimary)" />
              <p className="font-medium">Small rooms:</p>
              <p>{bookingDetails.smallRooms}</p>
            </div>
            <div className="flex items-center gap-2">
              <BedSingle size={18} color="var(--textPrimary)" />
              <p className="font-medium">Medium rooms:</p>
              <p>{bookingDetails.mediumRooms}</p>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble size={18} color="var(--textPrimary)" />
              <p className="font-medium">Large rooms:</p>
              <p>{bookingDetails.largeRooms}</p>
            </div>
          </div>
        </div>
        <form
          action="/api/checkout_sessions"
          method="POST"
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
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
            className="bg-buttons hover:bg-buttonsHover text-textPrimary px-8 py-4 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
          >
            Checkout
          </button>
          {error && (
            <p className="text-red-600 text-center" role="alert">
              {error}
            </p>
          )}
        </form>
        <div className="text-center text-base">
          <p className="font-semibold">For testing purposes</p>
          <p>card number 4242 4242 4242 4242 for successful payment.</p>
          <p>card number 4000 0000 0000 9995 for failed payment.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
