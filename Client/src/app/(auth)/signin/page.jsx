"use client";
import React from "react";
import SignInForm from "@/components/Auth/SigninForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SignInPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const action = async (userData) => {
    const success = await login(userData.email, userData.password);
    if (success) {
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col md:flex-row px-4 md:px-8 xl:px-[10%] py-6 xl:py-10 items-center gap-6">
      <div className="w-full xl:w-1/2 flex justify-center">
        <img
          src="/images/loginpage.png"
          className="w-full max-w-md md:max-w-lg xl:max-w-xl h-auto object-contain rounded-lg "
          alt="Login illustration"
        />
      </div>
      <div className="w-full xl:w-1/2">
        <SignInForm action={action} />
      </div>
    </div>
  );
};

export default SignInPage;
