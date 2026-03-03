"use server"
import { createClient } from "./supabase/server"
import { isAdmin } from "./auth";

const roomColumnByType = {
    Small: "RoomAmmount_Small",
    Medium: "RoomAmmount_Medium",
    Large: "RoomAmmount_Large",
} as const;

const calculatePeakBooked = (
    bookings: Array<Record<string, string | number | null>>,
    roomColumn: string,
    checkIn?: string,
    checkOut?: string,
) => {
    const events: Array<{ date: string; delta: number; type: "start" | "end" }> = [];

    for (const booking of bookings) {
        const amount = Number(booking?.[roomColumn] ?? 0);
        if (!Number.isFinite(amount) || amount <= 0) {
            continue;
        }

        const bookingStart = String(booking.StartDate ?? "");
        const bookingEnd = String(booking.StopDate ?? "");

        const bookingStartDate = new Date(bookingStart);
        const bookingEndDate = new Date(bookingEnd);
        if (
            Number.isNaN(bookingStartDate.getTime()) ||
            Number.isNaN(bookingEndDate.getTime())
        ) {
            continue;
        }

        if (checkIn && checkOut && !(bookingStart < checkOut && bookingEnd > checkIn)) {
            continue;
        }

        const start = checkIn ? (bookingStart < checkIn ? checkIn : bookingStart) : bookingStart;
        const end = checkOut ? (bookingEnd > checkOut ? checkOut : bookingEnd) : bookingEnd;

        const rangeStartDate = new Date(start);
        const rangeEndDate = new Date(end);
        if (
            Number.isNaN(rangeStartDate.getTime()) ||
            Number.isNaN(rangeEndDate.getTime())
        ) {
            continue;
        }

        events.push({ date: start, delta: amount, type: "start" });
        events.push({ date: end, delta: -amount, type: "end" });
    }

    events.sort((a, b) => {
        if (a.date === b.date) {
            if (a.type === b.type) {
                return 0;
            }
            return a.type === "end" ? -1 : 1;
        }
        return a.date.localeCompare(b.date);
    });

    let current = 0;
    let peak = 0;

    for (const event of events) {
        current += event.delta;
        if (current > peak) {
            peak = current;
        }
    }

    return peak;
};
export async function addRooms(roomType: string) {
    const supabase = await createClient();
    const count = await countRooms(roomType);
    if (roomType === "Small" && count && Number(count) >= 15){
        return "Already 15 Small rooms"
    }
    if (roomType === "Medium" && count && Number(count) >= 10){
        return "Already 10 Medium rooms"
    }
    if (roomType === "Large" && count && Number(count) >= 10){
        return "Already 10 Large rooms"
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
    const availabilityResult = await getAvailableRoomCounts(details.checkIn, details.checkOut);
    if ("error" in availabilityResult) {
        return { error: availabilityResult.error };
    }

    if (
        details.smallRooms > availabilityResult.available.small ||
        details.mediumRooms > availabilityResult.available.medium ||
        details.largeRooms > availabilityResult.available.large
    ) {
        return { error: "Insufficient availability for selected dates" };
    }

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

    const bookedCount = await countBookedRoomType(roomType, undefined, undefined);
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

export async function countBookedRoomType(roomType: string, checkIn?: string, checkOut?: string) {
    const supabase = await createClient();

    const roomColumn = roomColumnByType[roomType as keyof typeof roomColumnByType];
    if (!roomColumn) {
        return "Invalid room type";
    }

    if ((checkIn && !checkOut) || (!checkIn && checkOut)) {
        return "Both check-in and check-out dates are required";
    }

    const { data, error } = await supabase
        .from("Bookings")
        .select(`StartDate, StopDate, ${roomColumn}`)
        .eq("Active_Booking", true);

    if (error) {
        return error.message;
    }

    const peakBooked = calculatePeakBooked(
        (data || []) as Array<Record<string, string | number | null>>,
        roomColumn,
        checkIn,
        checkOut,
    );

    return peakBooked;
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

export async function getAvailableRoomCounts(checkIn: string, checkOut: string) {
    const [smallTotal, mediumTotal, largeTotal, bookedTotals] = await Promise.all([
        countRooms("Small"),
        countRooms("Medium"),
        countRooms("Large"),
        Promise.all([
            countBookedRoomType("Small", checkIn, checkOut),
            countBookedRoomType("Medium", checkIn, checkOut),
            countBookedRoomType("Large", checkIn, checkOut),
        ]),
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
    const [bookedSmall, bookedMedium, bookedLarge] = bookedTotals;

    if (typeof bookedSmall === "string") {
        return { error: bookedSmall };
    }
    if (typeof bookedMedium === "string") {
        return { error: bookedMedium };
    }
    if (typeof bookedLarge === "string") {
        return { error: bookedLarge };
    }

    if (smallTotal === null || mediumTotal === null || largeTotal === null) {
        return { error: "Failed to retrieve room counts" };
    }

    return {
        available: {
            small: Math.max(0, smallTotal - bookedSmall),
            medium: Math.max(0, mediumTotal - bookedMedium),
            large: Math.max(0, largeTotal - bookedLarge),
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



