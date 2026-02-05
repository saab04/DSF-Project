"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
const LogOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const SignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };
  return (
    <button
      className="w-[40%] min-w-20 sm:max-w-22.5 max-w-40 h-[50%] rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition"
      onClick={SignOut}
    >
      Log out
    </button>
  );
};

export default LogOutButton;
