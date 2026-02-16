"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const FormDisplay = () => {
  const [form, setForm] = useState(true);
  return (
    <div className="w-auto h-auto relative">
      {form ? <LoginForm /> : <SignUpForm />}
      <div className="absolute top-[calc(100%+10px)] text-textPrimary w-full flex justify-center gap-2 text-[14px] sm:text-[16px]">
        <p>{form ? "Don't have an account?" : "Already have an account?"}</p>
        <p
          onClick={() => setForm((prev) => !prev)}
          className="text-blue-700 cursor-pointer"
        >
          {form ? "Sign up" : "Log in"}
        </p>
      </div>
    </div>
  );
};

export default FormDisplay;
