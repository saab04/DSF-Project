"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { availableRooms } from "@/lib/auth";

const DateDisplayContent = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  return (
    <div>
      <p>{checkIn}</p>
      <p>{checkOut}</p>
      <p>{guests}</p>
    </div>
  );
};

const availableRoomhandler = async () => {
  const rooms = availableRooms();
  console.log(rooms);
}

const DateDisplay = () => {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <DateDisplayContent />
    </Suspense>
    <button onClick ={availableRoomhandler}>Check Available Rooms, click here and check logs.</button>;
    </div>
  );
};

export default DateDisplay;
