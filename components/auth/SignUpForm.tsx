"use client";

import { SignUp } from "@/lib/auth";
import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";

const SignUpForm = () => {
  const [state, action, pending] = useActionState(SignUp, {});
  return (
    <div className="w-[40vw] max-w-100 min-w-70 flex flex-col aspect-9/10 max-h-112.5 bg-foreground rounded-[20px] shadow-xl text-textPrimary relative">
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
          defaultValue={state?.values?.username}
          placeholder="Username"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <input
          type="email"
          name="email"
          defaultValue={state?.values?.email}
          placeholder="Email"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <input
          type="password"
          name="password"
          minLength={8}
          defaultValue={state?.values?.password}
          placeholder="Password"
          required
          className="w-[80%] h-9.5 rounded-md bg-white px-3 mb-3 sm:h-11 focus:outline-0 shadow"
        />
        <div className="w-full h-20 flex justify-center items-center">
          <button
            disabled={pending}
            type="submit"
            className="flex justify-center items-center bg-buttons w-[40%] h-[50%] text-[20px] rounded-md mb-7 cursor-pointer hover:bg-buttonsHover transition"
          >
            {pending ? <LoaderCircle className="animate-spin" /> : "Sign up"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center w-full h-10 text-destructive">
        {state?.err}
      </div>
    </div>
  );
};

export default SignUpForm;
