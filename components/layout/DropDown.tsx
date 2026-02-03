"use client";
import { useState, useEffect, useLayoutEffect } from "react";
import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import LogOutButton from "../auth/LogOutButton";
interface Props {
  name: string;
}
const DropDown = ({ name }: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches) {
      setOpen(false);
    }
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return (
    <div className="sm:hidden flex items-center w-full h-full absolute z-2">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-center items-center w-9 h-9 absolute right-3 cursor-pointer"
      >
        {open ? <X size={35} /> : <Menu size={35} />}
      </button>
      {open && (
        <ul className="flex flex-col w-full h-[300%] absolute top-full bg-primary">
          <li className="w-full flex justify-center items-center gap-5 flex-1 text-[25px] border-b">
            <User size={30} />
            <p>{name}</p>
          </li>
          <li className="w-full flex justify-center items-center flex-1 border-b">
            <LogOutButton />
          </li>
          <li className="w-full flex justify-center items-center flex-1">
            <Link
              href="/dashboard/user"
              className="flex items-center justify-center w-[20%] min-w-20 max-w-22.5 h-[50%] rounded-md bg-buttons cursor-pointer text-textPrimary hover:bg-buttonsHover transition"
            >
              Account
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
