import React from "react";
import Link from "next/link";

export default function SignupForm() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg px-5 py-8">
      <form>
        <span className="text-xl">Create an account</span>
        <div className="my-5">
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="my-5">
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Confirm password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-md cursor-pointer hover:opacity-70 transition-opacity duration-300 mb-2">
          Sign up
        </button>
      </form>
      <div className="flex flex-col items-center">
        {/* Sign in/sign up logic using gmail*/}
        <div className="text-[12px] text-center w-4/5 mt-2">
          <p>
            By signing up, you agree to Shopee's{" "}
            <Link href="/policy" className="text-orange-600">Terms of Service & Privacy Policy</Link>
          </p>
        </div>
        <div className="flex items-center justify-center text-[14px] gap-1 mt-4">
          <p>Have an account?</p>
          <Link
            href="/signin"
            className="text-orange-600 hover:underline font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
