"use client";
import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

const UserButton = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <Link href="/signin" className="hover:opacity-60 transition duration-200">
        Hello, sign in
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer hover:opacity-60 transition duration-200">
          <span className="text-sm">Hello, {user.username}</span>
          <IoIosArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white border-none">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="account">
            <Link href="/user">My account</Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="orders">
            <Link href="/orders">My orders</Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="logout"
            onClick={async (e: React.MouseEvent) => {
              e.preventDefault();
              await logout();
              return router.push("/");
            }}
            className={"cursor-pointer"}>
            Sign out
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
