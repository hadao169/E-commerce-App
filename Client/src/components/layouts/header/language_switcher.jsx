"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSwitcher = (props) => {
  const [Language, setLanguage] = React.useState("English");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border-none shadow-none cursor-pointer hover:opacity-60">
        <Button variant="outline">
          <CiGlobe />
          {Language}
          <IoIosArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border-none ">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={Language} onValueChange={setLanguage}>
          <DropdownMenuRadioItem
            value="English"
            className="cursor-pointer hover:text-red-500 border-none shadow-none">
            English
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Vietnamese"
            className="cursor-pointer hover:text-red-500">
            Vietnamese
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
