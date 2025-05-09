"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeButton = () => {
  const [theme, setTheme] = useState("light");

  const isLight = theme === "light";

  const toggleTheme = () => {
    const newTheme = isLight ? "dark" : "light";
    setTheme(newTheme);

    if (isLight) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setTheme(currentTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <Button
      variant={"ghost"}
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full w-6 h-6",
        isLight
          ? "bg-gray-200 dark:bg-gray-800"
          : "bg-gray-800 dark:bg-gray-200"
      )}>
      {isLight ? (
        <MoonIcon
          className={cn(
            "h-4 w-4",
            isLight
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-200 dark:text-gray-800"
          )}
        />
      ) : (
        <SunIcon
          className={cn(
            "h-4 w-4",
            isLight
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-200 dark:text-gray-800"
          )}
        />
      )}
    </Button>
  );
};

export default ThemeButton;
