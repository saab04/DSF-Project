"use server"

import { redirect } from "next/navigation";
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

    redirect("/dashboard")
    return {}
}


export async function LogIn(prevState: {}, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const values = {username: username, password: ""}

    const { data: email, error } = await supabase.rpc("get_email_by_username", {name: username});
    
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
    
    redirect("/dashboard")
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



