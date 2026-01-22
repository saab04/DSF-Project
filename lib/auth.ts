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
        Username: username,
        id: response.data.user?.id
    });

    redirect("/dashboard");

    return {}

    
}


export async function LogIn() {
    
}

