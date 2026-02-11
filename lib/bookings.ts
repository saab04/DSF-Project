"use server"
import { createClient } from "./supabase/server"
export async function addRooms(roomType: string) {
    const supabase = await createClient();
    const count = await countRooms(roomType);
    if (roomType === "Small" && count && Number(count) >= 10){
        return "Already 10 Small rooms"
    }
    if (roomType === "Medium" && count && Number(count) >= 5){
        return "Already 5 Medium rooms"
    }
    if (roomType === "Large" && count && Number(count) >= 5){
        return "Already 5 Large rooms"
    }

    const { error } = await supabase.from("Rooms").insert({RoomSize: roomType});
    if (error) {
        return error.message;
    }
}

export async function createBooking(details: {
    userId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    smallRooms: number;
    mediumRooms: number;
    largeRooms: number;
}) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("Bookings").insert({
        UserID: details.userId,
        StartDate: details.checkIn,
        StopDate: details.checkOut,
        GuestAmmount: details.guests,
        RoomAmmount_Small: details.smallRooms,
        RoomAmmount_Medium: details.mediumRooms,
        RoomAmmount_Large: details.largeRooms,
        Active_Booking: true,
    }).select("id").single();

    if (error) {
        return { error: error.message };
    }

    return { id: data?.id };
}

export async function setBookingActiveStatus(
    bookingId: number,
    isActive: boolean
) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("Bookings")
        .update({ Active_Booking: isActive })
        .eq("id", bookingId);

    if (error) {
        return error.message;
    }
}

export async function removeRooms(roomType: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("remove_rooms", {roomtype: roomType});
    if (data.length === 0 || error) {
        return "Cannot remove booked rooms";
    }

}
export async function countRooms(roomType: string) {
    const supabase = await createClient();
    
    const { count, error } = await supabase
    .from("Rooms")
    .select("*", { count: "exact", head: true })
    .eq("RoomSize", roomType);

    if (error) {
        return error.message;
    }
    return count;
}

export async function countBookedRooms(roomType: string) {
    const supabase = await createClient();
    
    const {count, error} = await supabase
    .from("Rooms")
    .select("*", { count: "exact", head: true })
    .eq("RoomSize", roomType)
    .eq("IsOccupied", true);

    if (error) {
        return error.message;
    }
    return count;
}

export async function getUserActiveBookings() {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        return { error: "Not authenticated", bookings: [] };
    }

    const { data: bookings, error } = await supabase
        .from("Bookings")
        .select("*")
        .eq("UserID", user.id)
        .eq("Active_Booking", true)
        .order("StartDate", { ascending: true });

    if (error) {
        return { error: error.message, bookings: [] };
    }

    return { bookings: bookings || [], error: null };
}
