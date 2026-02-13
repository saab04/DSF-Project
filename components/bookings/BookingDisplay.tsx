import CancelBookingButton from "./CancelBookingButton";
import { Calendar, Users, BedSingle, BedDouble } from "lucide-react";

interface Props {
  booking: {
    UserID: string;
    StartDate: string;
    StopDate: string;
    GuestAmmount: string;
    RoomAmmount_Small: number;
    RoomAmmount_Medium: number;
    RoomAmmount_Large: number;
    Active_Booking: boolean;
    id: number;
  };
}

const BookingDisplay = async ({ booking }: Props) => {
  return (
    <div className="sm:w-[70%] sm:min-w-125 min-w-full min-h-50 bg-foreground text-textPrimary shadow rounded-md mb-5 flex flex-col flex-wrap">
      <div className="w-full h-15">
        <h3 className="text-[30px] text-center mt-3 w-20">#{booking.id}</h3>
        <h3></h3>
      </div>
      <div className="w-full min-h-35 flex justify-center flex-wrap">
        <div className="lg:w-[33%] w-[50%] min-w-62.5 h-35 flex justify-center items-center">
          <div className="flex flex-col justify-center gap-2 w-full h-full p-5">
            <div className="flex justify-start items-center gap-2 text-gray-400">
              <Calendar size={18} />
              <p>Check in:</p>
              <p className="text-textPrimary">{booking.StartDate}</p>
            </div>
            <div className="flex justify-start items-center gap-2 text-gray-400">
              <Calendar size={18} />
              <p>Check out:</p>
              <p className="text-textPrimary">{booking.StopDate}</p>
            </div>
            <div className="flex justify-start items-center gap-2 text-gray-400">
              <Users size={18} />
              <p>Guests:</p>
              <p className="text-textPrimary">{booking.GuestAmmount}</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[33%] w-[50%] min-w-62.5 h-35 flex justify-center items-center">
          <div className="flex flex-col justify-center gap-2 w-full h-full p-5">
            {booking.RoomAmmount_Small > 0 && (
              <div className="flex justify-start items-center gap-2 text-gray-400">
                <BedSingle size={18} />
                <p>Small:</p>
                <p className="text-textPrimary">{booking.RoomAmmount_Small}</p>
              </div>
            )}
            {booking.RoomAmmount_Medium > 0 && (
              <div className="flex justify-start items-center gap-2 text-gray-400">
                <BedSingle size={18} />
                <p>Medium:</p>
                <p className="text-textPrimary">{booking.RoomAmmount_Medium}</p>
              </div>
            )}
            {booking.RoomAmmount_Large > 0 && (
              <div className="flex justify-start items-center gap-2 text-gray-400">
                <BedDouble size={18} />
                <p>Large:</p>
                <p className="text-textPrimary">{booking.RoomAmmount_Large}</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-[33%] w-[50%] min-w-62.5 h-35 flex justify-center items-center">
          <CancelBookingButton />
        </div>
      </div>
    </div>
  );
};

export default BookingDisplay;
