import React from "react";
import Link from "next/link";
const UserButton = () => {
  
  return (
    <div>
      <Link href="/signin" className="hover:opacity-60 transition duration-200">
        Hello, sign in
      </Link>
    </div>
  );
};

export default UserButton;
