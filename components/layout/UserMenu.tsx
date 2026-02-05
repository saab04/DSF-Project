import { getUsername, isAdmin } from "@/lib/auth";
import LogOutButton from "../auth/LogOutButton";
import DropDown from "./DropDown";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
const UserMenu = async () => {
  const supabase = await createClient();
  const username = await getUsername();
  const admin = await isAdmin();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (
    <>
      <DropDown name={username} admin={admin} />
      <div className="sm:flex items-center justify-center gap-7 w-auto h-full mr-5 hidden">
        <div className="flex justify-center gap-3 items-center w-50 h-full">
          <User size={30} />
          <p>{username}</p>
        </div>
        <LogOutButton />
        <Link
          href={admin ? "/admin" : "/dashboard/account"}
          className="flex items-center justify-center w-[40%] min-w-20 sm:max-w-22.5 max-w-40 h-[50%] rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition"
        >
          {admin ? "Admin" : "Account"}
        </Link>
      </div>
    </>
  ) : (
    <Link
      href={"/login"}
      className="min-w-22.5 h-[50%] flex items-center justify-center rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition mr-5"
    >
      Log in
    </Link>
  );
};

export default UserMenu;
