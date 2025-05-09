import React from "react";
import Link from "next/link";
const Userbutton = (props) => {
  return (
    <div>
      <Link href="#" className="hover:opacity-60 transition duration-200">
        Hello, sign in
      </Link>
    </div>
  );
};

export default Userbutton;
