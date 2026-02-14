"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getAvailableRoomCounts } from "@/lib/bookings";

type Details = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
};

type Availability = {
  small: number;
  medium: number;
  large: number;
};

const DateDisplay = () => {
  const [details, setDetails] = useState<Details>({});

  const [smallRooms, setSmallRooms] = useState(0);
  const [mediumRooms, setMediumRooms] = useState(0);
  const [largeRooms, setLargeRooms] = useState(0);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("details");
    if (stored) {
      setDetails(JSON.parse(stored));
    }
  }, []);

  const loadAvailability = useCallback(async () => {
    setIsCheckingAvailability(true);
    setAvailabilityError(null);
    const result = await getAvailableRoomCounts();
    if ("error" in result) {
      setAvailability(null);
      setAvailabilityError(result.error || "An error occurred");
      setIsCheckingAvailability(false);
      return;
    }

    setAvailability(result.available);
    setIsCheckingAvailability(false);
  }, []);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const exceedsAvailability =
    availability &&
    (smallRooms > availability.small ||
      mediumRooms > availability.medium ||
      largeRooms > availability.large);

  const canProceed = availability && !availabilityError && !exceedsAvailability;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-[1.15rem]">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-textPrimary">Booking details</p>
          <h1 className="text-3xl font-semibold">Choose your rooms</h1>
          <p className="text-base">Review your dates and select room quantities.</p>
        </div>
        <div className="text-center space-y-1">
          <p>Arrival date: {details.checkIn}</p>
          <p>Departure date: {details.checkOut}</p>
          <p>Guests: {details.guests}</p>
        </div>
        <button
          className="bg-buttons hover:bg-buttonsHover text-textPrimary px-6 py-3 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
          onClick={loadAvailability}
          disabled={isCheckingAvailability}
        >
          {isCheckingAvailability ? "Checking availability..." : "Refresh availability"}
        </button>
        {availabilityError ? (
          <div className="w-full rounded-md border border-red-300 bg-red-100 px-4 py-3 text-red-700 text-center">
            Could not load availability. Please try again.
          </div>
        ) : null}
        <div className="w-full flex flex-col md:flex-row md:flex-nowrap justify-center gap-6">
          <div className="border border-gray-300 p-5 rounded-lg min-w-[200px] text-center">
            <h3 className="text-lg font-semibold">Room: Small</h3>
            <p>Available: {availability ? availability.small : "..."}</p>
            <input
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
              type="number"
              min="0"
              value={smallRooms}
              onChange={(e) => setSmallRooms(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="border border-gray-300 p-5 rounded-lg min-w-[200px] text-center">
            <h3 className="text-lg font-semibold">Room: Medium</h3>
            <p>Available: {availability ? availability.medium : "..."}</p>
            <input
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
              type="number"
              min="0"
              value={mediumRooms}
              onChange={(e) => setMediumRooms(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="border border-gray-300 p-5 rounded-lg min-w-[200px] text-center">
            <h3 className="text-lg font-semibold">Room: Large</h3>
            <p>Available: {availability ? availability.large : "..."}</p>
            <input
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
              type="number"
              min="0"
              value={largeRooms}
              onChange={(e) => setLargeRooms(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          {exceedsAvailability ? (
            <div className="rounded-md border border-red-300 bg-red-100 px-4 py-3 text-red-700 text-center">
              You have selected more rooms than currently available, please change
              your selection of rooms
            </div>
          ) : canProceed ? (
            <Link
              onClick={() => {
                const bookingDetails = {
                  ...details,
                  smallRooms,
                  mediumRooms,
                  largeRooms,
                };
                sessionStorage.setItem(
                  "bookingDetails",
                  JSON.stringify(bookingDetails),
                );
              }}
              href={{
                pathname: "/bookings/payment",
                query: { ...details, smallRooms, mediumRooms, largeRooms },
              }}
              className="flex justify-center items-center bg-buttons px-8 py-4 rounded-md text-textPrimary"
            >
              Verify details and proceed to payment
            </Link>
          ) : (
            <div className="rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 text-center">
              Checking availability. Please wait.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateDisplay;
