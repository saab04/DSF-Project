"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DateDisplayContent = () => {
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

const DateDisplay = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DateDisplayContent />
    </Suspense>
  );
};

export default DateDisplay;
