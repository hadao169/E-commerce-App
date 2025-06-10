"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSigninSchema } from "@/lib/validation";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { googleLoginRequest } from "@/services/api/auth";
import { UserSigninInput } from "@/types/index";

type SignInFormProps = {
  action: (data: UserSigninInput) => void | Promise<void>;
  error?: string;
};

const SignInForm = ({ action, error }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSigninInput>({
    resolver: zodResolver(userSigninSchema),
  });

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg px-5 py-8 shadow-md">
      <form onSubmit={handleSubmit(action)} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Log in</h2>

        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-3 rounded-md cursor-pointer hover:opacity-90 transition-opacity duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ">
          {isSubmitting ? (
            <React.Fragment>
              <Loader2 className="animate-spin" />
              Logging in...
            </React.Fragment>
          ) : (
            "LOG IN"
          )}
        </button>
      </form>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-2 border rounded-md mt-5 border-gray-400 cursor-pointer hover:opacity-70 transition-opacity duration-300"
        onClick={googleLoginRequest}>
        <FcGoogle className="text-2xl" />
        <p className="text-[16px] font-semibold">Google</p>
      </button>

      <div></div>
      <div className="flex items-center justify-center text-[14px] gap-1 mt-2 pt-4">
        <p>New to Shopee?</p>
        <Link
          href="/signup"
          className="text-orange-600 hover:underline font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
