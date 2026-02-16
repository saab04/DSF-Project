import { getUserActiveBookings } from "@/lib/bookings";
import BookingDisplay from "@/components/bookings/BookingDisplay";

export default async function Dashboard() {
  const { bookings, error } = await getUserActiveBookings();
  return (
    <div className="sm:w-[90%] w-[90vw] h-full text-textPrimary">
      <div className="w-full h-30 flex items-center justify-center relative">
        <h1 className="text-[35px]">My Bookings</h1>
      </div>
      <div className="w-full min-h-[50vh] flex flex-col gap-3">
        <div className="flex-1 flex flex-col items-center gap-4 pb-5">
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
          {bookings?.map((booking: any) => (
            <BookingDisplay booking={booking} key={booking.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
