"use client";

import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface IAuthWrapper {
  form: React.ReactNode;
  authType: "login" | "register";
}

export default function AuthWrapper({ form, authType }: IAuthWrapper) {
  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-gradient-to-r
    from-slate-300
    via-slate-100
    to-slate-200
    background-animate"
    >
      <div className="flex flex-col gap-4 py-10 px-20 rounded-xl bg-white drop-shadow-xl">
        <h1 className="text-center font-bold text-xl">
          {authType === "login" ? "Sign in" : "Create account"}
        </h1>
        <div>{form}</div>
        <span className="text-center text-gray-400">or</span>
        <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 border rounded-xl cursor-pointer">
          <AiFillGithub size={24} />
          <p>Sign in with Google</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 px-4 py-2 border rounded-xl cursor-pointer">
          <FcGoogle size={24} />
          <p>Sign in with GitHub</p>
        </div>
        <div>
          <div className="text-center text-sm text-slate-800">
            {authType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="text-gray-400 underline underline-offset-4 decoration-gray-400 ml-2"
              href={authType === "login" ? "/register" : "/login"}
            >
              {authType === "login" ? "Create" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
