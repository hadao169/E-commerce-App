"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validator";
import { Loader2 } from "lucide-react";

export default function SignupForm({ action }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg px-5 py-8 shadow-md">
      <form onSubmit={handleSubmit(action)}>
        <h2 className="text-xl font-semibold mb-6">Create an account</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              {...register("username")}
              className={`w-full border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter your username"
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter email address"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
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
              placeholder="Enter password"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`w-full border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Confirm password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-md cursor-pointer hover:opacity-90 transition-opacity duration-300 mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isSubmitting}>
          {isSubmitting ? (
            <React.Fragment>
              <Loader2 className="animate-spin ml-4" />
              Signing up...
            </React.Fragment>
          ) : (
            "SIGN UP"
          )}
        </button>

        <div className="text-[12px] text-center w-full mt-4">
          <p>
            By signing up, you agree to Shopee's{" "}
            <Link href="/policy" className="text-orange-600 hover:underline">
              Terms of Service & Privacy Policy
            </Link>
          </p>
        </div>
      </form>

      <div className="flex items-center justify-center text-[14px] gap-1 mt-6 border-t pt-4">
        <p>Have an account?</p>
        <Link
          href="/signin"
          className="text-orange-600 hover:underline font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
