import {
  addRooms,
  countRooms,
  removeRooms,
  countBookedRoomAIO,
  getAllActiveBookings,
} from "@/lib/bookings";
import RoomManager from "@/components/bookings/RoomManager";
import BookingDisplay from "@/components/bookings/BookingDisplay";
import { BedSingle, BedDouble, Minus, Plus } from "lucide-react";
const Admin = async () => {
  const [
    small,
    medium,
    large,
    bookedTotals,
    allBookings,
  ] = await Promise.all([
    countRooms("Small"),
    countRooms("Medium"),
    countRooms("Large"),
    countBookedRoomAIO(),
    getAllActiveBookings(),
  ]);

  const totals =
    typeof bookedTotals === "string"
      ? {
          totalbooked_small: 0,
          totalbooked_medium: 0,
          totalbooked_large: 0,
        }
      : bookedTotals;

  const { totalbooked_small, totalbooked_medium, totalbooked_large } = totals;

  const bookings = allBookings?.bookings;
  return (
    <div className="sm:w-[90%] w-[90vw] h-full text-textPrimary">
      <div className="w-full h-30 relative">
        <h1 className="absolute left-0 top-10 text-[35px]">Admin View</h1>
      </div>
      <div className="w-full min-h-[50vh] flex flex-wrap flex-col gap-3 mb-5">
        <h2 className="h-10 text-[25px] text-center">Manage rooms</h2>
        <div className="flex-1 flex flex-col items-center">
          <RoomManager
            roomType="Small"
            icon={<BedSingle size={80} color="var(--textPrimary)" />}
            remove={<Minus size={40} color="var(--textPrimary)" />}
            add={<Plus size={40} color="var(--textPrimary)" />}
            removeFunction={removeRooms}
            count={small}
            countBooked={totalbooked_small}
            addFunction={addRooms}
          />
          <RoomManager
            roomType="Medium"
            icon={<BedSingle size={80} color="var(--textPrimary)" />}
            remove={<Minus size={40} color="var(--textPrimary)" />}
            add={<Plus size={40} color="var(--textPrimary)" />}
            removeFunction={removeRooms}
            count={medium}
            countBooked={totalbooked_medium}
            addFunction={addRooms}
          />
          <RoomManager
            roomType="Large"
            icon={<BedDouble size={80} color="var(--textPrimary)" />}
            remove={<Minus size={40} color="var(--textPrimary)" />}
            add={<Plus size={40} color="var(--textPrimary)" />}
            removeFunction={removeRooms}
            count={large}
            countBooked={totalbooked_large}
            addFunction={addRooms}
          />
        </div>
      </div>
      <div className="w-full min-h-[50vh] flex flex-col gap-3">
        <h2 className="h-10 text-[25px] text-center">Manage active bookings</h2>
        <div className="flex-1 flex flex-col justify-start items-center">
          {bookings?.map((booking: any) => (
            <BookingDisplay booking={booking} key={booking.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
