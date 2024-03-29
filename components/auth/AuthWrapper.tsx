"use client";

import Link from "next/link";
import ToastClient from "@/utils/ToastClient";

interface IAuthWrapper {
  form: React.ReactNode;
  authType: "login" | "register";
}

export default function AuthWrapper({ form, authType }: IAuthWrapper) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-transparent">
      <ToastClient />
      <div className="flex flex-col gap-16 items-center">
        <h1 className="font-bold text-2xl">webmarks</h1>
        <div className="flex flex-col gap-4 sm:w-[400px] px-8 py-7 m-6 shadow-2xl dark:shadow-none dark:border rounded-3xl bg-white dark:bg-neutral-900">
          <h1 className="text-center font-bold text-xl mb-4">
            {authType === "login" ? "Sign in" : "Create account"}
          </h1>
          <div>{form}</div>
          {/* <span className="text-center text-gray-400">or</span> */}
          {/* <AuthOption
          icon={AiFillGithub}
          action={() => signIn("github", { callbackUrl: "/" })}
          providerName="GitHub"
        />
        <AuthOption
          icon={FcGoogle}
          action={() => signIn("google", { callbackUrl: "/" })}
          providerName="Google"
        /> */}
          <div>
            <div className="flex flex-col gap-1 text-center text-sm">
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
    </div>
  );
}
