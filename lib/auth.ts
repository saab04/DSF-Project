"use server"
import { createClient } from "./supabase/server"

export async function SignUp(prevState: {}, formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const values = {username: username, email: email, password: ""}

    const { data: usernameTaken } = await supabase.rpc("username_taken", {name: username});

    if (usernameTaken) {
        return {err: "Username already taken. Please choose a different one.", values}
    }

    const response = await supabase.auth.signUp({
      email,
      password,
    });

    if (response.error) {
        if (response.error.message === "User already registered") {
            return {err: "Email already in use. Try logging in or use a different email. ", values};
        }
        return {err: response.error.message, values};
    }

    await supabase.from("Users").insert({
        id: response.data.user?.id,
        Username: username,
        Email: email
    });

    return {}
}


export async function LogIn(prevState: {}, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const values = {username: username, password: ""}

    const { data: email, error } = await supabase.rpc("get_email_by_username", {name: username.trim()});
    
    if(error){
        return {err: "Invalid login credentials", values}
    }

    const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (response.error){
        return {err: "Invalid login credentials", values}
    }

    return {}
}

export async function getUsername() {
    const supabase = await createClient();
    const { data: username } = await supabase.rpc("get_username");
    return username;
}

export async function isAdmin() {
    const supabase = await createClient();
    const {data: isAdmin, error} = await supabase.rpc("is_admin");
    if(error){
        console.log("Not Authorized")
    }
    return isAdmin;
}

export async function availableRooms() {
    const supabase = await createClient();
    const { data: roomsize, error } = await supabase.rpc("get_rooms");
    var roomTotal = {Small: 0, Medium: 0, Large: 0};
    if (error) {
        console.log("No available rooms");
    }
    
    for (const word of roomsize as string[]) {
        const size = word as keyof typeof roomTotal;
        console.log(size);
        if (size in roomTotal) {
            roomTotal[size] += 1;
        }
    }
    return roomTotal
}








