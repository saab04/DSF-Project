"use server"
import { createClient } from "./supabase/server"
import { isAdmin } from "./auth";
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
    

    const totalCount = await countRooms(roomType);
    if (typeof totalCount === "string") {
        return totalCount; // Error message
    }
    if (totalCount === null) {
        return "Failed to retrieve room count";
    }

    const bookedCount = await countBookedRoomType(roomType);
    if (typeof bookedCount === "string") {
        return bookedCount; // Error message
    }
    
    if (totalCount <= bookedCount) {
        return "Cannot remove room: all rooms of this type are currently booked";
    }
    
    const { data: rooms, error: fetchError } = await supabase
        .from("Rooms")
        .select("id")
        .eq("RoomSize", roomType)
        .limit(1);
    
    if (fetchError) {
        return fetchError.message;
    }
    
    if (!rooms || rooms.length === 0) {
        return "No rooms of this type found";
    }
    
    const { error: deleteError } = await supabase
        .from("Rooms")
        .delete()
        .eq("id", rooms[0].id);
    
    if (deleteError) {
        return deleteError.message;
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

export async function countBookedRoomType(roomType: string) {
    const supabase = await createClient();

    const roomColumnByType = {
        Small: "RoomAmmount_Small",
        Medium: "RoomAmmount_Medium",
        Large: "RoomAmmount_Large",
    } as const;

    const roomColumn = roomColumnByType[roomType as keyof typeof roomColumnByType];
    if (!roomColumn) {
        return "Invalid room type";
    }

    const { data, error } = await supabase
        .from("Bookings")
        .select(roomColumn)
        .eq("Active_Booking", true);

    if (error) {
        return error.message;
    }

    const totalBooked = (data || []).reduce((acc, booking) => {
        const value = (booking as Record<string, number>)?.[roomColumn] ?? 0;
        return acc + (typeof value === "number" ? value : 0);
    }, 0);

    return totalBooked;
}

export async function countBookedRoomAIO() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("Bookings")
        .select("RoomAmmount_Small, RoomAmmount_Medium, RoomAmmount_Large")
        .eq("Active_Booking", true);

    if (error) {
        return error.message;
    }

    const totals = (data || []).reduce(
        (acc, booking) => {
            acc.totalbooked_small += booking.RoomAmmount_Small ?? 0;
            acc.totalbooked_medium += booking.RoomAmmount_Medium ?? 0;
            acc.totalbooked_large += booking.RoomAmmount_Large ?? 0;
            return acc;
        },
        {
            totalbooked_small: 0,
            totalbooked_medium: 0,
            totalbooked_large: 0,
        },
    );

    return totals;
}

export async function getAvailableRoomCounts() {
    const [smallTotal, mediumTotal, largeTotal, bookedTotals] = await Promise.all([
        countRooms("Small"),
        countRooms("Medium"),
        countRooms("Large"),
        countBookedRoomAIO(),
    ]);

    if (typeof smallTotal === "string") {
        return { error: smallTotal };
    }
    if (typeof mediumTotal === "string") {
        return { error: mediumTotal };
    }
    if (typeof largeTotal === "string") {
        return { error: largeTotal };
    }
    if (typeof bookedTotals === "string") {
        return { error: bookedTotals };
    }

    if (smallTotal === null || mediumTotal === null || largeTotal === null) {
        return { error: "Failed to retrieve room counts" };
    }

    return {
        available: {
            small: Math.max(0, smallTotal - bookedTotals.totalbooked_small),
            medium: Math.max(0, mediumTotal - bookedTotals.totalbooked_medium),
            large: Math.max(0, largeTotal - bookedTotals.totalbooked_large),
        },
    };
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

export async function getAllActiveBookings() {
    const supabase = await createClient();
    const admin = await isAdmin();
    if(!admin){
        return;
    }
    const { data: bookings, error } = await supabase
        .from("Bookings")
        .select("*")
        .eq("Active_Booking", true)
        .order("StartDate", { ascending: true });
    
    if (error) {
        return { error: error.message, bookings: [] };
    }

    return { bookings: bookings || [], error: null };
}


