"use server"

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server"

export async function SignUp(prevState: {}, formData: FormData){
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const values = {username: username, email: email, password: ""}

    const { data } = await supabase.from("Users").select("Username").eq("Username", username).limit(1).maybeSingle();

    if (data) {
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

    const { data } = await supabase.from("Users").select("*").eq("Username", username).limit(1).single();

    const response = await supabase.auth.signInWithPassword({
        email: data.Email,
        password: password
     });
    if (response.error){
        return {err: response.error.message, values}
    }
    redirect("/dashboard")
    return {}
}

export async function getUsername() {
    const supabase = await createClient();
    const response = await supabase.auth.getUser();
    const { data } = await supabase.from("Users").select("Username").eq("id", response.data?.user?.id).limit(1).single();
    return data?.Username;
}



