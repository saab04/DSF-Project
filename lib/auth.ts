"use server"
import { createClient } from "./supabase/server"

export async function SignUp(formData: FormData){
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();

     const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user){
        await supabase.from("Users").insert({
            Username: username,
            id: data.user.id
        })
    }

    if (error){
        console.log(error);
    }

}