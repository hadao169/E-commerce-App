import React from "react";
import SignUpForm from "@/components/Auth/SignupForm";

const SignUpPage = (props) => {
  return (
    <div className="flex flex-col xl:flex-row xl:px-[18%] px-6 py-10 xl:py-0 items-center">
      <div className="h-full ml-2">
        <img src="/images/loginpage.png" className="h-full object-cover" />
      </div>
      <div className="w-full xl:w-1/2">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
