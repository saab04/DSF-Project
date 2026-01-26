import { getUsername } from "@/lib/auth";
import LogOutButton from "./LogOutButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
const Profile = async () => {
  const supabase = await createClient();
  const username = await getUsername();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    user && (
      <div className="flex items-center justify-center gap-7 w-auto h-full mr-5">
        <p className="w-60 text-center">Logged in as: {username} </p>
        <LogOutButton />
        <Link
          href="/dashboard/user"
          className="flex items-center justify-center w-[20%] min-w-20 max-w-22.5 h-[50%] rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition"
        >
          Account
        </Link>
      </div>
    )
  );
};

export default Profile;
