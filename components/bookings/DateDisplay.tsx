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
      style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "all 0.2s ease" }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      onClick ={availableRoomhandler}>Check Available Rooms, click here and check logs.
    </button>
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Room: Small</h3>
          <input
            type="number"
            min="0"
            value={smallRooms}
            onChange={(e) => setSmallRooms(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Room: Medium</h3>
          <input
            type="number"
            min="0"
            value={mediumRooms}
            onChange={(e) => setMediumRooms(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
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
              query: { checkIn: checkIn, checkOut: checkOut, guests: guests, small: smallRooms, medium: mediumRooms, large: largeRooms },
            }}
            className="flex justify-center items-center bg-buttons w-[30%] min-w-25 h-[120%] min-h-10 text-[20px] rounded-md cursor-pointer hover:bg-buttonsHover transition absolute sm:bottom-0 sm:right-0 sm:top-0 sm:mr-5 top-[250%] m-auto inset-0 disabled"
          >
            Proceed to payment
          </Link>
        </div>
      </div>
    </div>
  );
};

const availableRoomhandler = async () => {
  const rooms = await availableRooms();
  console.log(rooms);
}

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
