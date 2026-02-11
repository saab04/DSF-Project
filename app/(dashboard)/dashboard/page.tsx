import { getUserActiveBookings } from "@/lib/bookings";
import { Calendar, Users, BedSingle, BedDouble } from "lucide-react";

export default async function Dashboard() {
  const { bookings, error } = await getUserActiveBookings();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("sv-SE");
  };

  return (
    <div className="w-[90%] h-full text-textPrimary">
      <div className="w-full h-30 relative">
        <h1 className="absolute left-0 top-10 text-[35px]">My Bookings</h1>
      </div>
      <div className="w-full min-h-[50vh] flex flex-col gap-3">
        <div className="flex-1 flex flex-col justify-start gap-4 pb-5">
          {error && (
            <div className="text-red-500 text-center py-4">
              <p>{error}</p>
            </div>
          )}
          {!error && bookings.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No active bookings. Start by booking a room!</p>
            </div>
          )}
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="w-full bg-foreground rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
            >
              <div className="flex-1 flex flex-col justify-start gap-3">
                <div className="flex items-center gap-3">
                  <Calendar
                    size={20}
                    color="var(--textPrimary)"
                  />
                  <div>
                    <p className="text-sm text-gray-400">Check-in</p>
                    <p className="text-lg font-semibold">
                      {formatDate(booking.StartDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    size={20}
                    color="var(--textPrimary)"
                  />
                  <div>
                    <p className="text-sm text-gray-400">Check-out</p>
                    <p className="text-lg font-semibold">
                      {formatDate(booking.StopDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users
                    size={20}
                    color="var(--textPrimary)"
                  />
                  <div>
                    <p className="text-sm text-gray-400">Guests</p>
                    <p className="text-lg font-semibold">
                      {booking.GuestAmmount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-start gap-3">
                <h3 className="text-lg font-semibold mb-2">Rooms Booked</h3>
                {booking.RoomAmmount_Small > 0 && (
                  <div className="flex items-center gap-3">
                    <BedSingle size={20} color="var(--textPrimary)" />
                    <div>
                      <p className="text-sm text-gray-400">Small Rooms</p>
                      <p className="text-lg font-semibold">
                        {booking.RoomAmmount_Small}
                      </p>
                    </div>
                  </div>
                )}
                {booking.RoomAmmount_Medium > 0 && (
                  <div className="flex items-center gap-3">
                    <BedSingle size={20} color="var(--textPrimary)" />
                    <div>
                      <p className="text-sm text-gray-400">Medium Rooms</p>
                      <p className="text-lg font-semibold">
                        {booking.RoomAmmount_Medium}
                      </p>
                    </div>
                  </div>
                )}
                {booking.RoomAmmount_Large > 0 && (
                  <div className="flex items-center gap-3">
                    <BedDouble size={20} color="var(--textPrimary)" />
                    <div>
                      <p className="text-sm text-gray-400">Large Rooms</p>
                      <p className="text-lg font-semibold">
                        {booking.RoomAmmount_Large}
                      </p>
                    </div>
                  </div>
                )}
                {booking.RoomAmmount_Small === 0 &&
                  booking.RoomAmmount_Medium === 0 &&
                  booking.RoomAmmount_Large === 0 && (
                    <p className="text-sm text-gray-400">No rooms booked</p>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
