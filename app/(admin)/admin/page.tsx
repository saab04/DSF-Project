import {
  addRooms,
  countRooms,
  removeRooms,
  countBookedRooms,
} from "@/lib/bookings";
import RoomManager from "@/components/bookings/RoomManager";
import { BedSingle, BedDouble, Minus, Plus } from "lucide-react";
const Admin = async () => {
  const small = await countRooms("Small");
  const medium = await countRooms("Medium");
  const large = await countRooms("Large");
  const bookedSmall = await countBookedRooms("Small");
  const bookedMedium = await countBookedRooms("Medium");
  const bookedLarge = await countBookedRooms("Large");
  return (
    <div className="w-[90%] h-full text-textPrimary">
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
            countBooked={bookedSmall}
            addFunction={addRooms}
          />
          <RoomManager
            roomType="Medium"
            icon={<BedSingle size={80} color="var(--textPrimary)" />}
            remove={<Minus size={40} color="var(--textPrimary)" />}
            add={<Plus size={40} color="var(--textPrimary)" />}
            removeFunction={removeRooms}
            count={medium}
            countBooked={bookedMedium}
            addFunction={addRooms}
          />
          <RoomManager
            roomType="Large"
            icon={<BedDouble size={80} color="var(--textPrimary)" />}
            remove={<Minus size={40} color="var(--textPrimary)" />}
            add={<Plus size={40} color="var(--textPrimary)" />}
            removeFunction={removeRooms}
            count={large}
            countBooked={bookedLarge}
            addFunction={addRooms}
          />
        </div>
      </div>
      <div className="w-full min-h-[50vh] flex flex-col gap-3">
        <h2 className="h-10 text-[25px] text-center">Manage active bookings</h2>
        <div className="flex-1 flex flex-col justify-start"></div>
      </div>
    </div>
  );
};

export default Admin;
