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
