"use client";

import { useSearchParams } from "next/navigation";

const DateDisplay = () => {
  const searchParams = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  return (
    <div>
      <p>{checkIn}</p>
      <p>{checkOut}</p>
    </div>
  );
};

export default DateDisplay;
