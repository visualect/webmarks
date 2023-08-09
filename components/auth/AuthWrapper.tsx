"use client";

import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import AuthOption from "./AuthOption";
import ToastClient from "@/utils/ToastClient";

interface IAuthWrapper {
  form: React.ReactNode;
  authType: "login" | "register";
}

export default function AuthWrapper({ form, authType }: IAuthWrapper) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-neutral-500">
      <ToastClient />
      <div className="flex flex-col gap-4 py-10 px-20 border rounded-3xl bg-white">
        <h1 className="text-center font-bold text-xl mb-4">
          {authType === "login" ? "Sign in" : "Create account"}
        </h1>
        <div>{form}</div>
        <span className="text-center text-gray-400">or</span>
        <AuthOption
          icon={AiFillGithub}
          action={() => signIn("github", { callbackUrl: "/" })}
          providerName="GitHub"
        />
        <AuthOption
          icon={FcGoogle}
          action={() => signIn("google", { callbackUrl: "/" })}
          providerName="Google"
        />
        <div>
          <div className="flex flex-col gap-1 text-center text-sm text-slate-800">
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
