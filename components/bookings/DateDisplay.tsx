"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { availableRooms } from "@/lib/auth";

const DateDisplayContent = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const [smallRooms, setSmallRooms] = useState(0);
  const [mediumRooms, setMediumRooms] = useState(0);
  const [largeRooms, setLargeRooms] = useState(0);

  return (
    <div>
      <div>
        <p>Arrival date: {checkIn}</p>
        <p>Departure date: {checkOut}</p>
        <p>Guests: {guests}</p>
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
            onClick={(e) => {}}
            href={{
              pathname: "/bookings/payment",
              query: {
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests,
                small: smallRooms,
                medium: mediumRooms,
                large: largeRooms,
              },
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

const DateDisplay = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DateDisplayContent />
      </Suspense>
    </div>
  );
};

export default DateDisplay;
