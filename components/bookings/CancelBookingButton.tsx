"use client";
import { setBookingActiveStatus } from "@/lib/bookings";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

interface ButtonProps {
  id: number;
}

const CancelBookingButton = ({ id }: ButtonProps) => {
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      <div className="w-full h-15 flex justify-center items-center">
        <button
          onClick={() => setShowBox((prev) => !prev)}
          className="w-[50%] h-15 bg-destructive hover:bg-[#922F2F] text-foreground cursor-pointer rounded-xl transition"
        >
          Cancel
        </button>
      </div>
      {showBox && <CancelBookingBox setShowBox={setShowBox} bookingID={id} />}
    </>
  );
};

interface BoxProps {
  setShowBox: any;
  bookingID: number;
}

const CancelBookingBox = ({ setShowBox, bookingID }: BoxProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="flex justify-center items-center inset-0 fixed bg-white/30 backdrop-blur-sm z-10">
      {loading ? (
        <LoaderCircle size={100} className="animate-spin" />
      ) : (
        <div className="w-[80vw] max-w-90 flex flex-col aspect-9/10 max-h-60 bg-foreground rounded-[20px] shadow-xl text-textPrimary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex-1 flex flex-col justify-center items-center gap-2">
            <p className="px-10 w-full">
              Are you sure you want to cancel this booking?
            </p>
            <p className="px-10 w-full">BookingID: {bookingID}</p>
          </div>
          <div className="flex-1 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setShowBox(false)}
              className="min-w-25 w-[40%] h-13 bg-buttons hover:bg-buttonsHover text-textPrimary cursor-pointer rounded-xl transition"
            >
              Go back
            </button>
            <button
              onClick={async () => {
                setLoading(true);
                const error = await setBookingActiveStatus(bookingID, false);
                if (error) {
                  alert(error);
                  setLoading(false);
                  return;
                }
                router.refresh();
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setShowBox(false);
                setLoading(false);
              }}
              className="min-w-25 w-[40%] h-13 bg-destructive hover:bg-[#922F2F] text-foreground cursor-pointer rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelBookingButton;
