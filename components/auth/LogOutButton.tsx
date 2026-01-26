"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
const LogOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const SignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };
  return (
    <button
      className="w-[20%] min-w-20 max-w-22.5 h-[50%] rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition"
      onClick={SignOut}
    >
      Log out
    </button>
  );
};

export default LogOutButton;
