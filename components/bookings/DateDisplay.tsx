"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { availableRooms } from "@/lib/auth";

type Details = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
};

const DateDisplay = () => {
  const [details, setDetails] = useState<Details>({});

  const [smallRooms, setSmallRooms] = useState(0);
  const [mediumRooms, setMediumRooms] = useState(0);
  const [largeRooms, setLargeRooms] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("details");
    if (stored) {
      setDetails(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <div>
        <p>Arrival date: {details.checkIn}</p>
        <p>Departure date: {details.checkOut}</p>
        <p>Guests: {details.guests}</p>
      </div>
      <button
        className="bg-buttons hover:bg-buttonsHover text-textPrimary px-5 py-2.5 rounded-md cursor-pointer transition-all duration-200 active:scale-95"
        onClick={availableRoomhandler}
      >
        Check Available Rooms, click here and check logs.
      </button>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Room: Small</h3>
          <input
            type="number"
            min="0"
            value={smallRooms}
            onChange={(e) => setSmallRooms(parseInt(e.target.value) || 0)}
          />
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Room: Medium</h3>
          <input
            type="number"
            min="0"
            value={mediumRooms}
            onChange={(e) => setMediumRooms(parseInt(e.target.value) || 0)}
          />
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Room: Large</h3>
          <input
            type="number"
            min="0"
            value={largeRooms}
            onChange={(e) => setLargeRooms(parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <Link
            onClick={(e) => {
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
            className="flex justify-center items-center bg-buttons w-[30%] min-w-50 aspect-square"
          >
            Verify details and proceed to payment
          </Link>
        </div>
      </div>
    </div>
  );
};

const availableRoomhandler = async () => {
  const rooms = await availableRooms();
  console.log(rooms);
};

export default DateDisplay;
