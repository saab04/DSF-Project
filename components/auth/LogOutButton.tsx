"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
const LogOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const SignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
  return (
    <button className="w-10 h-10 border-2 cursor-pointer" onClick={SignOut}>
      Log out
    </button>
  );
};

export default LogOutButton;
