"use client";

import { SignUp } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react";

const RegisterForm = () => {
  const [state, action] = useActionState(SignUp, "");
  return (
    <div className="w-[40vw] max-w-100 min-w-70 flex flex-col aspect-9/10 max-h-112.5 bg-foreground rounded-[20px] shadow-xl text-primary relative">
      <div className="flex justify-center items-center w-full h-[20%] min-h-12">
        <h2 className="sm:text-[30px] text-[25px]">Sign Up</h2>
      </div>
      <form
        action={action}
        className="w-full h-[80%] flex flex-wrap justify-center"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <div className="w-full h-20 flex justify-center items-center">
          <button
            type="submit"
            className="bg-buttons w-[40%] h-[50%] text-[20px] rounded-md mb-7 cursor-pointer hover:bg-buttonsHover transition"
          >
            Sign up
          </button>
        </div>
      </form>
      <div className="absolute top-[calc(100%+10px)] text-primary w-full flex justify-center gap-2 text-[14px] sm:text-[16px]">
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-700">
          Login page
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
