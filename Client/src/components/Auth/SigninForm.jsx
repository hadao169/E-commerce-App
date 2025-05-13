import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
const SignInForm = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg px-5 py-8">
      <form>
        <span className="text-xl">Log in</span>
        <div className="my-5">
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md py-3 px-2"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-md cursor-pointer hover:opacity-70 transition-opacity duration-300 mb-2">
          LOG IN
        </button>
        <a href="#" className="text-[13px] text-blue-700 mt-4 hover:underline">
          Forgot password
        </a>
      </form>
      <div className="flex items-center justify-center text-[14px] gap-1 mt-4">
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
