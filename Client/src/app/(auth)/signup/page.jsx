import React from "react";
import SignUpForm from "@/components/Auth/SignupForm";

const SignUpPage = (props) => {
  return (
    <div className="flex flex-col md:flex-row px-4 md:px-8 xl:px-[10%] py-6 xl:py-10 items-center gap-6">
      <div className="w-full xl:w-1/2 flex justify-center">
        <img
          src="/images/loginpage.png"
          className="w-full max-w-md md:max-w-lg xl:max-w-xl h-auto object-contain rounded-lg"
          alt="Signup illustration"
        />
      </div>
      <div className="w-full xl:w-1/2">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
